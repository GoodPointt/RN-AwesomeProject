// import { createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   orderBy,
//   query,
// } from 'firebase/firestore';
// import { db } from '../../firebase/config';
// import { updateUserDocDataInFirestore } from '../../firebase/auth';

// export const fetchComments = createAsyncThunk(
//   'comments/fetchComments',
//   async (postId, { rejectWithValue, getState }) => {
//     try {
//       const { user } = getState().user;

//       const commentsCollectionRef = collection(db, `posts/${postId}/comments`);
//       const unfilteredCommetsData = await getDocs(
//         query(commentsCollectionRef, orderBy('createdAt', 'desc'))
//       );

//       const commentsData = unfilteredCommetsData.docs.map((doc) => ({
//         ...doc.data(),
//       }));

//       const updatedCommentsData = await Promise.all(
//         commentsData.map(async (comment) => {
//           const docRef = await getDoc(doc(db, `users/${comment.owner.id}`));
//           const { avatar, name } = docRef.data();
//           const updatedComment = {
//             ...comment,
//             owner: { id: comment.owner.id, avatar, name },
//           };
//           return updatedComment;
//         })
//       );

//       return updatedCommentsData;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const addComment = createAsyncThunk(
//   'comments/addComment',
//   async (newComment, { rejectWithValue, getState }) => {
//     try {
//       const {
//         user: { user },
//         comments: { comments },
//         posts: { allPosts },
//       } = getState();

//       const docRef = await addDoc(
//         collection(db, `posts/${newComment.postId}/comments`),
//         newComment
//       );

//       updateUserDocDataInFirestore(
//         docRef.id,
//         {
//           owner: { id: user.id },
//           id: docRef.id,
//         },
//         `posts/${newComment.postId}/comments`
//       );

//       // updateUserDocDataInFirestore(
//       //   newComment.postId,
//       //   {
//       //     // comments: [],
//       //     isCommented: true,
//       //   },
//       //   `posts`
//       // );

//       return {
//         ...newComment,
//         id: docRef.id,
//         isCommented: true,
//       };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
