import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFonts } from "expo-font";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { Home } from "./src/screens/Home";
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  const MainStack = createStackNavigator();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerMode: "none" }}
            />
            <MainStack.Screen
              name="Registaration"
              component={RegistrationScreen}
              options={{ headerMode: "none" }}
            />
            <MainStack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerRight: () => (
                  <MaterialIcons
                    name="logout"
                    size={24}
                    color="grey"
                    onPress={() => navigation.navigate("Login")}
                  />
                ),
                headerRightContainerStyle: { paddingRight: 16 },
                headerLeft: () => null,
                title: "Posts",
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#fff",
                  borderBottomWidth: 1,
                  borderColor: "#00000028",
                  elevation: 5,
                },
              })}
            />
          </MainStack.Navigator>
        </NavigationContainer>
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
