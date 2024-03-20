import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./authScreen/Login";
import Register from "./authScreen/Register";
import Layout from "./Screens/Layout/Layout";
import Home from "./Screens/HomeScreens/Home";
import Post from "./Screens/HomeScreens/Post";
import Account from "./Screens/HomeScreens/Account";
import ProductDetail from "./Screens/HomeScreens/ProductDetail";
import SplashScreen from "./Screens/SplashScreen";

const Stack = createNativeStackNavigator();

const Appnavigation = () => {
  const token = "";
  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="layout" component={Layout} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    );
  };
  return token ? <HomeStack /> : <AuthStack />;
};

export default Appnavigation;
