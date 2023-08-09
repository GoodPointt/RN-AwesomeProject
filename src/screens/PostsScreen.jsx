import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { UserContext } from "../hooks/useUsersAuth";
import { PostItem } from "../components/PostItem";
import { TabNavigation } from "../routes/TabNavigation";

export const PostsScreen = () => {
  const { userId, users, setUsers } = useContext(UserContext);

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

  const currentUser = users.find((user) => user.id === userId);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Image style={styles.avatarImg} source={{ uri: currentUser.avatar }} />
        <View>
          <Text style={styles.name}>{currentUser.login}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>
        </View>
      </View>
      {currentUser.posts.length > 0 && (
        <View style={styles.postsList}>
          <FlatList
            data={currentUser.posts}
            renderItem={({ item }) => (
              <PostItem
                item={item}
                incrementLike={() => incrementLike(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
  postsList: {
    gap: 40,
  },

  avatarImg: { width: 60, height: 60, borderRadius: 16 },

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
