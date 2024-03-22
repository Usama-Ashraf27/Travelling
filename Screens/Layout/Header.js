import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Header = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
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
    navigation.navigate("Search", { selectedLocation });
  };
  //funciotn for search
  const handleSearch = () => {
    console.log(searchText);
    // setSearchText("");
  };
  return (
    <View
      style={{
        height: 90,
        zIndex: 1,
        backgroundColor: `lightgray`,
      }}
    >
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  inputBox: {
    borderWidth: 0.3,
    width: "100%",
    position: "absolute",
    left: 15,
    height: 40,
    color: "#000000",
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  searchBtn: {
    position: "absolute",
    left: "95%",
  },
  icon: {
    color: "#000000",
    fontSize: 18,
  },
});

export default Header;
