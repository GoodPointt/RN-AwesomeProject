import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { PostInput } from './PostInput';
import { LargeButton } from './LargeButton';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CameraView } from './CameraView';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/posts/operations';

import { UploadProcess } from './UploadProcess';
import { locationPremissionsRequest } from '../utils/locationPremissionsRequest';
import { uploadImage } from '../utils/uploadImage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import GalleryUpload from './GalleryUpload';

export const CreatePostForm = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [coord, setCoord] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    locationPremissionsRequest(setCoord);
  }, [isCameraOn]);

  const clearPostForm = () => {
    setLocation(null);
    setPhoto('');
    setName('');
    setIsCameraOn(false);
    setCoord(null);
    setProgress(0);
  };

  const handePublishPost = async () => {
    setIsImageUploading(true);
    await uploadImage('photos', photo, setProgress, setPhoto)
      .then((downloadURL) => {
        return (newPost = {
          createdAt: Date.now(),
          photo: downloadURL,
          name,
          location: {
            name: location,
            coord,
          },
          likes: [],
          comments: [],
          isCommented: false,
          isLiked: false,
        });
      })
      .then((newPost) => dispatch(addPost(newPost)))
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Opps... uploading failed😒',
          text2: error.message,
        });
      })
      .finally(() => setIsImageUploading(false));

    clearPostForm();

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View
          style={[
            styles.addImgContainer,
            isCameraOn && !photo && styles.extraStyles,
          ]}
        >
          {photo ? (
            isImageUploading ? (
              <>
                <ActivityIndicator size={'medium'} color={'#FF6C00'} />
                <UploadProcess progress={progress} />
              </>
            ) : (
              <Image source={{ uri: photo }} style={styles.previewImg} />
            )
          ) : (
            !photo && <CameraView setPhoto={setPhoto} />
          )}
        </View>
        <GalleryUpload setPhoto={setPhoto} />

        <View style={styles.inputsWrapper}>
          <PostInput
            placeholder={'Name...'}
            name={'name'}
            value={name}
            inputMode={'text'}
            handleChange={setName}
          />
          <PostInput
            placeholder={'Location...'}
            name={'location'}
            value={location}
            inputMode={'text'}
            handleChange={setLocation}
          />
        </View>
        <LargeButton
          isDisabled={!photo || !location || !name || isImageUploading}
          text={'Publish post'}
          extraStyles={{ backgroundColor: '#F6F6F6' }}
          onPress={() => handePublishPost()}
          disabledText={
            isImageUploading ? 'Uploading...' : 'Fill in all fields to continue'
          }
        />
      </View>
      <View style={styles.deleteImgWrapper}>
        <TouchableOpacity onPress={() => clearPostForm()}>
          <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  extraStyles: { backgroundColor: '#000' },
  addImgContainer: {
    overflow: 'hidden',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  wrap: { flexGrow: 1 },
  text: {
    color: '#BDBDBD',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  inputsWrapper: {
    marginVertical: 32,
    gap: 16,
  },
  deleteImgWrapper: {
    alignSelf: 'center',
  },
  previewImg: { width: '100%', height: '100%', borderRadius: 8 },
  previewImgPlaceholder: { height: 240, width: '100%', overflow: 'hidden' },
});
