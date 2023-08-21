import { createSlice } from '@reduxjs/toolkit';
import { addComment, fetchComments } from './operations';

const initialState = {
  comments: [],
  status: '',
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.comments = [action.payload, ...state.comments];
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
