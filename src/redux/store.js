import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import postsSlice from './posts/postsSlice';
import commentsSlice from './comments/commentsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsSlice,
    comments: commentsSlice,
  },
});

export default store;
