import { Modal, StyleSheet, Text, View } from "react-native";
import { LargeButton } from "./LargeButton";
import { FormInput } from "./FormInput";

export const ModalBox = ({
  isModalVisible,
  setModalVisible,
  value,
  placeholder,
  handleChange,
  text,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.text}>{text}</Text>
        <FormInput
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
        />
        <LargeButton
          onPress={() => {
            setModalVisible(false);
          }}
          text={"Confirm"}
          isDisabled={false}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    borderRadius: 14,
    backgroundColor: "#cacacadf",
    padding: 20,
  },
});
