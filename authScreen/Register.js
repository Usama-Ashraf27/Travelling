import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import loginImage from "../assets/login.jpg";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome5";

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleSubmit = () => {
    navigation.navigate("");
  };

  return (
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