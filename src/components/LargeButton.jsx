import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const LargeButton = ({ onPress, text, extraStyles, isDisabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, extraStyles]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text
        style={[
          styles.buttonTxt,
          text === "Publish post" && { color: "#BDBDBD" },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
