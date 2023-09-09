import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { LoginForm } from '../components/LoginForm';
import { useNavigation } from '@react-navigation/native';
import { AuthLoader } from '../components/authLoader';
import { useState } from 'react';
import { TouchableBlueText } from '../components/TouchableBlueText';

// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithRedirect,
// } from 'firebase/auth';
// import { app, auth } from '../firebase/config';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // const signUpUsingGoogle = async () => {
  //   const provider = new GoogleAuthProvider();
  //   provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const user = result.user;
  //       console.log(user);
  //     })
  //     .catch((error) => console.log(error.message));
  // };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-165}
          style={styles.container}
        >
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../assets/img/login-bg.jpg')}
          >
            <View style={styles.loginFormContainer}>
              <LoginForm
                setIsAuthLoading={setIsAuthLoading}
                navigation={navigation}
              />
              <TouchableBlueText
                text={'Do not have account? Register...'}
                onPress={() => {
                  navigation.navigate('Auth', { screen: 'Registration' });
                }}
              />
              {/* <TouchableOpacity onPress={signUpUsingGoogle}>
                <Text>Login with GOOGLE</Text>
              </TouchableOpacity> */}
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {isAuthLoading ? <AuthLoader type={'login'} /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    resizeMode: 'cover',
  },
  loginFormContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
    paddingBottom: 45,
    paddingHorizontal: 16,
  },
});
