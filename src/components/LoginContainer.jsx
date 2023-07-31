import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LargeButton } from "./LargeButton";
import { useState } from "react";
import { FormInput } from "./FormInput";
import { BlueText } from "./BlueText";

export const LoginContainer = () => {
  const [isFocused, setIsFocused] = useState(null);

  const [regEmailValue, setRegEmailValue] = useState("");
  const [regPasswordValue, setRegPasswordValue] = useState("");

  const handleFocus = (name) => {
    switch (name) {
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
    <View style={styles.loginFormContainer}>
      <Text style={styles.title}>Log in</Text>
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
        onPress={() => console.log("Log in...")}
        text={"Log in"}
        extraStyles={styles.loginRegisterBtnMargin}
      />
      <TouchableOpacity onPress={() => console.log("Register...")}>
        <BlueText>Do not have account? Register...</BlueText>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  loginFormContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
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
    marginTop: 30,
  },
});
