import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { LoginForm } from '../components/LoginForm';
import { useNavigation } from '@react-navigation/native';
import { AuthLoader } from '../components/authLoader';
import { useState } from 'react';
import { TouchableBlueText } from '../components/TouchableBlueText';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

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
