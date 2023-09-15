import { StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { RegAvatar } from './RegAvatar';
import { LargeButton } from './LargeButton';
import { FormInput } from './FormInput';

import { ModalBox } from './ModalBox';

import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import {
  LOGIN_VALIDATION_SCHEMA_EMAIL,
  LOGIN_VALIDATION_SCHEMA_PASSWORD,
  REGISTER_VALIDATION_SCHEMA_LOGIN,
} from '../utils/yupValidation';
import { errorFormat } from '../utils/errorFormat';
import { DEFAULT_AVATAR, LOADING } from '../utils/vars';
import { signUpNewUser } from '../redux/user/operations';

export const RegForm = () => {
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [regLoginValue, setRegLoginValue] = useState('');
  const [regEmailValue, setRegEmailValue] = useState('');
  const [regPasswordValue, setRegPasswordValue] = useState('');
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
    login: '',
  });

  const { error, status } = useAuth();

  const handleAvatarPress = () => {
    if (avatar === DEFAULT_AVATAR) setModalVisible(true);
    if (avatar !== DEFAULT_AVATAR) {
      setAvatar(DEFAULT_AVATAR);
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

  const handleSubmit = async () => {
    try {
      await dispatch(
        signUpNewUser({
          regLoginValue,
          regEmailValue,
          regPasswordValue,
          avatar,
          setAvatar,
          setProgress,
        })
      );
    } catch (e) {
      console.log(e);
      if (error) errorFormat(error);
    }
  };

  return (
    <>
      <RegAvatar avatar={avatar} handleAvatarPress={handleAvatarPress} />
      <Text style={styles.title}>Registration </Text>

      <ModalBox
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        setAvatar={setAvatar}
        profile={null}
      />

      <FormInput
        placeholder={'Login'}
        name={'login'}
        value={regLoginValue}
        inputMode={'text'}
        isFocused={isFocused === 'login'}
        handleChange={setRegLoginValue}
        handleFocus={() => setIsFocused('login')}
        handleBlur={() =>
          validateField(
            'login',
            regLoginValue,
            REGISTER_VALIDATION_SCHEMA_LOGIN
          )
        }
        error={validationErrors.login}
      />
      <FormInput
        placeholder={'E-mail'}
        name={'email'}
        value={regEmailValue}
        inputMode={'email'}
        isFocused={isFocused === 'email'}
        handleChange={setRegEmailValue}
        handleFocus={() => setIsFocused('email')}
        handleBlur={() =>
          validateField('email', regEmailValue, LOGIN_VALIDATION_SCHEMA_EMAIL)
        }
        error={validationErrors.email}
      />
      <FormInput
        placeholder={'Password'}
        name={'password'}
        value={regPasswordValue}
        inputMode={'text'}
        isFocused={isFocused === 'password'}
        handleChange={setRegPasswordValue}
        handleFocus={() => setIsFocused('password')}
        handleBlur={() =>
          validateField(
            'password',
            regPasswordValue,
            LOGIN_VALIDATION_SCHEMA_PASSWORD
          )
        }
        error={validationErrors.password}
      />
      <LargeButton
        onPress={() => handleSubmit()}
        text={'Register'}
        extraStyles={styles.loginRegisterBtnMargin}
        isDisabled={
          !regLoginValue ||
          !regEmailValue ||
          !regPasswordValue ||
          validationErrors.email !== '' ||
          validationErrors.password !== '' ||
          validationErrors.login !== '' ||
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
    marginTop: 43,
  },
  text: {
    color: '#090400a6',
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto-Medium',
  },
});
