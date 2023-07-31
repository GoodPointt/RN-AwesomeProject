import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { RegistrationAvatar } from "./RegistrationAvatar";
import { LargeButton } from "./LargeButton";
import { FormInput } from "./FormInput";
import { BlueText } from "./BlueText";

export const RegistrationContainer = () => {
  const [isFocused, setIsFocused] = useState(null);

  const [regLoginValue, setRegLoginValue] = useState("");
  const [regEmailValue, setRegEmailValue] = useState("");
  const [regPasswordValue, setRegPasswordValue] = useState("");

  const handleFocus = (name) => {
    switch (name) {
      case "login":
        setIsFocused("login");
        break;
      case "email":
        setIsFocused("email");
        break;
      case "password":
        setIsFocused("password");
        break;
      default:
        break;
    }
  };

  const handleBlur = (name) => {
    switch (name) {
      case "login":
        setIsFocused(null);
        break;
      case "email":
        setIsFocused(null);
        break;
      case "password":
        setIsFocused(null);
        break;
      default:
        break;
    }
  };

  const handleChange = (name, value) => {
    switch (name) {
      case "login":
        setRegLoginValue(value);
        break;
      case "email":
        setRegEmailValue(value);
        break;
      case "password":
        setRegPasswordValue(value);
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.regFormContainer}>
      <RegistrationAvatar />
      <Text style={styles.title}>Registration</Text>
      <FormInput
        key={"reg1"}
        placeholder={"Login"}
        name={"login"}
        value={regLoginValue}
        isFocused={isFocused === "login"}
        handleChange={(value) => handleChange("login", value)}
        handleFocus={() => handleFocus("login")}
        handleBlur={() => handleBlur("login")}
      />
      <FormInput
        key={"reg2"}
        placeholder={"E-mail"}
        name={"email"}
        value={regEmailValue}
        isFocused={isFocused === "email"}
        handleChange={(value) => handleChange("email", value)}
        handleFocus={() => handleFocus("email")}
        handleBlur={() => handleBlur("email")}
      />
      <FormInput
        key={"reg3"}
        placeholder={"Password"}
        name={"password"}
        value={regPasswordValue}
        isFocused={isFocused === "password"}
        handleChange={(value) => handleChange("password", value)}
        handleFocus={() => handleFocus("password")}
        handleBlur={() => handleBlur("password")}
      />

      <LargeButton
        onPress={() => console.log("Register...")}
        text={"Register"}
        extraStyles={styles.loginRegisterBtnMargin}
      />
      <TouchableOpacity onPress={() => console.log("Login...")}>
        <BlueText>Already have an account? Login</BlueText>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  regFormContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 90,
    paddingBottom: 45,
    paddingHorizontal: 16,
  },
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
