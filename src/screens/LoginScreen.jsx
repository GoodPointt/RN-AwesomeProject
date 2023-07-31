import { ImageBackground, StyleSheet } from "react-native";
import { LoginContainer } from "../components/LoginContainer";

export const LoginScreen = () => {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/img/login-bg.jpg")}
    >
      <LoginContainer />
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
