import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./authScreen/Login";
import Register from "./authScreen/Register";
import Layout from "./Screens/Layout/Layout";
import Home from "./Screens/HomeScreens/Home";
import Post from "./Screens/HomeScreens/Post";
import Account from "./Screens/HomeScreens/Account";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="layout" component={Layout} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
