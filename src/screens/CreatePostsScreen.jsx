import { StyleSheet, View } from "react-native";
import { CreatePostForm } from "../components/CreatePostForm";

export const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <CreatePostForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
});
