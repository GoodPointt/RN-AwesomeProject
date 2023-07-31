import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { RegistrationContainer } from "../components/RegistrationContainer";

export const RegistrationScreen = () => {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/img/login-bg.jpg")}
    >
      <RegistrationContainer />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    resizeMode: "cover",
  },
});
