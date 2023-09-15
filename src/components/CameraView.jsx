import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cameraPremissionsRequest } from '../utils/cameraPremissionsRequest';

export const CameraView = ({ setPhoto }) => {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const makePhoto = async () => {
    if (cameraRef.current) {
      setIsPhotoLoading(true);
      try {
        const { uri } = await cameraRef.current.takePictureAsync({
          quality: 0.3,
        });
        await MediaLibrary.createAssetAsync(uri);

        setPhoto(uri);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPhotoLoading(false);
      }
    }
  };

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
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.photoView}>
          {isPhotoLoading && (
            <ImageBackground
              style={[
                {
                  position: 'absolute',
                  alignSelf: 'center',
                  width: '100%',
                  height: 240,
                  zIndex: 9,
                },
              ]}
              source={require('../assets/img/loading.gif')}
            ></ImageBackground>
          )}
          <TouchableOpacity style={styles.button} onPress={makePhoto}>
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>

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

  button: { flex: 0.25, alignSelf: 'center' },

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
  photoLoader: { height: 240, width: '100%', overflow: 'hidden' },
});
