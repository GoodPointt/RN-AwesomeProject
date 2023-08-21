import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUpUser(state, action) {
      state.user = { ...state.user, ...action.payload.user };
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    removeUser(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUpUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
