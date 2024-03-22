import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rating } from "react-native-ratings";
import { server } from "../../redux/store";

const Search = ({ route, navigation }) => {
  const { selectedLocation } = route.params;
  const latitude = 41.87194;
  const longitude = 12.56738;
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setToken(parsedUser.token);

          const response = await fetch(
            `${server}/specific-landmarks?latitude=${latitude}&longitude=${longitude}`,
            {
              headers: {
                Authorization: `Bearer ${parsedUser.token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Fetched Data:", data);
          setProductData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        Alert.alert("Error", error.message);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  const renderProductItems = () => {
    return productData.map((item) => (
      <TouchableOpacity
        key={item._id}
        style={styles.productItem}
        onPress={() =>
          navigation.navigate("ProductDetail", {
            productId: item._id,
          })
        }
      >
        <Image source={{ uri: item.pictures[0].url }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.rating}>Average Rating: {item.averageRating}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : productData.length === 0 ? (
        <Text>No data found.</Text>
      ) : (
        <>
          <Text style={styles.heading}>Search Results</Text>
          <View style={styles.productContainer}>{renderProductItems()}</View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 8,
    textAlign: "center",
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  productItem: {
    width: "45%",
    backgroundColor: "white",
    margin: 8,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 8,
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  rating: {
    marginBottom: 4,
  },
});

export default Search;
