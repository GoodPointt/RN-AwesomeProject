import { StyleSheet, Text } from "react-native";
import { LargeButton } from "./LargeButton";
import { useState } from "react";
import { FormInput } from "./FormInput";

export const LoginForm = ({ navigation, loginUser }) => {
  const [isFocused, setIsFocused] = useState(null);

  const [loginEmailValue, setLoginEmailValue] = useState("");
  const [loginPasswordValue, setLoginPasswordValue] = useState("");

  const loginForm = {
    email: loginEmailValue,
    password: loginPasswordValue,
  };

  return (
    <>
      <Text style={styles.title}>Log in</Text>
      <FormInput
        placeholder={"E-mail"}
        name={"email"}
        value={loginEmailValue}
        inputMode={"email"}
        isFocused={isFocused === "email"}
        handleChange={(value) => setLoginEmailValue(value)}
        handleFocus={() => setIsFocused("email")}
        handleBlur={() => setIsFocused(null)}
      />
      <FormInput
        placeholder={"Password"}
        name={"password"}
        value={loginPasswordValue}
        inputMode={"text"}
        isFocused={isFocused === "password"}
        handleChange={(value) => setLoginPasswordValue(value)}
        handleFocus={() => setIsFocused("password")}
        handleBlur={() => setIsFocused(null)}
      />

      <LargeButton
        onPress={() => {
          console.log(loginForm);
          const foundUser = loginUser(loginForm);
          foundUser
            ? navigation.navigate("Home", foundUser)
            : alert("User not found or password wrong");
        }}
        text={"Log in"}
        extraStyles={styles.loginRegisterBtnMargin}
        isDisabled={loginEmailValue && loginPasswordValue}
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
    marginTop: 30,
  },
});
