import { StyleSheet, Text } from 'react-native';
import { LargeButton } from './LargeButton';
import { FormInput } from './FormInput';
import { useEffect, useState } from 'react';
import { TouchableBlueText } from './TouchableBlueText';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { setUpUser } from '../redux/user/userSlice';
import { useAuth } from '../hooks/useAuth';
import { collection, getDocs } from 'firebase/firestore';
import { logIn } from '../firebase/auth';

export const LoginForm = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(null);
  const [loginEmailValue, setLoginEmailValue] = useState('');
  const [loginPasswordValue, setLoginPasswordValue] = useState('');

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    isLoggedIn && navigation.navigate('Home');
  }, [isLoggedIn]);

  const resetForm = () => {
    setLoginEmailValue('');
    setLoginPasswordValue('');
  };

  const handleLogin = async () => {
    try {
      const loginUser = await logIn(loginEmailValue, loginPasswordValue);

      if (!loginUser) return;

      const usersCollectionRef = collection(db, 'users');
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      const currentUserData = filteredData.find(
        (data) => auth?.currentUser?.uid === data.uid
      );

      dispatch(
        setUpUser({
          user: currentUserData,
          token: loginUser.user.accessToken,
        })
      );
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Text style={styles.title}>Log in</Text>
      <FormInput
        placeholder={'E-mail'}
        name={'email'}
        value={loginEmailValue}
        inputMode={'email'}
        isFocused={isFocused === 'email'}
        handleChange={(value) => setLoginEmailValue(value)}
        handleFocus={() => setIsFocused('email')}
        handleBlur={() => setIsFocused(null)}
      />
      <FormInput
        placeholder={'Password'}
        name={'password'}
        value={loginPasswordValue}
        inputMode={'text'}
        isFocused={isFocused === 'password'}
        handleChange={(value) => setLoginPasswordValue(value)}
        handleFocus={() => setIsFocused('password')}
        handleBlur={() => setIsFocused(null)}
      />

      <LargeButton
        onPress={() => handleLogin()}
        text={'Log in'}
        extraStyles={styles.loginRegisterBtnMargin}
        isDisabled={!loginEmailValue && !loginPasswordValue}
      />

      <TouchableBlueText
        text={'Do not have account? Register...'}
        onPress={() => {
          navigation.navigate('Auth', { screen: 'Registration' });
          resetForm();
        }}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: '#212121',
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.3,
    marginBottom: 33,
  },
  loginRegisterBtnMargin: {
    marginBottom: 16,
    marginTop: 30,
  },
});
