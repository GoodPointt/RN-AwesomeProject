import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { TabNavigation } from "./TabNavigation";
import { AuthStackNavigator } from "./AuthNavigation";

export const MainNavigation = () => {
  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Auth">
        <MainStack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{ headerMode: "none" }}
        />
        <MainStack.Screen
          name="Home"
          component={TabNavigation}
          options={{ headerMode: "none" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
