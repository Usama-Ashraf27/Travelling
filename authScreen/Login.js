import React, { useState, useMemo, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import loginImage from "../assets/login.jpg";
import Icon from "react-native-vector-icons/FontAwesome5";
import { server } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthContext } from "../ContextApi/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [data, setData] = useState({
    email: "usama@gmail.com",
    password: "112233",
  });
  // const { storeToken } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  useEffect(() => {});

  const isValidEmailFormat = (email) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const setBorderColor = useMemo(() => {
    const checkValid = data?.email && !isValidEmail;
    return {
      borderColor: checkValid ? "red" : "#A14142",
      borderWidth: checkValid ? 1.2 : 0,
    };
  }, [isValidEmail, data?.email]);

  const onChangeText = (key, value) => {
    if (key == "email") {
      setIsValidEmail(isValidEmailFormat(value));
    }
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSignUpClick = () => {
    navigation.navigate("Register");
  };

  const handlelogin = async () => {
    // Check if email and password are provided
    if (!data.email || !data.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(`${server}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      // console.log(response);
      // Log all response details
      // console.log("Response status:", response.status);
      // console.log("Response headers:", response.headers);
      const responseData = await response.json();

      await AsyncStorage.setItem("user", JSON.stringify(responseData.data));
      navigation.navigate("Home");
      // storeToken(responseData.data.token);
      console.log("Response data:", responseData);
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <Image source={loginImage} style={styles.image} />
          <Text style={styles.title}>Welcome Back!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.shadow, setBorderColor]}
              placeholder="info@testemail.com"
              value={data?.email}
              onChangeText={(text) => onChangeText("email", text)}
            />
            {data?.email?.length && isValidEmail ? (
              <Icon
                name="check-circle"
                size={20}
                color="black"
                style={styles.icon}
              />
            ) : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.shadow]}
              placeholder="Enter your Password"
              secureTextEntry={!showPassword}
              value={data.password}
              onChangeText={(text) => onChangeText("password", text)}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={togglePasswordVisibility}
            >
              {showPassword ? (
                <Icon
                  name="eye"
                  size={wp("5%")}
                  color="black"
                  style={styles.icon}
                />
              ) : (
                <Icon
                  name="eye-slash"
                  size={wp("5%")}
                  color="black"
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handlelogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={{ alignSelf: "center" }}>
            {" \n"}Don't have an account? {""}
            <Text style={{ fontWeight: "bold" }} onPress={handleSignUpClick}>
              Sign up
            </Text>
          </Text>
          {/* {emailErrorText ? (
        <Text style={styles.emailError(data?.email && !isValidEmail)}>
          {emailErrorText}
        </Text>
      ) : null} */}
          <View />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emailError: (isCheck) => {
    return {
      color: isCheck ? "red" : "black",
    };
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: hp("3%"),
    marginBottom: hp("2%"),
    fontWeight: "bold",
    alignSelf: "center",
  },
  icon: {
    position: "absolute",
    right: wp("2%"),
    top: hp("1.7%"),
  },
  shadow: {
    elevation: 10,
    shadowOpacity: 0.5,
    shadowOffset: { width: wp("0.5%"), height: hp("1%") },
    shadowRadius: wp("1%"),
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  eyeButton: {
    position: "absolute",
    right: wp("1%"),
    zIndex: 1,
    backgroundColor: "red",
    top: hp("-0.5%"),
  },
  button: {
    width: wp("70%"),
    backgroundColor: "black",
    elevation: 8,
    borderRadius: 20,
    padding: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  signupLink: {
    marginTop: hp("2%"),
  },
  signupText: {
    color: "blue",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  image: {
    height: hp("35%"),
    width: wp("100%"),
    marginBottom: hp("5%"),
  },
});

export default LoginScreen;
