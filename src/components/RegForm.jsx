import { StyleSheet, Text } from "react-native";
import { useState } from "react";
import { RegAvatar } from "./RegAvatar";
import { LargeButton } from "./LargeButton";
import { FormInput } from "./FormInput";

export const RegForm = ({ navigation, registerNewUser }) => {
  const [isFocused, setIsFocused] = useState(null);

  const [regLoginValue, setRegLoginValue] = useState("");
  const [regEmailValue, setRegEmailValue] = useState("");
  const [regPasswordValue, setRegPasswordValue] = useState("");

  const [avatar, setAvatar] = useState(null);

  const handleAvatarPress = () => {
    if (avatar) {
      setAvatar(null);
    } else {
      setAvatar(
        "https://thumbs.dreamstime.com/b/d-cg-rendering-super-woman-warrior-super-woman-warrior-98757814.jpg"
      );
    }
  };

  const regFormData = {
    avatar: avatar,
    login: regLoginValue,
    email: regEmailValue,
    password: regPasswordValue,
  };

  return (
    <>
      <RegAvatar avatar={avatar} handlePress={handleAvatarPress} />
      <Text style={styles.title}>Registration</Text>

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
        onPress={() => {
          registerNewUser(regFormData);
          navigation.navigate("Home", regFormData);
        }}
        text={"Register"}
        extraStyles={styles.loginRegisterBtnMargin}
        isDisabled={
          avatar && regLoginValue && regEmailValue && regPasswordValue
        }
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
});
