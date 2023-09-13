import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export const MapScreen = ({ route: { params } }) => {
  const {
    location: { coord, name },
  } = params;

  return (
    <View style={styles.container}>
      {coord ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          region={coord}
          mapType="standard"
          minZoomLevel={5}
        >
          <Marker title={name} coordinate={coord} description={name} />
        </MapView>
      ) : (
        <Text>Sorry, incorrect location 😒</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
