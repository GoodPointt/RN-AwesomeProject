import { Image, StyleSheet, Text, View } from "react-native";

export const SmallUserBox = ({ currentUser }) => {
  return (
    <View style={styles.userBox}>
      <Image style={styles.avatarImg} source={{ uri: currentUser.avatar }} />
      <View>
        <Text style={styles.name}>{currentUser.login}</Text>
        <Text style={styles.email}>{currentUser.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
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
