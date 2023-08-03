import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { RegForm } from "../components/RegForm";
import { TouchebleBlueText } from "../components/TouchebleBlueText";
import { useNavigation } from "@react-navigation/native";

export const RegistrationScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/img/login-bg.jpg")}
    >
      <View style={styles.regContainer}>
        <RegForm navigation={navigation} />

        <TouchebleBlueText
          text={"Already have an account? Login"}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
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
