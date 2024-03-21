import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import Layout from "../Layout/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Account = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("user");
        const userData = JSON.parse(userDataString);
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.userPhoto}
          />
          <Text style={styles.userName}>{userData.name}</Text>
          <TextInput
            style={styles.input}
            value={userData._id}
            editable={false}
          />
          <TextInput
            style={styles.input}
            value={userData.email}
            editable={false}
          />
          <TextInput
            style={styles.input}
            value={userData.password}
            editable={false}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("15%"),
  },
  userInfo: {
    alignItems: "center",
    alignSelf: "center",
  },
  userPhoto: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("15%"),
    marginBottom: hp("2%"),
  },
  userName: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  input: {
    width: wp("70%"),
    height: hp("6%"),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: wp("2%"),
    marginBottom: hp("1%"),
  },
});
