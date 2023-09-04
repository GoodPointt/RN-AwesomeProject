import { createSlice } from '@reduxjs/toolkit';
import { addPost, fetchPosts } from './operations';

const initialState = {
  posts: [],
  status: '',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updateTotalComments: (state, action) => {
      const { postId } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].totalComments += 1;
        state.posts[postIndex].isCommented = true;
      }
    },
    addLike: (state, action) => {
      const { postId } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        if (state.posts[postIndex].isLiked === false) {
          state.posts[postIndex].likes += 1;
          state.posts[postIndex].isLiked = true;
        } else {
          state.posts[postIndex].likes -= 1;
          state.posts[postIndex].isLiked = false;
        }
      }
    },
    clearPosts: (state, action) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(addPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { updateTotalComments, addLike, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
