import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { RegForm } from "../components/RegForm";
import { TouchebleBlueText } from "../components/TouchebleBlueText";

export const RegistrationScreen = () => {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/img/login-bg.jpg")}
    >
      <KeyboardAvoidingView
        style={styles.regScreenAV}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-70}
      >
        <View style={styles.regContainer}>
          <RegForm />
          <TouchebleBlueText
            text={"Already have an account? Login"}
            onPress={() => console.log("Login...")}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  regScreenAV: { flex: 1, width: "100%" },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    resizeMode: "cover",
  },
  regContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 90,
    paddingBottom: 45,
    paddingHorizontal: 16,
  },
});
