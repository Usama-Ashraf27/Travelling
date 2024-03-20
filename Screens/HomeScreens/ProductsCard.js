import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Rating } from "react-native-ratings";
import { server } from "../../redux/store";

const ProductsCard = () => {
  const navigation = useNavigation();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch(`${server}/landmarks`)
      .then((response) => response.json())
      .then((data) => {
        const stringifiedData = JSON.stringify(data);
        console.log("Fetched Data:", stringifiedData);
        setProductData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleProductPress = (productId) => {
    navigation.navigate("ProductDetail", { productId });
    console.log(productId);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress(item._id)}
    >
      <Image source={{ uri: item.pictures[0].url }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>

      <Text style={styles.commentText}>
        {item.comments.length > 0 ? item.comments[0].comment : "No comments"}
      </Text>
      <Rating
        type="star"
        startingValue={item.averageRating}
        imageSize={20}
        style={{ marginTop: 10 }}
        readonly
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={productData}
      renderItem={renderProductItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("2%"),
    paddingBottom: hp("23%"),
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 8,
  },
  productItem: {
    flex: 1,
    margin: wp("1%"),
    padding: wp("4%"),
    backgroundColor: "white",
    borderRadius: wp("4%"),
  },
  image: {
    width: wp("39%"),
    height: hp("20%"),
    borderRadius: wp("4%"),
    marginBottom: hp("1%"),
  },
});

export default ProductsCard;
