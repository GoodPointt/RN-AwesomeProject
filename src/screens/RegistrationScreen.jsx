import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { RegistrationContainer } from "../components/RegistartionContainer/RegistrationContainer";
import { styles } from "../styles";

export const RegistrationScreen = () => {
  // const behavior = Platform.OS === "ios" ? "padding" : "height";

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/img/login-bg.jpg")}
    >
      {/* <KeyboardAvoidingView behavior={behavior} style={styles.container}> */}
      <ScrollView>
        <RegistrationContainer />
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  );
};
