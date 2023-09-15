import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { removeUser } from '../redux/user/userSlice';
import { logout } from '../firebase/auth';
import { useDispatch } from 'react-redux';
import { clearPosts } from '../redux/posts/postsSlice';

const LogoutButton = ({ profile }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={profile ? styles.logoutIco : null}
      onPress={() => {
        dispatch(removeUser());
        dispatch(clearPosts());
        logout();
      }}
    >
      <MaterialIcons name="logout" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutIco: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default LogoutButton;
