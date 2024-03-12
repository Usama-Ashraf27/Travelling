import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute, useNavigation } from "@react-navigation/native";
const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <AntDesign
          style={[styles.icon, route.name === "home" && styles.active]}
          name="home"
        />
        <Text style={[styles.iconText, route.name === "home" && styles.active]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Post")}
      >
        <AntDesign
          style={[styles.icon, route.name === "post" && styles.active]}
          name="edit"
        />
        <Text style={[styles.iconText, route.name === "post" && styles.active]}>
          Post
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Account")}
      >
        <AntDesign
          style={[styles.icon, route.name === "Account" && styles.active]}
          name="user"
        />
        <Text
          style={[styles.iconText, route.name === "Account" && styles.active]}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
    color: "#000000",
  },
  iconText: {
    color: "#000000",
    fontSize: 10,
  },
});
export default Footer;
