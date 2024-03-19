import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import splashImage from "../assets/splash1.png";

const SplashScreen = ({ navigation }) => {
  const translateY = new Animated.Value(-hp("35%"));
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("login");
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={splashImage}
        style={[styles.image, { transform: [{ translateY }] }]}
      />
      <Animated.Text style={[styles.text, { transform: [{ translateY }] }]}>
        Explore the World
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: wp("50%"),
    height: hp("25%"),
  },
  text: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    marginTop: hp("2%"),
  },
});

export default SplashScreen;
