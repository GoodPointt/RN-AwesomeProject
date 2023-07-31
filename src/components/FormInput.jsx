import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { BlueText } from "./BlueText";

export const FormInput = ({
  key,
  placeholder,
  name,
  value,
  isFocused,
  handleChange,
  handleFocus,
  handleBlur,
}) => {
  const [isShown, setisShown] = useState(true);

  return (
    <View>
      <TextInput
        style={[styles.formInput, isFocused ? styles.focusedInput : null]}
        key={key}
        placeholder={placeholder}
        name={name}
        value={value}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={name === "password" && isShown}
      />
      {name === "password" && (
        <TouchableOpacity
          style={styles.showBtn}
          onPress={() => setisShown(!isShown)}
        >
          <BlueText>Show</BlueText>
        </TouchableOpacity>
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
