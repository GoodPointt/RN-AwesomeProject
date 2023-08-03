import { StyleSheet, Text } from "react-native";
import { LargeButton } from "./LargeButton";
import { FormInput } from "./FormInput";
import { useContext, useState } from "react";
import { loginUser } from "../utils/authHelpers";
import { UserContext } from "../hooks/useUsersAuth";

export const LoginForm = ({ navigation }) => {
  const { users } = useContext(UserContext);
  const [isFocused, setIsFocused] = useState(null);

  const [loginEmailValue, setLoginEmailValue] = useState("");
  const [loginPasswordValue, setLoginPasswordValue] = useState("");

  const resetForm = () => {
    setLoginEmailValue("");
    setLoginPasswordValue("");
  };

  const handleLogin = () => {
    const loginFormData = {
      email: loginEmailValue,
      password: loginPasswordValue,
    };

    console.log(loginFormData);

    const foundUser = loginUser(users, loginFormData);
    if (foundUser) {
      navigation.navigate("Home", foundUser);
      resetForm();
    } else alert("User not found or password wrong");
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
        onPress={() => handleLogin()}
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
