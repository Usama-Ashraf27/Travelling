import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
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

const Post = () => {
  const [name, setName] = useState("");
  const [locationReview, setLocationReview] = useState("");
  const [image, setImage] = useState(
    `https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?w=1200&ssl=1`
  );
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLaunchImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLaunchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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

  const handleUpload = () => {
    setTimeout(() => {
      alert("Upload complete!");
    }, 2000);
  };

  return (
    <Layout style={styles.container}>
      <View>
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
          value={locationReview}
          onChangeText={setLocationReview}
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
          imageSize={wp("10%")}
          onFinishRating={(rating) => console.log("Rating: ", rating)}
          style={{ paddingVertical: hp("2%") }}
        />

        {image && <Image source={{ uri: image }} style={styles.image} />}

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
      </View>
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
