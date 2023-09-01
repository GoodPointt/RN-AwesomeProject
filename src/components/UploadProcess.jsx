import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const UploadProcess = ({ progress }) => {
  return <Text style={styles.uploadingText}>Uploading {progress}%</Text>;
};

const styles = StyleSheet.create({
  uploadingText: { color: '#fff', fontSize: 18 },
});
