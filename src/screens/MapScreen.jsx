import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route: { params } }) => {
  const {
    location: { coord, name },
  } = params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={coord}
        mapType="standard"
        minZoomLevel={5}
        // onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
      >
        <Marker title={name} coordinate={coord} description={name} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
