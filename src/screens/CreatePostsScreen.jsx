import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { CreatePostForm } from "../components/CreatePostForm";

export const CreatePostsScreen = () => {
  return (
    <ScrollView
      style={styles.containerAvoid}
      contentContainerStyle={styles.scrollViewContent}
      bounces={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-70}
        style={styles.containerAvoid}
      >
        <View style={styles.container}>
          <CreatePostForm />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  containerAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
  },
});
