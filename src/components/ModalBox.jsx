import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { LargeButton } from './LargeButton';
import { useState } from 'react';
import { CameraView } from './CameraView';
import { uploadImage } from '../utils/uploadImage';
import { useDispatch } from 'react-redux';
import { setUpUser } from '../redux/user/userSlice';
import { updateUserDocDataInFirestore } from '../firebase/auth';
import { UploadProcess } from './UploadProcess';
import GalleryUpload from './GalleryUpload';
import { Ionicons } from '@expo/vector-icons';

export const ModalBox = ({
  isModalVisible,
  setModalVisible,
  setAvatar,
  profile,
}) => {
  const [photo, setPhoto] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  const applyNewAvatar = async () => {
    try {
      if (profile) {
        const url = await uploadImage('avatar', photo, setProgress, setAvatar);

        dispatch(
          setUpUser({
            user: {
              avatar: url,
            },
          })
        );

        await updateUserDocDataInFirestore(profile, { avatar: url }, 'users');

        setAvatar(url);
        setModalVisible(false);
        setPhoto('');
        setProgress(0);

        return;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Opps... uploading failed😒',
        text2: error.message,
      });
    }

    setAvatar(photo);
    setModalVisible(false);
    setPhoto('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.addImgContainer,
            isCameraOn && !photo && styles.extraStyles,
          ]}
        >
          {progress ? (
            <View style={styles.progressWrap}>
              <ActivityIndicator size={50} color={'#FF6C00'} />
              <UploadProcess progress={progress} />
            </View>
          ) : photo ? (
            <Image source={{ uri: photo }} style={styles.previewImg} />
          ) : (
            !isCameraOn && (
              <TouchableOpacity onPress={() => setIsCameraOn(true)}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="camera-sharp" size={24} color="#BDBDBD" />
                </View>
              </TouchableOpacity>
            )
          )}
          {isCameraOn && !photo && (
            <CameraView setPhoto={setPhoto} setIsCameraOn={setIsCameraOn} />
          )}
        </View>
        <GalleryUpload setPhoto={setPhoto} />

        <LargeButton
          onPress={applyNewAvatar}
          text={photo ? 'Confirm' : 'Back'}
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
    justifyContent: 'space-around',
  },
  progressWrap: {
    flex: 1,
    backgroundColor: '#3232328e',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  progressText: { color: '#fff', fontSize: 16 },
  addImgContainer: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,

    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  previewImg: { width: '100%', height: '100%', borderRadius: 8 },
  iconWrapper: {
    height: 60,
    width: 60,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraStyles: { width: '95%', height: '60%' },
});
