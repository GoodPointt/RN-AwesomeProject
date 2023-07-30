import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { RegistrationAvatar } from "../RegistrationAvatar/RegistrationAvatar";
import { LargeButton } from "../LargeButton/LargeButton";
import { styles } from "../../styles";

export const RegistrationContainer = () => {
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [regLoginValue, setRegLoginValue] = useState("");
  const [regEmailValue, setRegEmailValue] = useState("");
  const [regPasswordValue, setRegPasswordValue] = useState("");

  const formValues = {
    regLoginValue,
    regEmailValue,
    regPasswordValue,
  };

  const handleFocus = (name) => {
    switch (name) {
      case "login":
        setIsLoginFocused(true);
        break;
      case "email":
        setIsEmailFocused(true);
        break;
      case "password":
        setIsPasswordFocused(true);
        break;
      default:
        break;
    }
  };

  const handleBlur = (name) => {
    switch (name) {
      case "login":
        setIsLoginFocused(false);
        break;
      case "email":
        setIsEmailFocused(false);
        break;
      case "password":
        setIsPasswordFocused(false);
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
      <TextInput
        style={[styles.loginInput, isLoginFocused ? styles.focusedInput : null]}
        key="reg1"
        placeholder="Login"
        name="login"
        value={regLoginValue}
        onChangeText={(value) => handleChange("login", value)}
        onFocus={() => handleFocus("login")}
        onBlur={() => handleBlur("login")}
      />
      <TextInput
        style={[styles.loginInput, isEmailFocused ? styles.focusedInput : null]}
        key="reg2"
        placeholder="E-mail"
        name="email"
        value={regEmailValue}
        onChangeText={(value) => handleChange("email", value)}
        onFocus={() => handleFocus("email")}
        onBlur={() => handleBlur("email")}
      />
      <TextInput
        style={[
          styles.loginInput,
          styles.relative,
          isPasswordFocused ? styles.focusedInput : null,
        ]}
        key="reg3"
        placeholder="Password"
        name="password"
        value={regPasswordValue}
        onChangeText={(value) => handleChange("password", value)}
        onFocus={() => handleFocus("password")}
        onBlur={() => handleBlur("password")}
      />
      <TouchableOpacity
        style={styles.showBtn}
        onPress={() => console.log("Show password...")}
      >
        <Text style={styles.subText}>Show</Text>
      </TouchableOpacity>
      <LargeButton
        onPress={() => console.log("Register...")}
        text={"Register"}
        extraStyles={styles.loginRegisterBtnMargin}
      />
      <TouchableOpacity onPress={() => console.log("Login...")}>
        <Text style={styles.subText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};
