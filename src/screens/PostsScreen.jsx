import { StyleSheet, Text, View } from "react-native";

export const PostsScreen = (params) => {
  return (
    <View style={styles.background1}>
      <Text style={{ textAlign: "center", paddingTop: 30, fontSize: 30 }}>
        Posts
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background1: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
