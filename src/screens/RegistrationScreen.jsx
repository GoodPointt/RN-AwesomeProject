import React, { useState } from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RegForm } from '../components/RegForm';
import { TouchableBlueText } from '../components/TouchableBlueText';
import { useNavigation } from '@react-navigation/native';

export const RegistrationScreen = () => {
  const navigation = useNavigation();

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
            <View style={styles.regContainer}>
              <RegForm navigation={navigation} />

              <TouchableBlueText
                text={'Already have an account? Login'}
                onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
              />
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
  regContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 90,
    paddingBottom: 45,
    paddingHorizontal: 16,
  },
});
