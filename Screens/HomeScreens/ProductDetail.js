import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Rating } from "react-native-ratings";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Comments from "./Comments";

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const [comment, setComment] = useState("");

  const handleComment = () => {
    console.log("Comment:", comment);
  };

  return (
    <>
      <View style={styles.productInfo}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.review}>{product.reviewAboutLocation}</Text>
        <Text style={styles.location}>{product.locationname}</Text>
        <Rating
          type="star"
          startingValue={product.rating}
          imageSize={24}
          style={{ marginTop: hp("2%") }}
          readonly
        />
        <View style={styles.commentSection}>
          <TextInput
            style={styles.input}
            placeholder="Add your comment"
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity
            style={styles.commentButton}
            onPress={handleComment}
          >
            <Icon name="comment" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Comments />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  productInfo: {
    paddingHorizontal: wp("3.5%"),
    backgroundColor: "white",
    height: "65%",
  },
  image: {
    height: hp("33%"),
    width: "100%",
  },
  name: {
    fontSize: hp("3.8%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  review: {
    fontSize: hp("2.3%"),
    marginBottom: hp("1%"),
  },
  location: {
    fontSize: hp("2.2%"),
    marginBottom: hp("2%"),
  },
  commentSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("2%"),
  },
  commentButton: {
    backgroundColor: "#000",
    padding: hp("1%"),
    borderRadius: wp("3%"),
    marginLeft: wp("3%"),
  },
  input: {
    flex: 1,
    height: hp("7%"),
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: wp("4%"),
    borderRadius: wp("3%"),
  },
});

export default ProductDetail;
