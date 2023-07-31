import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const LargeButton = ({ onPress, text, extraStyles }) => {
  return (
    <TouchableOpacity style={[styles.button, extraStyles]} onPress={onPress}>
      <Text style={styles.buttonTxt}>{text}</Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  button: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
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
