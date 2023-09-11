import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';

export const locationPremissionsRequest = async (setCoord) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({});

    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    setCoord(coords);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error.message,
    });
  }
};
