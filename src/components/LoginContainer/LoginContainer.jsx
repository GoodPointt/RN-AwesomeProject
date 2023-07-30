import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles";
import { LargeButton } from "../LargeButton/LargeButton";
import { useState } from "react";

export const LoginContainer = () => {
  const [isMailFocused, setIsMailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);

  const [logEmailValue, setLogEmailValue] = useState("");
  const [logPasswordValue, setLogPasswordValue] = useState("");

  const handleFocus = (name) => {
    switch (name) {
      case "email":
        setIsMailFocused(true);
        break;
      case "password":
        setIsPassFocused(true);
        break;
      default:
        break;
    }
  };

  const handleBlur = (name) => {
    switch (name) {
      case "email":
        setIsMailFocused(false);
        break;
      case "password":
        setIsPassFocused(false);
        break;
      default:
        break;
    }
  };

  const handleChange = (name, value) => {
    switch (name) {
      case "email":
        setLogEmailValue(value);
        break;
      case "password":
        setLogPasswordValue(value);
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.loginFormContainer}>
      <Text style={styles.title}>Log in</Text>
      <TextInput
        style={[styles.loginInput, isMailFocused ? styles.focusedInput : null]}
        key="log1"
        placeholder="E-mail"
        name="email"
        value={logEmailValue}
        onChangeText={(value) => handleChange("email", value)}
        onFocus={() => handleFocus("email")}
        onBlur={() => handleBlur("email")}
      />
      <TextInput
        style={[
          styles.loginInput,
          styles.relative,
          isPassFocused ? styles.focusedInput : null,
        ]}
        key="log2"
        placeholder="Password"
        name="password"
        value={logPasswordValue}
        onChangeText={(value) => handleChange("password", value)}
        onFocus={() => handleFocus("password")}
        onBlur={() => handleBlur("password")}
      />
      <TouchableOpacity
        style={styles.showBtn2}
        onPress={() => console.log("Show password...")}
      >
        <Text style={styles.subText}>Show</Text>
      </TouchableOpacity>
      <LargeButton
        onPress={() => console.log("Log in...")}
        text={"Log in"}
        extraStyles={styles.loginRegisterBtnMargin}
      />
      <TouchableOpacity onPress={() => console.log("Register...")}>
        <Text style={styles.subText}>Do not have account? Register...</Text>
      </TouchableOpacity>
    </View>
  );
};
