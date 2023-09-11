import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Toast from 'react-native-toast-message';

export const cameraPremissionsRequest = async (setHasPermission) => {
  try {
    const { status } = await Camera.requestCameraPermissionsAsync();
    await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') alert('Permission to access camera was denied');

    setHasPermission(status === 'granted');
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error.message,
    });
  }
};
