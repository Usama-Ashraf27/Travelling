// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "./authScreen/Login";
// import Register from "./authScreen/Register";
// import Layout from "./Screens/Layout/Layout";
// import Home from "./Screens/HomeScreens/Home";
// import Post from "./Screens/HomeScreens/Post";
// import Account from "./Screens/HomeScreens/Account";
// import ProductDetail from "./Screens/HomeScreens/ProductDetail";
// import SplashScreen from "./Screens/SplashScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthContext, AuthProvider } from "./ContextApi/AuthContext";
// import Search from "./Screens/HomeScreens/Search";

// const Stack = createNativeStackNavigator();

// const Appnavigation = () => {
//   const { token, storeToken } = React.useContext(AuthContext);
//   console.log(storeToken, "token");
//   // console.log("Token:", token);
//   // const [token, setToken] = React.useState("");

//   // React.useEffect(() => {
//   //   const fetchToken = async () => {
//   //     try {
//   //       const storedToken = await AsyncStorage.getItem("user");
//   //       const id = storedToken.token;
//   //       console.log(id, "id");
//   //       if (id) {
//   //         setToken(id);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching token:", error);
//   //     }
//   //   };

//   //   fetchToken();
//   // }, []);
//   const AuthStack = () => {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="SplashScreen"
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="SplashScreen" component={SplashScreen} />
//           <Stack.Screen name="login" component={LoginScreen} />
//           <Stack.Screen name="Register" component={Register} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   };

//   const HomeStack = () => {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Home"
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="layout" component={Layout} />
//           <Stack.Screen name="Home" component={Home} />
//           <Stack.Screen name="Post" component={Post} />
//           <Stack.Screen name="Account" component={Account} />
//           <Stack.Screen name="ProductDetail" component={ProductDetail} />
//           <Stack.Screen name="Search" component={Search} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   };
//   return <AuthProvider>{token ? <HomeStack /> : <AuthStack />}</AuthProvider>;
// };

// export default Appnavigation;
