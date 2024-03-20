import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import loginImage from "../assets/login.jpg";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { server } from "../redux/store";

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: "Usa",
    email: "usama@gmail.com",
    password: "112233",
    confirmPassword: "112233",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const isValidEmailFormat = (email) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  };
  const setBorderColor = useMemo(() => {
    const checkValid = formData?.email && !isValidEmail;
    return {
      borderColor: checkValid ? "red" : "#A14142",
    };
  }, [isValidEmail, formData?.email]);

  const onChangeText = (key, value) => {
    if (key == "email") {
      setIsValidEmail(isValidEmailFormat(value));
    }
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    // Create a new object with only the required fields
    const requestData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${server}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log(JSON.stringify(requestData));
      console.log(JSON.stringify(response));
      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      // Registration successful, navigate to login screen
      navigation.navigate("login");
    } catch (error) {
      console.error("Error registering:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Image source={loginImage} style={styles.image} />
          <Text style={styles.title}>Sign Up</Text>
          <View style={[styles.inputContainer, styles.shadow]}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
            />
          </View>
          <View style={[styles.inputContainer, styles.shadow]}>
            <TextInput
              style={[styles.input, setBorderColor]}
              placeholder="info@testemail.com"
              value={formData?.email}
              onChangeText={(text) => onChangeText("email", text)}
            />
            {formData?.email?.length && isValidEmail ? (
              <Icon
                name="check-circle"
                size={20}
                color="black"
                style={{ right: 8 }}
              />
            ) : null}
          </View>
          <View style={[styles.inputContainer, styles.shadow]}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={togglePasswordVisibility}
            >
              <Icon
                name={showPassword ? "eye" : "eye-slash"}
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.inputContainer, styles.shadow]}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={toggleConfirmPasswordVisibility}
            >
              <Icon
                name={showConfirmPassword ? "eye" : "eye-slash"}
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.login}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={styles.loginText}>Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  title: {
    fontSize: hp("3%"),
    marginBottom: hp("2%"),
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    // flex: 1,
    height: 40,
    paddingLeft: 10,
    width: "85%",
    backgroundColor: "white",
    borderRadius: 5,
  },
  login: {
    flexDirection: "row",
    marginTop: hp("2%"), // Adjusted margin for responsiveness
  },
  loginText: {
    color: "black",
    fontWeight: "bold",
  },
  shadow: {
    elevation: 10,
    shadowOpacity: 0.5,
    shadowOffset: { width: wp("0.5%"), height: hp("1%") },
    shadowRadius: wp("1%"),
  },
  eyeButton: {
    position: "absolute",
    right: wp("2.5%"),
    top: hp("1.5%"),
  },
  button: {
    width: wp("70%"),
    backgroundColor: "black",
    elevation: 8,
    borderRadius: 20,
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    height: hp("35%"),
    width: wp("100%"),
    marginBottom: hp("5%"),
  },
});

export default Register;
