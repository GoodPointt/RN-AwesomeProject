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
import { updateTotalComments } from '../posts/postsSlice';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;
      const commentsCollectionRef = collection(
        db,
        `users/${user.id}/posts/${postId}/comments`
      );

      const response = await getDocs(
        query(commentsCollectionRef, orderBy('createdAt'))
      );

      const commentsData = response.docs.map((doc) => ({
        ...doc.data(),
      }));

      return commentsData;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (newComment, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
        comments: { comments },
      } = getState();

      const docRef = await addDoc(
        collection(db, `users/${user.id}/posts/${newComment.postId}/comments`),
        newComment
      );

      updateUserDocDataInFirestore(
        docRef.id,
        {
          id: docRef.id,
        },
        `users/${user.id}/posts/${newComment.postId}/comments`
      );

      updateUserDocDataInFirestore(
        newComment.postId,
        {
          totalComments: comments.length + 1,
          isCommented: true,
        },
        `users/${user.id}/posts`
      );

      return {
        ...newComment,
        id: docRef.id,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
