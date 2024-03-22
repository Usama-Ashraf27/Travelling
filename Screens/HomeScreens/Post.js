import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Layout from "../Layout/Layout";
import { Rating, AirbnbRating } from "react-native-ratings";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import imageplace from "../../assets/imageplace.jpg";
import { KeyboardAvoidingView } from "react-native";
import { server } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Post = () => {
  const [name, setName] = useState("Italy");
  const [comments, setcomments] = useState("Good");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [user, setuser] = useState();
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        console.log(userData);
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setuser(parsedUser);
          setToken(parsedUser.token);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLaunchImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImage(selectedImages);
    }
  };

  const handleLaunchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImage(selectedImages);
    }
  };

  const handlePressLocation = (data, details = null) => {
    console.log(
      data.description,
      details.geometry.location.lat,
      details.geometry.location.lng
    );
    if (details) {
      setSelectedLocation({
        name: data.description,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append(
        "comments",
        JSON.stringify([{ user: user._id, comment: comments }])
      );
      formData.append("latitude", selectedLocation?.latitude.toString() ?? "");
      formData.append(
        "longitude",
        selectedLocation?.longitude.toString() ?? ""
      );
      formData.append(
        "ratings",
        JSON.stringify([{ user: user._id, rating: rating }])
      );
      // console.log(image, "img");)
      image.forEach((img, index) =>
        formData.append("pictures", {
          uri: img,
          name: `file${index}.jpg`,
          type: "image/jpeg",
        })
      );

      // console.log(image, "images");
      console.log("FormData:", formData);

      const response = await fetch(`${server}/landmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);

      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading:", error.message);
      alert("An error occurred while uploading. Please try again later.");
    }
  };
  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Create Post</Text>
        <TextInput
          style={styles.input}
          placeholder="Write a Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Review about Locations"
          value={comments}
          onChangeText={setcomments}
        />
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          minLength={2}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails={true}
          onPress={handlePressLocation}
          query={{
            key: "AIzaSyDXoHO79vxypTv8xL4V10cf5kFpIYDO9Rk",
            language: "en",
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInputContainer: {
              backgroundColor: "rgba(0,0,0,0)",
              borderTopWidth: 0,
              borderBottomWidth: 0,
              paddingHorizontal: 34,
              marginTop: 20,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
        <AirbnbRating
          type="custom"
          ratingCount={5}
          defaultRating={rating}
          imageSize={wp("10%")}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: hp("2%") }}
        />

        {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLaunchImageLibrary}
          >
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLaunchCamera}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
    alignSelf: "center",
  },
  input: {
    height: hp("5%"),
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: hp("2%"),
    alignSelf: "center",
    paddingHorizontal: wp("2%"),
    width: wp("80%"),
  },
  image: {
    width: wp("80%"),
    height: hp("30%"),
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: hp("2%"),
  },
  button: {
    width: wp("40%"),
    backgroundColor: "black",
    elevation: 8,
    borderRadius: wp("5%"),
    padding: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  uploadButton: {
    width: wp("80%"),
    backgroundColor: "black",
    elevation: 8,
    borderRadius: wp("5%"),
    padding: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: wp("4%"),
  },
});
