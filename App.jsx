import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFonts } from "expo-font";

import { UserContext, useUserAuth } from "./src/hooks/useUsersAuth";
import { MainNavigation } from "./src/routes/MainNavigation";

export default function App() {
  const { users, setUsers, userId, setUserId } = useUserAuth();

  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <UserContext.Provider value={{ users, setUsers, userId, setUserId }}>
          <MainNavigation />
        </UserContext.Provider>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
