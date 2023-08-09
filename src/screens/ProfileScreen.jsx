import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { ProfileAvatar } from "../components/ProfileAvatar";

import { useContext } from "react";
import { UserContext } from "../hooks/useUsersAuth";

export const ProfileScreen = () => {
  const { userId, users, setUsers } = useContext(UserContext);

  const { avatar } = users.find((user) => user.id === userId);

  const handleAvatarChange = (userId, newAva) =>
    setUsers((state) =>
      state.map((user) => {
        if (user.id === userId) user.avatar = newAva;
        return user;
      })
    );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-165}
      style={styles.container}
    >
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/img/login-bg.jpg")}
      >
        <View style={styles.profileContainer}>
          <ProfileAvatar
            currentAva={avatar}
            handleAvatarChange={handleAvatarChange}
            userId={userId}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    resizeMode: "cover",
  },
  profileContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 90,
    paddingBottom: 45,
    paddingHorizontal: 16,
  },
});
