import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { uriToBlob } from './uriToBlob';

export const uploadImage = (path, uri, setProgress, setPhoto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const manipulatedImage = await manipulateAsync(uri, [], {
        compress: 0.3,
        format: SaveFormat.JPEG,
      });

      const blob = await uriToBlob(manipulatedImage.uri);
      if (blob.size > 1000000) throw { message: 'file is too large' };

      const storageRef = ref(storage, `${path}/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress.toFixed());
        },
        (error) => {
          reject(error);
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
      reject(error);
    }
  });
};
