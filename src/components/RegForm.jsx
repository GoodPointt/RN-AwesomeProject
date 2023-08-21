import { StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { RegAvatar } from './RegAvatar';
import { LargeButton } from './LargeButton';
import { FormInput } from './FormInput';

import { ModalBox } from './ModalBox';

import { useDispatch } from 'react-redux';
import { setUpUser, udateUserAva } from '../redux/user/userSlice';
import { useAuth } from '../hooks/useAuth';
import { registerUser, writeDataToFirestore } from '../firebase/auth';

export const RegForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [regLoginValue, setRegLoginValue] = useState('');
  const [regEmailValue, setRegEmailValue] = useState('');
  const [regPasswordValue, setRegPasswordValue] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    isLoggedIn && navigation.navigate('Home');
  }, [isLoggedIn]);

  const handleAvatarPress = () => {
    if (!avatar) setModalVisible(true);
    if (avatar) {
      setAvatar(null);
    }
  };

  const handleSubmit = async () => {
    try {
      const { user } = await registerUser(regEmailValue, regPasswordValue);

      const userData = {
        name: regLoginValue,
        email: regEmailValue,
        uid: user.uid,
        avatar,
      };

      const patchId = await writeDataToFirestore(userData, user);

      dispatch(
        setUpUser({
          user: {
            ...userData,
            ...patchId,
          },
          token: user.stsTokenManager.accessToken,
        })
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <RegAvatar avatar={avatar} handleAvatarPress={handleAvatarPress} />
      <Text style={styles.title}>Registration</Text>
      <ModalBox
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        placeholder={'Avatar URL'}
        value={avatar}
        handleChange={setAvatar}
        text={'Enter URL for your avatar'}
      />

      <FormInput
        placeholder={'Login'}
        name={'login'}
        value={regLoginValue}
        inputMode={'text'}
        isFocused={isFocused === 'login'}
        handleChange={setRegLoginValue}
        handleFocus={() => setIsFocused('login')}
        handleBlur={() => setIsFocused(null)}
      />
      <FormInput
        placeholder={'E-mail'}
        name={'email'}
        value={regEmailValue}
        inputMode={'email'}
        isFocused={isFocused === 'email'}
        handleChange={setRegEmailValue}
        handleFocus={() => setIsFocused('email')}
        handleBlur={() => setIsFocused(null)}
      />
      <FormInput
        placeholder={'Password'}
        name={'password'}
        value={regPasswordValue}
        inputMode={'text'}
        isFocused={isFocused === 'password'}
        handleChange={setRegPasswordValue}
        handleFocus={() => setIsFocused('password')}
        handleBlur={() => setIsFocused(null)}
      />
      <LargeButton
        onPress={() => handleSubmit()}
        text={'Register'}
        extraStyles={styles.loginRegisterBtnMargin}
        isDisabled={!regLoginValue && !regEmailValue && !regPasswordValue}
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
