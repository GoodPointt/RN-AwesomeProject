import {
  LOGIN_VALIDATION_SCHEMA_EMAIL,
  LOGIN_VALIDATION_SCHEMA_PASSWORD,
} from '../utils/yupValidation';

import { StyleSheet, Text } from 'react-native';
import { LargeButton } from './LargeButton';
import { FormInput } from './FormInput';
import { useEffect, useState } from 'react';
import { TouchableBlueText } from './TouchableBlueText';

import { auth } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { setUpUser } from '../redux/user/userSlice';
import { useAuth } from '../hooks/useAuth';
import { getCurrentUserData, logIn } from '../firebase/auth';
import { errorFormat } from '../utils/errorFormat';

export const LoginForm = ({ navigation, setIsAuthLoading }) => {
  const [isFocused, setIsFocused] = useState(null);
  const [loginEmailValue, setLoginEmailValue] = useState('');
  const [loginPasswordValue, setLoginPasswordValue] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    isLoggedIn && navigation.navigate('Home');
  }, [isLoggedIn]);

  useEffect(() => {
    const authStateChanged = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthLoading(true);
        try {
          const currentUserData = await getCurrentUserData(user);

          dispatch(
            setUpUser({
              user: currentUserData,
              token: user.accessToken,
            })
          );
        } catch (error) {
          errorFormat(error.message);
        } finally {
          setIsAuthLoading(false);
        }
      } else {
        navigation.navigate('Auth');
      }
    });

    return () => authStateChanged();
  }, []);

  const resetForm = () => {
    setLoginEmailValue('');
    setLoginPasswordValue('');
  };

  const handleLogin = async () => {
    setIsAuthLoading(true);

    try {
      const loginUser = await logIn(loginEmailValue, loginPasswordValue);

      if (!loginUser) return;

      const currentUserData = await getCurrentUserData(loginUser);

      dispatch(
        setUpUser({
          user: currentUserData,
          token: loginUser.user.accessToken,
        })
      );
      resetForm();
    } catch (error) {
      errorFormat(error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const validateField = async (fieldName, value, schema) => {
    try {
      setIsFocused(null);
      await schema.validate(value);

      setValidationErrors({
        ...validationErrors,
        [fieldName]: '',
      });
    } catch (validationError) {
      setValidationErrors({
        ...validationErrors,
        [fieldName]: validationError.errors.find((error) =>
          error.toLowerCase().includes(fieldName)
        ),
      });
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
        handleBlur={() =>
          validateField('email', loginEmailValue, LOGIN_VALIDATION_SCHEMA_EMAIL)
        }
        error={validationErrors.email}
      />
      <FormInput
        placeholder={'Password'}
        name={'password'}
        value={loginPasswordValue}
        inputMode={'text'}
        isFocused={isFocused === 'password'}
        handleChange={(value) => setLoginPasswordValue(value)}
        handleFocus={() => setIsFocused('password')}
        handleBlur={() =>
          validateField(
            'password',
            loginPasswordValue,
            LOGIN_VALIDATION_SCHEMA_PASSWORD
          )
        }
        error={validationErrors.password}
      />
      <LargeButton
        onPress={() => handleLogin()}
        text={'Log in'}
        extraStyles={styles.loginRegisterBtnMargin}
        isDisabled={
          !loginEmailValue ||
          !loginPasswordValue ||
          validationErrors.email !== '' ||
          validationErrors.password !== ''
        }
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
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});
