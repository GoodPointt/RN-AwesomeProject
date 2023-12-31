import {
  LOGIN_VALIDATION_SCHEMA_EMAIL,
  LOGIN_VALIDATION_SCHEMA_PASSWORD,
} from '../utils/yupValidation';

import { StyleSheet, Text } from 'react-native';
import { LargeButton } from './LargeButton';
import { FormInput } from './FormInput';

import { useDispatch } from 'react-redux';

import { useState } from 'react';
import { useEffect } from 'react';
import { loginUser } from '../redux/user/operations';
import { useAuth } from '../hooks/useAuth';
import { LOADING } from '../utils/vars';

export const LoginForm = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(null);
  const [loginEmailValue, setLoginEmailValue] = useState('');
  const [loginPasswordValue, setLoginPasswordValue] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const { error, status } = useAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetForm();
    });

    return unsubscribe;
  }, [navigation]);

  const dispatch = useDispatch();

  const resetForm = () => {
    setLoginEmailValue('');
    setLoginPasswordValue('');
    setValidationErrors({ email: '', password: '' });
    setIsFocused(null);
  };

  const handleLogin = async () => {
    await dispatch(loginUser({ loginEmailValue, loginPasswordValue }));

    if (error === null) resetForm();
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
          validationErrors.password !== '' ||
          status === LOADING
        }
        isLoading={status === LOADING}
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
