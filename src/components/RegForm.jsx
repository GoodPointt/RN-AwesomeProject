import { Modal, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { RegAvatar } from "./RegAvatar";
import { LargeButton } from "./LargeButton";
import { FormInput } from "./FormInput";
import { registerNewUser } from "../utils/authHelpers";
import { UserContext } from "../hooks/useUsersAuth";

export const RegForm = ({ navigation }) => {
  const { users, setUsers } = useContext(UserContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(null);

  const [regLoginValue, setRegLoginValue] = useState("");
  const [regEmailValue, setRegEmailValue] = useState("");
  const [regPasswordValue, setRegPasswordValue] = useState("");

  const [avatar, setAvatar] = useState(null);

  const handleAvatarPress = () => {
    if (!avatar) setModalVisible(true);
    if (avatar) setAvatar(null);
  };

  const handleSubmit = () => {
    const regFormData = {
      avatar: avatar,
      login: regLoginValue,
      email: regEmailValue,
      password: regPasswordValue,
    };

    console.log(regFormData);
    registerNewUser(users, setUsers, regFormData)
      ? navigation.navigate("Home", regFormData)
      : alert("Username or e-mail is already exist");
  };

  return (
    <>
      <RegAvatar avatar={avatar} handleAvatarPress={handleAvatarPress} />
      <Text style={styles.title}>Registration</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.text}>Enter URL for your avatar</Text>
          <FormInput
            style={styles.modalInput}
            placeholder="Avatar URL"
            value={avatar}
            handleChange={setAvatar}
          />
          <LargeButton
            onPress={() => {
              setModalVisible(false);
              setAvatar(avatar);
            }}
            text={"Confirm"}
            isDisabled={true}
          />
        </View>
      </Modal>

      <FormInput
        placeholder={"Login"}
        name={"login"}
        value={regLoginValue}
        inputMode={"text"}
        isFocused={isFocused === "login"}
        handleChange={setRegLoginValue}
        handleFocus={() => setIsFocused("login")}
        handleBlur={() => setIsFocused(null)}
      />
      <FormInput
        placeholder={"E-mail"}
        name={"email"}
        value={regEmailValue}
        inputMode={"email"}
        isFocused={isFocused === "email"}
        handleChange={setRegEmailValue}
        handleFocus={() => setIsFocused("email")}
        handleBlur={() => setIsFocused(null)}
      />
      <FormInput
        placeholder={"Password"}
        name={"password"}
        value={regPasswordValue}
        inputMode={"text"}
        isFocused={isFocused === "password"}
        handleChange={setRegPasswordValue}
        handleFocus={() => setIsFocused("password")}
        handleBlur={() => setIsFocused(null)}
      />
      <LargeButton
        onPress={() => handleSubmit()}
        text={"Register"}
        extraStyles={styles.loginRegisterBtnMargin}
        isDisabled={regLoginValue && regEmailValue && regPasswordValue}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.3,
    marginBottom: 33,
  },
  loginRegisterBtnMargin: {
    marginBottom: 16,
    marginTop: 43,
  },
  modalContainer: {
    flex: 1,

    borderRadius: 14,
    backgroundColor: "#cacacadf",
    padding: 20,
  },
  text: {
    color: "#090400a6",
    fontSize: 19,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Roboto-Medium",
  },
});
