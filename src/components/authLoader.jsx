import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export const AuthLoader = ({ type }) => {
  return (
    <View style={styles.container}>
      {type === 'login' && <Text style={styles.text}>Logging in...</Text>}
      {type === 'register' && (
        <Text style={styles.text}>Creating new user...</Text>
      )}
      <ActivityIndicator size={100} color={'#FF6C00'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  text: {
    color: '#FFf',
    fontSize: 24,
  },
});
