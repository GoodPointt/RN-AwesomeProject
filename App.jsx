import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { useFonts } from "expo-font";
import { LoginScreen } from "./src/screens/LoginScreen";

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  const behavior = Platform.OS === "ios" ? "padding" : "height";

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={behavior}
        style={styles.container}
        keyboardVerticalOffset={-160}
      >
        {/* <RegistrationScreen /> */}
        <LoginScreen />
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
