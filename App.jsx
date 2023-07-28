import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <RegistrationScreen />
      <StatusBar style="auto" />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.3,
    marginBottom: 33,
  },
  subText: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  loginFormContainer: {
    marginTop: 220,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 90,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 220,
  },
  loginInput: {
    width: "100%",
    padding: 16,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#e8e8e8",
    borderStyle: "solid",
    marginBottom: 16,
  },
  shadowedLoginInput: {
    elevation: 4,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
  button: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  loginRegisterBtnMargin: {
    marginBottom: 16,
    marginTop: 43,
  },
  buttonTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
