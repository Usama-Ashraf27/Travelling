import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Comments = ({ comments }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View>
        {comments.map((comment) => (
          <View key={comment._id} style={styles.commentContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
              style={styles.userPhoto}
            />
            <View style={styles.commentContent}>
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
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp("5%"),
    marginBottom: hp("1%"),
  },
  userPhoto: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    marginRight: wp("3%"),
  },
  commentContent: {
    flex: 1,
    flexDirection: "column",
  },
  commentText: {
    maxWidth: wp("70%"),
  },
});

export default Comments;
