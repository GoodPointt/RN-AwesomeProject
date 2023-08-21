import { useEffect } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PostItem } from '../components/PostItem';
import { useNavigation } from '@react-navigation/native';
import { SmallUserBox } from '../components/SmallUserBox';

import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { usePosts } from '../hooks/usePosts';
import { fetchPosts } from '../redux/posts/operations';
import { addLike } from '../redux/posts/postsSlice';
import { updateUserDocDataInFirestore } from '../firebase/auth';

export const PostsScreen = () => {
  const { user, token, isLoggedIn, isRefreshing } = useAuth();
  const { posts, status, error } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const navigation = useNavigation();

  const incrementLike = (postId, likesCount) => {
    dispatch(addLike({ postId: postId }));
    updateUserDocDataInFirestore(
      postId,
      {
        isLiked: true,
        likes: likesCount + 1,
      },
      `users/${user.id}/posts`
    );
  };

  return (
    isLoggedIn && (
      <View style={styles.container}>
        {status === 'resolved' && posts?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={posts}
            renderItem={({ item }) => (
              <PostItem
                item={item}
                incrementLike={incrementLike}
                commentDetails={() =>
                  navigation.navigate('Comments', {
                    post: item,
                  })
                }
                locationDetails={() => navigation.navigate('Map', item)}
              />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <SmallUserBox
                avatar={user?.avatar}
                name={user?.name}
                email={user?.email}
              />
            }
            refreshControl={
              <RefreshControl onRefresh={() => dispatch(fetchPosts())} />
            }
          />
        ) : (
          <SmallUserBox
            avatar={user?.avatar}
            name={user?.name}
            email={user?.email}
          />
        )}
        {status === 'loading' && <Text>Loading...</Text>}
        {status === 'rejected' && (
          <Text>Opps an error occured: '{error}' 😒</Text>
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
});
