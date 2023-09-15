import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCurrentUserData,
  logIn,
  registerUser,
  updateUserDocDataInFirestore,
  writeDataToFirestore,
} from '../../firebase/auth';
import { uploadImage } from '../../utils/uploadImage';
import { DEFAULT_AVATAR } from '../../utils/vars';
import { errorFormat } from '../../utils/errorFormat';

export const signUpNewUser = createAsyncThunk(
  'user/signUpNewUser',
  async (
    {
      regLoginValue,
      regEmailValue,
      regPasswordValue,
      avatar,
      setAvatar,
      setProgress,
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await registerUser(regEmailValue, regPasswordValue);
      if (!result) return;
      let url = '';
      avatar !== DEFAULT_AVATAR
        ? (url = await uploadImage('avatar', avatar, setProgress, setAvatar))
        : (url = DEFAULT_AVATAR);

      const userData = {
        name: regLoginValue,
        email: regEmailValue,
        uid: result.user.uid,
        avatar: url,
      };
      const patchId = await writeDataToFirestore(userData, result.user);

      const newUser = {
        user: {
          ...userData,
          ...patchId,
        },
        token: result.user.stsTokenManager.accessToken,
      };

      return newUser;
    } catch (error) {
      errorFormat(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async ({ user, setIsAuthChecked }, { rejectWithValue }) => {
    try {
      const currentUserData = await getCurrentUserData(user);

      const data = {
        user: currentUserData,
        token: user.accessToken,
      };
      return data;
    } catch (error) {
      errorFormat(error.message);
      return rejectWithValue(error.message);
    } finally {
      setIsAuthChecked(true);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ loginEmailValue, loginPasswordValue }, { rejectWithValue }) => {
    try {
      const loginUser = await logIn(loginEmailValue, loginPasswordValue);

      const currentUserData = await getCurrentUserData(loginUser);

      const data = {
        user: currentUserData,
        token: loginUser.user.accessToken,
      };

      return data;
    } catch (error) {
      errorFormat(error.message, 'Email or password wrong');
      return rejectWithValue(error.message);
    }
  }
);

export const avatarRemove = createAsyncThunk(
  'user/avatarRemove',
  async ({ userId, newAva }, { rejectWithValue }) => {
    try {
      await updateUserDocDataInFirestore(userId, { avatar: newAva }, 'users');
      const data = {
        user: {
          avatar: newAva,
        },
      };
      return data;
    } catch (error) {
      console.log(error);
      errorFormat(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const avatarUpdate = createAsyncThunk(
  'user/avatarUpdate',
  async ({ photo, profile, setProgress, setAvatar }, { rejectWithValue }) => {
    try {
      const url = await uploadImage('avatar', photo, setProgress, setAvatar);

      await updateUserDocDataInFirestore(profile, { avatar: url }, 'users');

      const data = {
        user: {
          avatar: url,
        },
      };
      setAvatar(url);

      return data;
    } catch (error) {
      console.log(error);
      errorFormat(error.message);
      return rejectWithValue(error.message);
    }
  }
);
