import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export const uploadImage = (uri, setPhoto, setProgress, uriToBlob) => {
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
