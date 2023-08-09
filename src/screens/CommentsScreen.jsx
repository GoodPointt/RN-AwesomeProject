import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Text,
} from "react-native";
import { Comment } from "../components/Comment";
import { useContext, useState } from "react";
import { UserContext } from "../hooks/useUsersAuth";
import { formatDateTime } from "../utils/formatDate";

export const CommentsScreen = ({ route: { params } }) => {
  const { photo, comments, id } = params;

  const [commentValue, setCommentValue] = useState("");
  const { users, setUsers } = useContext(UserContext);

  const handleSendComment = () => {
    if (commentValue.trim() === "") {
      return;
    }

    const newComment = {
      id: Date.now(),
      date: formatDateTime(new Date()),
      author: "CurrentUser",
      comment: commentValue,
    };

    const updatedComments = [...comments, newComment];
    const updatedUsers = users.map((user) => ({
      ...user,
      posts: user.posts.map((post) => {
        if (post.id === id) {
          return { ...post, comments: updatedComments };
        }
        return post;
      }),
    }));
    setUsers(updatedUsers);

    setCommentValue("");
    Keyboard.dismiss();

    //CHECK NEW COMMENT
    console.log(users[0].posts[0].comments.at(-1));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
      style={styles.containerAvoid}
    >
      <View style={styles.container}>
        <View style={styles.ImgContainer}>
          <Image
            source={{ uri: photo }}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
          />
        </View>

        <FlatList
          style={styles.commentsList}
          data={comments}
          renderItem={({ item }) => <Comment item={item} />}
          extraData={comments}
          keyExtractor={(item) => item.date}
        />
      </View>
      <View>
        <TextInput
          style={[
            styles.commentInput,
            commentValue ? styles.focusedInput : null,
          ]}
          onChangeText={setCommentValue}
          value={commentValue}
        />
        <TouchableOpacity
          onPress={handleSendComment}
          style={{
            width: 24,
            height: 24,
            backgroundColor: "orange",
            position: "absolute",
            right: 17,
            top: 17,
          }}
        >
          <Text> Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerAvoid: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,

    paddingTop: 32,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  ImgContainer: {
    borderRadius: 8,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  commentsList: {
    gap: 40,
  },
  commentInput: {
    width: "100%",
    padding: 16,
    backgroundColor: "#f6f6f6",
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "#e8e8e8",
    borderStyle: "solid",
    marginBottom: 16,
  },
  focusedInput: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },
});
