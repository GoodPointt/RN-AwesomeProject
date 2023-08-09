import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { TabNavigation } from "./TabNavigation";
import { AuthStackNavigator } from "./AuthNavigation";
import { CommentsScreen } from "../screens/CommentsScreen";
import { CustomHeader } from "../components/CustomHeader";

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
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={({ navigation }) => ({
            header: () => (
              <CustomHeader
                title={"Comments"}
                navigation={navigation}
                isShown={"left"}
              />
            ),
          })}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
