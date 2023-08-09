import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const PostItem = ({
  item: { photo, name, location, likes, comments },
  incrementLike,
  commentDetails,
}) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: photo }} style={styles.itemImage} />
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.underCardInfo}>
        <View style={styles.stats}>
          <TouchableOpacity onPress={commentDetails}>
            <View style={styles.stat}>
              <Feather name="message-circle" size={24} color="#FF6C00" />
              <Text style={styles.statText}>{comments.length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={incrementLike}>
            <View style={styles.stat}>
              <Feather name="thumbs-up" size={24} color="#FF6C00" />
              <Text style={styles.statText}>{likes}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log("PRESS_POST_LOCATION")}>
          <View style={styles.stat}>
            <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 300,
    borderRadius: 8,
    marginVertical: 35,
  },
  itemImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  nameText: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  statText: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  locationText: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
  underCardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stats: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },
  stat: {
    flexDirection: "row",
    gap: 5,
  },
});
