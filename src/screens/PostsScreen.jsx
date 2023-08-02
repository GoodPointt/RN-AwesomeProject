import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";

export const PostsScreen = () => {
  const {
    params: { email, login, avatar },
  } = useRoute();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image style={styles.avatarImg} source={{ uri: avatar }} />
        <View>
          <Text style={styles.name}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },

  avatarImg: { width: 120, height: 120, borderRadius: 16 },
  avatarIconBox: {
    width: 25,
    height: 25,
    position: "absolute",
    transform: [{ translateX: 100 }, { translateY: 75 }],
  },
  name: {
    color: "#212121",
    textAlign: "left",
    fontSize: 15,
    fontFamily: "Roboto-Medium",
  },
  email: {
    color: "rgba(33, 33, 33, 0.80)",
    textAlign: "left",
    fontSize: 13,
    fontFamily: "Roboto-Regular",
  },
});
