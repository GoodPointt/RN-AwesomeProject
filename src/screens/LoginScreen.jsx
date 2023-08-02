import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { LoginForm } from "../components/LoginForm";
import { TouchebleBlueText } from "../components/TouchebleBlueText";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/img/login-bg.jpg")}
    >
      <KeyboardAvoidingView
        style={styles.loginScreenAV}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-85}
      >
        <View style={styles.loginFormContainer}>
          <LoginForm navigation={navigation} />

          <TouchebleBlueText
            text={"Do not have account? Register..."}
            onPress={() => navigation.navigate("Registaration")}
          />
        </View>
      </KeyboardAvoidingView>
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
  loginFormContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
    paddingBottom: 45,
    paddingHorizontal: 16,
  },
  loginScreenAV: { flex: 1, width: "100%" },
});
