import { StyleSheet, Text, View } from "react-native";

export const Comment = ({ item }) => {
  return (
    <View style={styles.commentWrapper}>
      <View style={styles.authorAvaBox}>
        <Text style={{ fontSize: 10 }}>{item.author}</Text>
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>{item.comment}</Text>
        <Text style={styles.commentDate}>{item.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentWrapper: {
    flexDirection: "row",
    marginVertical: 25,
    gap: 16,
  },
  commentContainer: {
    flex: 1,
    width: "100%",
    minHeight: 70,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 16,
  },
  authorAvaBox: {
    width: 28,
    height: 28,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "#e90a0a8a",
  },
  commentText: {
    color: "#212121",
    fontSize: 13,
    fontFamily: "Roboto-Regular",
  },
  commentDate: {
    textAlign: "right",
    color: "#BDBDBD",
    fontSize: 10,
    fontFamily: "Roboto-Regular",
  },
});
