import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "../screens/PostsScreen";
import { CreatePostsScreen } from "../screens/CreatePostsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { CustomHeader } from "../components/CustomHeader";

export const TabNavigation = ({ userId }) => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let isActive;
          if (route.name === "PostsScreen") {
            isActive = focused;
            return (
              <View
                style={[
                  styles.iconItem,
                  isActive ? styles.activeIconItem : null,
                ]}
              >
                <SimpleLineIcons
                  name="grid"
                  size={24}
                  color={isActive ? "#fff" : "#212121ba"}
                />
              </View>
            );
          }
          if (route.name === "CreatePostsScreen") {
            isActive = focused;
            return (
              <View
                style={[
                  styles.iconItem,
                  isActive ? styles.activeIconItem : null,
                ]}
              >
                <AntDesign
                  name="plus"
                  size={24}
                  color={isActive ? "#fff" : "#212121ba"}
                />
              </View>
            );
          }
          if (route.name === "ProfileScreen") {
            isActive = focused;

            return (
              <View
                style={[
                  styles.iconItem,
                  isActive ? styles.activeIconItem : null,
                ]}
              >
                <Feather
                  name="user"
                  size={24}
                  color={isActive ? "#fff" : "#212121ba"}
                />
              </View>
            );
          }
        },
        tabBarLabel: () => null,
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "PostsScreen",
          header: () => (
            <CustomHeader
              title={"Posts"}
              navigation={navigation}
              isShown={"right"}
            />
          ),
        })}
      />

      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "CreatePostsScreen",
          header: () => (
            <CustomHeader
              title={"Create post"}
              navigation={navigation}
              isShown={"left"}
            />
          ),
          tabBarStyle: { display: "none" },
        })}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "ProfileScreen",
          header: () => (
            <CustomHeader
              title={"Profile"}
              navigation={navigation}
              isShown={"left"}
            />
          ),
        })}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  iconItem: {
    borderRadius: 20,
    padding: 5,
  },
  activeIconItem: {
    backgroundColor: "#FF6C00",
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
