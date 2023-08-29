import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { PostInput } from './PostInput';
import { LargeButton } from './LargeButton';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CameraView } from './CameraView';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/posts/operations';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { uriToBlob } from '../utils/uriToBlob';
import { getImageUri } from '../utils/getImageUri';
// import { uploadImage } from '../utils/uploadImage';

export const CreatePostForm = () => {
  const dispatch = useDispatch();

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [coord, setCoord] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});

        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        setCoord(coords);
      } catch (error) {
        alert(error.message);
      }
    })();
  }, [isCameraOn]);

  const clearPostForm = () => {
    setLocation(null);
    setPhoto('');
    setName('');
    setIsCameraOn(false);
    setCoord(null);
    setProgress(0);
  };

  const uploadImage = (uri) => {
    return new Promise(async (resolve, reject) => {
      try {
        const blob = await uriToBlob(uri);

        const storageRef = ref(storage, `photos/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress.toFixed());
          },
          (error) => {
            reject(error.message);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setPhoto(downloadURL);
              resolve(downloadURL);
            } catch (error) {
              reject(error.message);
            }
          }
        );
      } catch (error) {
        reject(error.message);
      }
    });
  };

  const handePublishPost = async () => {
    setIsImageUploading(true);
    await uploadImage(photo)
      .then((downloadURL) => {
        return (newPost = {
          createdAt: Date.now(),
          photo: downloadURL,
          name,
          location: {
            name: location,
            coord,
          },
          likes: 0,
          isLiked: false,
          totalComments: 0,
          isCommented: false,
        });
      })
      .then((newPost) => dispatch(addPost(newPost)))
      .catch((error) => {
        alert('Opps... uploading failed😒', error);
      })
      .finally(() => setIsImageUploading(false));

    clearPostForm();

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View
          style={[styles.addImgContainer, isCameraOn && styles.extraStyles]}
        >
          {photo ? (
            isImageUploading ? (
              <>
                <ActivityIndicator size={'medium'} color={'#FF6C00'} />
                <Text style={styles.uploadingText}>
                  Uploading image...{progress}%
                </Text>
              </>
            ) : (
              <Image source={{ uri: photo }} style={styles.previewImg} />
            )
          ) : (
            !isCameraOn && (
              <TouchableOpacity onPress={() => setIsCameraOn(true)}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="camera-sharp" size={24} color="#BDBDBD" />
                </View>
              </TouchableOpacity>
            )
          )}
          {isCameraOn && !photo && <CameraView setPhoto={setPhoto} />}
        </View>

        <TouchableOpacity onPress={() => getImageUri(setPhoto)}>
          <Entypo name="image" size={50} color="black" />
          <Text style={styles.text}>Upload photo</Text>
        </TouchableOpacity>
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
          isDisabled={!photo || !location || !name}
          text={'Publish post'}
          extraStyles={{ backgroundColor: '#F6F6F6' }}
          onPress={() => handePublishPost()}
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

  iconWrapper: {
    height: 60,
    width: 60,
    backgroundColor: '#ffffff',
    borderRadius: 50,

    alignItems: 'center',
    justifyContent: 'center',
  },
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
  previewImg: { width: '100%', height: '100%' },
  uploadingText: { color: '#fff', fontSize: 20 },
});
