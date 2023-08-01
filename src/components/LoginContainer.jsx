import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LargeButton } from "./LargeButton";
import { useState } from "react";
import { FormInput } from "./FormInput";
import { BlueText } from "./BlueText";

export const LoginContainer = () => {
  const [isFocused, setIsFocused] = useState(null);

  const [loginEmailValue, setLoginEmailValue] = useState("");
  const [loginPasswordValue, setLoginPasswordValue] = useState("");

  const loginForm = {
    email: loginEmailValue,
    password: loginPasswordValue,
  };

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
        setLoginEmailValue(value);
        break;
      case "password":
        setLoginPasswordValue(value);
        break;

      default:
        break;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1, width: "100%" }}
      keyboardVerticalOffset={-85}
    >
      <View style={styles.loginFormContainer}>
        <Text style={styles.title}>Log in</Text>
        <FormInput
          key={"log1"}
          placeholder={"E-mail"}
          name={"email"}
          value={loginEmailValue}
          inputMode={"email"}
          isFocused={isFocused === "email"}
          handleChange={(value) => handleChange("email", value)}
          handleFocus={() => handleFocus("email")}
          handleBlur={() => handleBlur("email")}
        />
        <FormInput
          key={"log2"}
          placeholder={"Password"}
          name={"password"}
          value={loginPasswordValue}
          inputMode={"text"}
          isFocused={isFocused === "password"}
          handleChange={(value) => handleChange("password", value)}
          handleFocus={() => handleFocus("password")}
          handleBlur={() => handleBlur("password")}
        />

        <LargeButton
          onPress={() => console.log(loginForm)}
          text={"Log in"}
          extraStyles={styles.loginRegisterBtnMargin}
          isDisabled={loginEmailValue && loginPasswordValue}
        />
        <TouchableOpacity onPress={() => console.log("Register...")}>
          <BlueText>Do not have account? Register...</BlueText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
