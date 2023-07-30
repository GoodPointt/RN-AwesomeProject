import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
} from "react-native";
import { styles } from "../styles";
import { LoginContainer } from "../components/LoginContainer/LoginContainer";

export const LoginScreen = () => {
  // const behavior = Platform.OS === "ios" ? "padding" : "height";

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/img/login-bg.jpg")}
    >
      {/* <KeyboardAvoidingView behavior={behavior} style={styles.container}> */}
      <ScrollView>
        <LoginContainer />
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  );
};
