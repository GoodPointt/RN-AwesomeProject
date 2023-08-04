import { Modal, StyleSheet, View } from "react-native";
import { LargeButton } from "./LargeButton";

export const ModalBox = ({ children, isModalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        {children}
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
