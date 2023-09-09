import { createSlice } from '@reduxjs/toolkit';
import {
  addComment,
  addPost,
  fetchAllPosts,
  fetchComments,
  fetchUserPosts,
  likeHandle,
} from './operations';

const initialState = {
  allPosts: [],
  userPosts: [],
  comments: [],
  status: '',
  error: null,
  likeStatus: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state, action) => {
      state.allPosts = [];
      state.userPosts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.allPosts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })

      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
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
        state.allPosts = [action.payload, ...state.allPosts];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })

      .addCase(likeHandle.pending, (state) => {
        state.likeStatus = 'loading';
        state.error = null;
      })
      .addCase(likeHandle.fulfilled, (state, action) => {
        state.likeStatus = 'resolved';
        state.error = null;

        state.allPosts = state.allPosts.map((post) => {
          if (post.id === action.payload.postId)
            return {
              ...post,
              likes: action.payload.likes,
              isLiked: action.payload.isLiked,
            };
          return post;
        });

        state.userPosts = state.userPosts.map((post) => {
          if (post.id === action.payload.postId)
            return {
              ...post,
              likes: action.payload.likes,
              isLiked: action.payload.isLiked,
            };
          return post;
        });
      })
      .addCase(likeHandle.rejected, (state, action) => {
        state.likeStatus = 'rejected';
        state.error = action.payload;
      })

      .addCase(addComment.rejected, (state, action) => {
        state.likeStatus = 'rejected';
        state.error = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.likeStatus = 'loading';
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.likeStatus = 'resolved';
        state.error = null;
        state.comments = [action.payload.newComment, ...state.comments];
        state.allPosts = state.allPosts.map((post) => {
          if (post.id === action.payload.postId)
            return {
              ...post,
              comments: state.comments,
              isCommented: action.payload.isCommented,
            };
          return post;
        });
      })

      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.comments = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
