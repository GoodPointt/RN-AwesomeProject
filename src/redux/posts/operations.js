import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { updateUserDocDataInFirestore } from '../../firebase/auth';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;
      const postsCollectionRef = collection(db, `users/${user.id}/posts`);

      const response = await getDocs(
        query(postsCollectionRef, orderBy('createdAt', 'desc'))
      );

      const postsData = response.docs.map((doc) => ({
        ...doc.data(),
      }));

      return postsData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (newPost, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;

      const docRef = await addDoc(
        collection(db, `users/${user.id}/posts`),
        newPost
      );

      updateUserDocDataInFirestore(
        docRef.id,
        {
          id: docRef.id,
        },
        `users/${user.id}/posts`
      );

      return {
        ...newPost,
        id: docRef.id,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
