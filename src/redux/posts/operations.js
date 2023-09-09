import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { updateUserDocDataInFirestore } from '../../firebase/auth';

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async (_, { rejectWithValue, getState }) => {
    const {
      user: { user },
    } = getState();
    try {
      const usersCollectionRef = collection(db, 'users');
      const usersUnfilteredData = await getDocs(usersCollectionRef);
      const usersData = usersUnfilteredData.docs.map((doc) => ({
        ...doc.data(),
      }));

      const postsCollectionRef = collection(db, `posts`);
      const postsUnfilteredData = await getDocs(
        query(postsCollectionRef, orderBy('createdAt', 'desc'))
      );

      const postsData = postsUnfilteredData.docs
        .map((doc) => ({
          ...doc.data(),
        }))
        .map((post) => {
          const postAuthor = usersData.find(
            (user) => post.owner.id === user.id
          );

          if (post.likes.findIndex((like) => like === user.id) !== -1) {
            return {
              ...post,
              isCommented:
                post.comments.findIndex(
                  (comment) => comment.owner.id === user.id
                ) !== -1,
              isLiked: true,
              owner: {
                name: postAuthor.name,
                avatar: postAuthor.avatar,
                id: postAuthor.id,
              },
            };
          } else {
            return {
              ...post,
              isCommented:
                post.comments.findIndex(
                  (comment) => comment.owner.id === user.id
                ) !== -1,
              isLiked: false,
              owner: {
                name: postAuthor.name,
                avatar: postAuthor.avatar,
                id: postAuthor.id,
              },
            };
          }
        });

      return postsData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (_, { getState }) => {
    const {
      user: { user },
      posts: { allPosts },
    } = getState();
    allPosts.filter((post) => post.owner.id === user.id);
    return allPosts.filter((post) => post.owner.id === user.id);
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (newPost, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;

      const docRef = await addDoc(collection(db, `posts`), newPost);

      updateUserDocDataInFirestore(
        docRef.id,
        {
          id: docRef.id,
          owner: {
            name: user.name,
            avatar: user.avatar,
            id: user.id,
          },
        },
        `posts`
      );

      return {
        ...newPost,
        id: docRef.id,
        owner: {
          name: user.name,
          avatar: user.avatar,
          id: user.id,
        },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likeHandle = createAsyncThunk(
  'posts/likeHandle',
  async (postId, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
      } = getState();

      const docRef = await getDoc(doc(db, `posts/${postId}`));
      const { likes } = docRef.data();

      const likeIdx = likes.findIndex((like) => like === user.id);

      if (likeIdx === -1) {
        const updatedLikes = [...likes, user.id];
        await updateUserDocDataInFirestore(
          postId,
          {
            likes: updatedLikes,
          },
          'posts'
        );
        return { postId, likes: updatedLikes, isLiked: true };
      } else {
        const updatedLikes = [...likes];
        updatedLikes.splice(likeIdx, 1);
        await updateUserDocDataInFirestore(
          postId,
          {
            likes: updatedLikes,
          },
          'posts'
        );
        return { postId, likes: updatedLikes, isLiked: false };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId, { rejectWithValue, getState }) => {
    try {
      const docRef = await getDoc(doc(db, `posts/${postId}`));
      const { comments } = docRef.data();

      const ExtendedCommentsData = await Promise.all(
        comments.map(async (comment) => {
          const docRef = await getDoc(doc(db, `users/${comment.owner.id}`));
          const { avatar, name } = docRef.data();
          const updatedComment = {
            ...comment,
            owner: { id: comment.owner.id, avatar, name },
          };
          return updatedComment;
        })
      );

      return { comments: ExtendedCommentsData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'posts/addComment',
  async (newComment, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
      } = getState();

      const { postId } = newComment;

      const docRef = await getDoc(doc(db, `posts/${postId}`));
      const { comments } = docRef.data();

      const updatedComments = [newComment, ...comments];
      await updateUserDocDataInFirestore(
        postId,
        {
          comments: updatedComments,
        },
        'posts'
      );

      const localNewComment = {
        ...newComment,
        owner: {
          ...newComment.owner,
          avatar: user.avatar,
          name: user.name,
        },
      };

      return { postId, newComment: localNewComment, isCommented: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
