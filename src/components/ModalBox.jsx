import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LargeButton } from './LargeButton';
import { FormInput } from './FormInput';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export const ModalBox = ({
  isModalVisible,
  setModalVisible,
  value,
  placeholder,
  handleChange,
  text,
  onPress,
}) => {
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Storage permission denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      handleChange(String(selectedAsset.uri));
    }
  };

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

        <TouchableOpacity onPress={handleImagePicker}>
          <Entypo name="image" size={50} color="black" />
          <Text style={styles.text}>Upload from gallery</Text>
        </TouchableOpacity>
        <LargeButton
          onPress={() => {
            setModalVisible(false);
            handleChange = { handleChange };
            {
              onPress && onPress();
            }
          }}
          text={'Confirm'}
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
    backgroundColor: '#cacacadf',
    padding: 20,
  },
});
