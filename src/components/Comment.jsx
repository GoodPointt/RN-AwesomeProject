import { Image, StyleSheet, Text, View } from "react-native";

export const Comment = ({ item, isEven }) => {
  return (
    <View style={[styles.commentWrapper, !isEven && styles.evenComment]}>
      <View style={styles.commentAuthorBox}>
        <Image
          style={styles.authorAvaImg}
          source={{ uri: item.author.avatar }}
        />
        <Text style={{ fontSize: 10 }}>{item.author.name}</Text>
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>{item.comment}</Text>
        <Text style={[styles.commentDate, !isEven && styles.evenDateText]}>
          {item.date}
        </Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    padding: 16,
  },
  commentAuthorBox: { alignItems: "center" },
  authorAvaImg: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentText: {
    color: "#212121",
    fontSize: 13,
    fontFamily: "Roboto-Regular",
  },
  commentDate: {
    marginTop: 5,
    textAlign: "right",
    color: "#BDBDBD",
    fontSize: 10,
    fontFamily: "Roboto-Regular",
  },
  evenComment: {
    flexDirection: "row-reverse",
  },
  evenDateText: {
    textAlign: "left",
  },
});
