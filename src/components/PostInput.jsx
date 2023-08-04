import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export const PostInput = ({ placeholder, name, value, handleChange }) => {
  return (
    <View>
      {name === "location" && (
        <SimpleLineIcons
          style={styles.locationIcon}
          name="location-pin"
          size={24}
          color="#BDBDBD"
        />
      )}
      <TextInput
        style={[styles.input, name === "location" && styles.pleft]}
        placeholder={placeholder}
        name={name}
        value={value}
        onChangeText={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  pleft: {
    paddingLeft: 28,
  },
  locationIcon: {
    position: "absolute",
    top: 20,
  },
});
