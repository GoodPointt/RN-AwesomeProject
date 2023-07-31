import { StyleSheet, Text } from "react-native";

export const BlueText = ({ children }) => {
  return <Text style={styles.subText}>{children}</Text>;
};

const styles = StyleSheet.create({
  subText: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
