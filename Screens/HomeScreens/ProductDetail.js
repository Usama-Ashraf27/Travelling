import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import { Rating } from "react-native-ratings";
import { server } from "../../redux/store";
import Comments from "./Comments";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetail = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetch(`${server}/landmarks/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleComment = async () => {
    try {
      // Fetch user ID from async store
      const userData = await AsyncStorage.getItem("user");
      const id = JSON.parse(userData)._id;

      const response = await fetch(
        `${server}/landmarks/${productId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: id,
            comment: comment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Comment response:", data);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleAddRating = async () => {
    try {
      // Fetch user ID from async store
      const userData = await AsyncStorage.getItem("user");
      const id = JSON.parse(userData)._id;

      const response = await fetch(`${server}/landmarks/${productId}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: id,
          rating: Number(rating),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Comment response:", data);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
    console.log("Submitted Rating:", rating);
    setModalVisible(!modalVisible);
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.productInfo}>
        <Image source={{ uri: product.pictures[0].url }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.row}>
          <Rating
            type="star"
            startingValue={product.averageRating}
            imageSize={24}
            style={{ marginTop: 10 }}
            readonly
          />
          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "#fff" }}>ADD Rating</Text>
          </TouchableOpacity>
        </View>
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
            <Text style={{ color: "#fff" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add Rating</Text>
              <Rating
                showRating
                type="star"
                fractions={1}
                startingValue={rating}
                imageSize={40}
                onFinishRating={(value) => setRating(value)}
              />
              <View style={styles.row}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleAddRating}
                >
                  <Text style={styles.textStyle}>Submit Rating</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <Comments comments={product.comments} productId={productId} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    height: "57",
  },
  image: {
    height: 330,
    width: "100%",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 5,
    alignSelf: "center",
  },
  commentSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  commentButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonOpen: {
    backgroundColor: "#000",
  },
  buttonClose: {
    backgroundColor: "#000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ProductDetail;
