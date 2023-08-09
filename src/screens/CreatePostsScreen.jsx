import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { CreatePostForm } from "../components/CreatePostForm";

export const CreatePostsScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-165}
      style={styles.containerAvoid}
    >
      <View style={styles.container}>
        <CreatePostForm />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerAvoid: {
    flex: 1,
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
});
