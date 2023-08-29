import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';

import { MainNavigation } from './src/routes/MainNavigation';
import { Provider } from 'react-redux';

import store from './src/redux/store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainNavigation />

        <StatusBar style="auto" />
        <Toast />
      </View>
    </Provider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
