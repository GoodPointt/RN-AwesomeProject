import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const TouchebleBlueText = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={styles.subText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subText: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
