import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth, db } from './config';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { errorFormat } from '../utils/errorFormat';

export const registerUser = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const logIn = async (email, password) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserData = async (user) => {
  const usersCollectionRef = collection(db, 'users');
  const data = await getDocs(usersCollectionRef);
  const filteredData = data.docs.map((doc) => ({
    ...doc.data(),
  }));
  return filteredData.find((data) => user.uid === data.uid);
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    errorFormat(error.message);
  }
};

export const updateUserDocDataInFirestore = async (docRefId, patch, path) => {
  try {
    const ref = doc(db, path, docRefId);

    await updateDoc(ref, patch);
  } catch (error) {
    errorFormat(error.message);
  }
};

export const writeDataToFirestore = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), userData);

    updateUserDocDataInFirestore(docRef.id, { id: docRef.id }, 'users');

    return { id: docRef.id };
  } catch (error) {
    errorFormat(error.message);
  }
};

const updateUserProfile = async (update) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      errorFormat(error.message);
    }
  }
};
