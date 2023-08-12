import { useContext } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { UserContext } from "../hooks/useUsersAuth";
import { PostItem } from "../components/PostItem";
import { useNavigation } from "@react-navigation/native";
import { SmallUserBox } from "../components/SmallUserBox";

export const PostsScreen = () => {
  const { userId, users, setUsers } = useContext(UserContext);

  const navigation = useNavigation();

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
      {currentUser.posts.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={currentUser.posts}
          renderItem={({ item }) => (
            <PostItem
              item={item}
              incrementLike={() => incrementLike(item.id)}
              commentDetails={() =>
                navigation.navigate("Comments", {
                  post: item,
                  currentUser: currentUser,
                })
              }
              locationDetails={() => navigation.navigate("Map", item)}
            />
          )}
          keyExtractor={(item) => item.id}
          extraData={currentUser.comments}
          ListHeaderComponent={<SmallUserBox currentUser={currentUser} />}
        />
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
});
