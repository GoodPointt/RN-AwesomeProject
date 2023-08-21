import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ProfileAvatar } from '../components/ProfileAvatar';

import { PostItem } from '../components/PostItem';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { fetchPosts } from '../redux/posts/operations';
import { logout, updateUserDocDataInFirestore } from '../firebase/auth';
import { removeUser, setUpUser } from '../redux/user/userSlice';

export const ProfileScreen = () => {
  const { user, token, isLoggedIn, isRefreshing } = useAuth();
  const { posts, status, error } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(user));
  }, [dispatch]);

  const navigation = useNavigation();

  const handleAvatarChange = async (userId, newAva) => {
    dispatch(
      setUpUser({
        user: {
          avatar: newAva,
        },
      })
    );
    await updateUserDocDataInFirestore(userId, { avatar: newAva }, 'users');
  };

  // const incrementLike = (postId) => {
  //   setUsers((state) =>
  //     state.map((user) => {
  //       if (user.id === userId) {
  //         return {
  //           ...user,
  //           posts: user.posts.map((post) =>
  //             post.id === postId ? { ...post, likes: post.likes + 1 } : post
  //           ),
  //         };
  //       } else {
  //         return user;
  //       }
  //     })
  //   );
  // };

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
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.logoutIco}
            onPress={() => {
              dispatch(removeUser());
              logout();
              navigation.navigate('Auth', { screen: 'Login' });
            }}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <ProfileAvatar
            currentAva={user?.avatar}
            handleAvatarChange={handleAvatarChange}
            userId={user?.id}
          />
          {status === 'resolved' && posts?.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={posts}
              renderItem={({ item }) => (
                <PostItem
                  item={item}
                  incrementLike={() => incrementLike(item.id)}
                  commentDetails={() => {
                    navigation.navigate('Comments', {
                      post: item,
                      currentUser: user,
                    });
                  }}
                  locationDetails={() => navigation.navigate('Map', item)}
                />
              )}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl onRefresh={() => dispatch(fetchPosts())} />
              }
            />
          )}
          {status === 'loading' && <Text>Loading...</Text>}
          {status === 'rejected' && (
            <Text>Opps and error occured: '{error}' 😒</Text>
          )}
        </View>
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
    paddingTop: 90,
    paddingBottom: 45,
    paddingHorizontal: 16,
  },

  logoutIco: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
