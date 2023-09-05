import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const UploadProcess = ({ progress, textColor }) => {
  return (
    <Text style={[styles.uploadingText, { color: textColor }]}>
      Uploading {progress}%
    </Text>
  );
};

const styles = StyleSheet.create({
  uploadingText: { color: '#000', fontSize: 18 },
});
