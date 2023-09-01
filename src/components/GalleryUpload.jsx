import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getImageUri } from '../utils/getImageUri';
import { Entypo } from '@expo/vector-icons';

const GalleryUpload = ({ setPhoto }) => {
  return (
    <TouchableOpacity
      onPress={() => getImageUri(setPhoto)}
      style={styles.uploadWrap}
    >
      <Entypo name="image" size={50} color="#535353" />
      <Text style={styles.text}>Upload from gallery</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  uploadWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  text: {
    fontSize: 18,
    color: '#9a9a9a',
  },
});

export default GalleryUpload;
