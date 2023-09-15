import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SmallUserBox } from '../components/SmallUserBox';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { usePosts } from '../hooks/usePosts';
import { fetchAllPosts } from '../redux/posts/operations';
import PostsList from '../components/PostsList';
import { RESOLVED, REJECTED, LOADING } from '../utils/vars';

export const PostsScreen = () => {
  const { user, isLoggedIn } = useAuth();
  const { allPosts, status, error } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch, isLoggedIn]);

  return (
    isLoggedIn &&
    user && (
      <View style={styles.container}>
        {status === RESOLVED && allPosts.length > 0 ? (
          <PostsList
            posts={allPosts}
            user={user}
            fetchOnRefresh={() => dispatch(fetchAllPosts())}
          />
        ) : (
          <SmallUserBox
            avatar={user.avatar}
            name={user.name}
            email={user.email}
          />
        )}
        {status === LOADING && (
          <ActivityIndicator size={120} color={'#FF6C00'} style={{ flex: 1 }} />
        )}
        {status === REJECTED && (
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
