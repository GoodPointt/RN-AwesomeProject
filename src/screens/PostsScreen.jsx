import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SmallUserBox } from '../components/SmallUserBox';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { usePosts } from '../hooks/usePosts';
import { fetchPosts } from '../redux/posts/operations';
import PostsList from '../components/PostsList';
import vars from '../utils/vars';

export const PostsScreen = () => {
  const { user, isLoggedIn } = useAuth();
  const { posts, status, error } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, isLoggedIn]);

  return (
    isLoggedIn &&
    user && (
      <View style={styles.container}>
        {status === vars.RESOLVED && posts.length > 0 ? (
          <PostsList posts={posts} user={user} />
        ) : (
          <SmallUserBox
            avatar={user.avatar}
            name={user.name}
            email={user.email}
          />
        )}
        {status === vars.LOADING && (
          <ActivityIndicator size={120} color={'#FF6C00'} style={{ flex: 1 }} />
        )}
        {status === vars.REJECTED && (
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
