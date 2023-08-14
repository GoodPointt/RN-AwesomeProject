import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { CreatePostForm } from "../components/CreatePostForm";

export const CreatePostsScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-60}
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
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    // alignItems: "flex-end",
    flexDirection: "row",
  },
});
