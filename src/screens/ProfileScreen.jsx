import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ProfileAvatar } from '../components/ProfileAvatar';
import { useDispatch } from 'react-redux';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { fetchPosts } from '../redux/posts/operations';
import PostsList from '../components/PostsList';
import LogoutButton from '../components/LogoutButton';

export const ProfileScreen = () => {
  const { user } = useAuth();
  const { posts, status, error } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(user));
  }, [dispatch]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-165}
      style={styles.container}
    >
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/img/login-bg.jpg')}
      >
        {user && (
          <View style={styles.profileContainer}>
            <LogoutButton profile={true} />
            <ProfileAvatar currentAva={user.avatar} userId={user.id} />
            <Text style={styles.text}>{user.name}</Text>
            {status === 'resolved' && posts?.length > 0 && (
              <PostsList posts={posts} profile={null} />
            )}
            {status === 'loading' && (
              <ActivityIndicator
                size={120}
                color={'#FF6C00'}
                style={{ flex: 1 }}
              />
            )}
            {status === 'rejected' && (
              <Text style={styles.text}>
                Opps an error occured: '{error}' 😒
              </Text>
            )}
          </View>
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    paddingTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    resizeMode: 'cover',
  },
  profileContainer: {
    backgroundColor: '#fff',
    width: '100%',
    minHeight: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 70,
    paddingBottom: 45,
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    color: '#212121',
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.3,
  },
});
