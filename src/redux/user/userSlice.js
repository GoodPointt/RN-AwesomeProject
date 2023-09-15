import { createSlice } from '@reduxjs/toolkit';
import {
  avatarRemove,
  avatarUpdate,
  getCurrentUser,
  loginUser,
  signUpNewUser,
} from './operations';
import { RESOLVED, REJECTED, LOADING } from '../../utils/vars';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  status: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpNewUser.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(signUpNewUser.fulfilled, (state, action) => {
        state.status = RESOLVED;
        state.user = { ...state.user, ...action.payload.user };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signUpNewUser.rejected, (state, action) => {
        state.status = REJECTED;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = RESOLVED;
        state.user = { ...state.user, ...action.payload.user };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = REJECTED;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = RESOLVED;
        state.user = { ...state.user, ...action.payload.user };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = REJECTED;
        state.error = action.payload;
      })
      .addCase(avatarRemove.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(avatarRemove.fulfilled, (state, action) => {
        state.status = RESOLVED;
        state.user = { ...state.user, ...action.payload.user };
      })
      .addCase(avatarRemove.rejected, (state, action) => {
        state.status = REJECTED;
        state.error = action.payload;
      })
      .addCase(avatarUpdate.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(avatarUpdate.fulfilled, (state, action) => {
        state.status = RESOLVED;
        state.user = { ...state.user, ...action.payload.user };
      })
      .addCase(avatarUpdate.rejected, (state, action) => {
        state.status = REJECTED;
        state.error = action.payload;
      });
  },
});

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
