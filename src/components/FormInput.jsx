import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { TouchebleBlueText } from "./TouchebleBlueText";

export const FormInput = ({
  placeholder,
  name,
  value,
  inputMode,
  isFocused,
  handleChange,
  handleFocus,
  handleBlur,
}) => {
  const [isToucheble, setIsToucheble] = useState(true);

  return (
    <View>
      <TextInput
        inputMode={inputMode}
        style={[styles.formInput, isFocused ? styles.focusedInput : null]}
        placeholder={placeholder}
        name={name}
        value={value}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={name === "password" && isToucheble}
      />
      {name === "password" && value && (
        <TouchebleBlueText
          style={styles.showBtn}
          onPress={() => setIsToucheble(!isToucheble)}
          text={isToucheble ? "Show" : "Hide"}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    width: "100%",
    padding: 16,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#e8e8e8",
    borderStyle: "solid",
    marginBottom: 16,
  },
  focusedInput: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },
  showBtn: { position: "absolute", top: 17, right: 16 },
});
