import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import postsSlice from './posts/postsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsSlice,
  },
});

export default store;
