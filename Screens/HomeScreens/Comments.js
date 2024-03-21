import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import commentData from "./CommentsData";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Comments = ({ comments }) => {
  console.log(comments, "");
  // useEffect(() => {
  //   fetch(`${server}/landmarks/${productId}/comments`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetched Data:", data);
  //       setComments(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [productId]);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {comments.map((comment) => (
          <View key={comment._id} style={styles.commentContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png ",
              }}
              style={styles.userPhoto}
            />
            <View style={styles.commentContent}>
              {/* <Text style={styles.username}>{comment.user}</Text> */}
              <Text style={styles.commentText}>{comment.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp("5%"),
    marginBottom: hp("1%"),
  },
  userPhoto: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    marginRight: wp("3%"),
  },
  commentContent: {
    flexDirection: "column",
  },
  username: {
    fontWeight: "bold",
    marginBottom: hp("0.5%"),
  },
  commentText: {
    maxWidth: wp("50%"),
  },
});

export default Comments;
