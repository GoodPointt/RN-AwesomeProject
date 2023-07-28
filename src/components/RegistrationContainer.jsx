import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../App";
import { useState } from "react";

export const RegistrationContainer = () => {
  const [loginValue, setLoginValue] = useState("");
  const [EmailValue, setEmailValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");

  const formValues = {
    loginValue,
    EmailValue,
    PasswordValue,
  };

  const handleChange = (name, value) => {
    switch (name) {
      case "login":
        setLoginValue(value);
        break;
      case "email":
        setEmailValue(value);
        break;
      case "password":
        setPasswordValue(value);
        break;

      default:
        break;
    }
  };
  return (
    <View style={styles.loginFormContainer}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={[styles.loginInput, styles.shadowedLoginInput]}
        key="1"
        placeholder="Login"
        name="login"
        value={loginValue}
        onChangeText={(value) => handleChange("login", value)}
      />
      <TextInput
        style={styles.loginInput}
        key="2"
        placeholder="E-mail"
        name="email"
        value={EmailValue}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        style={styles.loginInput}
        key="3"
        placeholder="Password"
        name="password"
        value={PasswordValue}
        onChangeText={(value) => handleChange("password", value)}
      />

      <TouchableOpacity
        style={[styles.button, styles.loginRegisterBtnMargin]}
        onPress={() => console.log("Register...")}
      >
        <Text style={styles.buttonTxt}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Login....")}>
        <Text style={styles.subText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};
