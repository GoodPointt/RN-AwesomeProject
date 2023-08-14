import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { Comment } from "../components/Comment";
import { useContext, useState } from "react";
import { UserContext } from "../hooks/useUsersAuth";
import { formatDateTime } from "../utils/formatDate";
import { AntDesign } from "@expo/vector-icons";

export const CommentsScreen = ({ route: { params } }) => {
  const { post, currentUser } = params;
  const { photo, comments, id } = post;

  const [commentValue, setCommentValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [localComments, setLocalComments] = useState(comments);

  const { users, setUsers } = useContext(UserContext);

  const handleSendComment = () => {
    if (commentValue.trim() === "") {
      return;
    }

    const newComment = {
      id: Date.now(),
      date: formatDateTime(new Date()),
      author: {
        name: currentUser.login,
        avatar: currentUser.avatar,
      },
      comment: commentValue,
    };

    const updatedLocalComments = [...localComments, newComment];
    setLocalComments(updatedLocalComments);

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
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
      style={styles.containerAvoid}
    >
      <View style={styles.container}>
        <View style={styles.ImgContainer}>
          <Image source={{ uri: photo }} style={styles.postImg} />
        </View>

        {comments.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.commentsList}
            data={localComments}
            renderItem={({ item, index }) => (
              <Comment item={item} isEven={index % 2 === 0} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <View>
        <TextInput
          style={[styles.commentInput, isFocused ? styles.focusedInput : null]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={setCommentValue}
          value={commentValue}
          placeholder="Add comment"
        />
        <TouchableOpacity onPress={handleSendComment} style={styles.sendButton}>
          <AntDesign name="arrowup" size={20} color="#fff" />
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
    paddingHorizontal: 16,
    paddingVertical: 5,
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
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    backgroundColor: "#FF6C00",
    position: "absolute",
    right: 10,
    top: 7,
    borderRadius: 50,
  },
  postImg: { width: "100%", height: "100%", borderRadius: 8 },
});
