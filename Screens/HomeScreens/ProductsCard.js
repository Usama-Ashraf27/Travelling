import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { productData } from "./ProductsData";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Rating } from "react-native-ratings";

const ProductsCard = () => {
  const navigation = useNavigation();
  // useEffect(() => {
  //   fetch(`${server}/landmarks`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetched Data:", data);
  //       setProductData(data); // Update state with fetched data
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text numberOfLines={1}>{item.reviewAboutLocation}</Text>
      <Text numberOfLines={1}>{item.locationname}</Text>
      <Rating
        type="star"
        startingValue={item.rating}
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
