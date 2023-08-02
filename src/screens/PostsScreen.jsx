import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";

export const PostsScreen = (params) => {
  const {
    params: { email, login, avatar },
  } = useRoute();
  return (
    <View style={styles.background1}>
      <Text style={{ textAlign: "center", paddingTop: 30, fontSize: 30 }}>
        {email}
      </Text>
      <Text style={{ textAlign: "center", paddingTop: 30, fontSize: 30 }}>
        {login}
      </Text>
      <Image style={styles.avatarImg} source={{ uri: avatar }} />
    </View>
  );
};

const styles = StyleSheet.create({
  background1: {
    backgroundColor: "#fff",
    flex: 1,
  },

  avatarImg: { width: 120, height: 120, borderRadius: 16 },
  avatarIconBox: {
    width: 25,
    height: 25,
    position: "absolute",
    transform: [{ translateX: 100 }, { translateY: 75 }],
  },
});
