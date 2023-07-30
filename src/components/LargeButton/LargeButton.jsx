import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles";

export const LargeButton = ({ onPress, text, extraStyles }) => {
  return (
    <TouchableOpacity style={[styles.button, extraStyles]} onPress={onPress}>
      <Text style={styles.buttonTxt}>{text}</Text>
    </TouchableOpacity>
  );
};
