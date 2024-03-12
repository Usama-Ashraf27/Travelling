import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Layout from "../Layout/Layout";
import { userData } from "./UserData";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Account = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userData.userphoto }}
            style={styles.userPhoto}
          />
          <Text style={styles.userName}>{userData.UserName}</Text>
          <Text style={styles.fullname}>{userData.fullname}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <Text style={styles.password}>{userData.password}</Text>
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
  fullname: {
    fontSize: wp("4%"),
    marginBottom: hp("1%"),
  },
  email: {
    fontSize: wp("4%"),
    color: "gray",
    marginBottom: hp("1%"),
  },
  password: {
    fontSize: wp("4%"),
    marginBottom: hp("1%"),
  },
});
