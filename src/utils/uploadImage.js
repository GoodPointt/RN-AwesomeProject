import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { uriToBlob } from './uriToBlob';

export const uploadImage = (path, uri, setProgress, setPhoto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blob = await uriToBlob(uri);

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
