import React from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';

export const UploadProcess = ({ progress, textColor }) => {
  return (
    <>
      <Text style={[styles.uploadingText, { color: textColor }]}>
        Uploading {progress}%
      </Text>

      <Progress.Bar progress={progress} width={200} color="#fd5f04" />
    </>
  );
};

const styles = StyleSheet.create({
  uploadingText: { color: '#000', fontSize: 18 },
});
