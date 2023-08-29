import * as ImagePicker from 'expo-image-picker';

export const getImageUri = async (setPhoto) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Storage permission denied');
    return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });
  if (!result.canceled && result.assets.length > 0) {
    const selectedAsset = result.assets[0].uri;
    setPhoto(String(selectedAsset));
  }
};
