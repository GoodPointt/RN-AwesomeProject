import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ProfileAvatar } from "../components/ProfileAvatar";

import { useContext } from "react";
import { UserContext } from "../hooks/useUsersAuth";
import { PostItem } from "../components/PostItem";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const ProfileScreen = () => {
  const { userId, users, setUsers } = useContext(UserContext);

  const currentUser = users.find((user) => user.id === userId);
  const { avatar } = currentUser;

  const navigation = useNavigation();

  const handleAvatarChange = (userId, newAva) =>
    setUsers((state) =>
      state.map((user) => {
        if (user.id === userId) user.avatar = newAva;
        return user;
      })
    );

  const incrementLike = (postId) => {
    setUsers((state) =>
      state.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            posts: user.posts.map((post) =>
              post.id === postId ? { ...post, likes: post.likes + 1 } : post
            ),
          };
        } else {
          return user;
        }
      })
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-165}
      style={styles.container}
    >
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/img/login-bg.jpg")}
      >
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.logoutIco}
            onPress={() => navigation.navigate("Auth", { screen: "Login" })}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <ProfileAvatar
            currentAva={avatar}
            handleAvatarChange={handleAvatarChange}
            userId={userId}
          />
          {currentUser.posts.length > 0 && (
            <FlatList
              data={currentUser.posts}
              renderItem={({ item }) => (
                <PostItem
                  item={item}
                  incrementLike={() => incrementLike(item.id)}
                  commentDetails={() => {
                    navigation.navigate("Comments", item);
                  }}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    paddingTop: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    resizeMode: "cover",
  },
  profileContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 90,
    paddingBottom: 45,
    paddingHorizontal: 16,
  },

  logoutIco: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});
