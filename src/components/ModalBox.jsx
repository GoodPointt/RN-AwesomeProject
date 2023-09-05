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
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import vars from '../utils/vars';

export const ModalBox = ({
  isModalVisible,
  setModalVisible,
  setAvatar,
  profile,
}) => {
  const [photo, setPhoto] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isUploading, setisUploading] = useState(false);

  const dispatch = useDispatch();

  const applyNewAvatar = async () => {
    try {
      if (profile && photo) {
        setisUploading(true);
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
        setisUploading(false);
        return;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Opps... uploading failed😒',
        text2: error.message,
      });
    }

    !photo ? setAvatar(vars.DEFAULT_AVATAR) : setAvatar(photo);
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
              <UploadProcess progress={progress} textColor={'#fff'} />
            </View>
          ) : photo ? (
            <>
              <Image source={{ uri: photo }} style={styles.previewImg} />
              <TouchableOpacity onPress={() => setPhoto('')}>
                <FontAwesome5 name="trash-alt" size={24} color="#535353" />
              </TouchableOpacity>
            </>
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
          isDisabled={isUploading}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#adacacdf',
    padding: 20,
    gap: 60,
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
    borderRadius: 8,

    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  previewImg: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    marginBottom: 10,
  },
  iconWrapper: {
    height: 60,
    width: 60,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraStyles: { width: '100%', height: '30%' },
});
