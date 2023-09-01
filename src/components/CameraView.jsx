import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { cameraPremissionsRequest } from '../utils/cameraPremissionsRequest';

export const CameraView = ({ setPhoto, setIsCameraOn }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    cameraPremissionsRequest(setHasPermission);
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCameraRef}>
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
                setPhoto(uri);
              }
            }}
          >
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      <TouchableOpacity
        style={styles.closeCamera}
        onPress={() => setIsCameraOn(false)}
      >
        <EvilIcons name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.flipContainer}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      >
        <MaterialCommunityIcons name="camera-flip" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  photoView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },

  flipContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
    alignSelf: 'flex-end',
  },

  button: { flex: 0.13, alignSelf: 'center' },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: '#fff',
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  closeCamera: { position: 'absolute', left: 10, top: 10 },
});
