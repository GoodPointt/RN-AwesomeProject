import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { RegistrationScreen } from "../screens/RegistrationScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { Home } from "../screens/Home";
import { MaterialIcons } from "@expo/vector-icons";

export const MainNavigation = () => {
  const MainStack = createStackNavigator();

  return (
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
          options={{ headerMode: "none" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
