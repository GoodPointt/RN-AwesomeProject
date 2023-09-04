import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TabNavigation } from './TabNavigation';
import { AuthStackNavigator } from './AuthNavigation';
import { CommentsScreen } from '../screens/CommentsScreen';
import { CustomHeader } from '../components/CustomHeader';
import { MapScreen } from '../screens/MapScreen';
import { useEffect } from 'react';
import { auth } from '../firebase/config';
import { getCurrentUserData } from '../firebase/auth';
import { useDispatch } from 'react-redux';
import { errorFormat } from '../utils/errorFormat';
import { setUpUser } from '../redux/user/userSlice';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { AuthLoader } from '../components/authLoader';

export const MainNavigation = () => {
  const MainStack = createStackNavigator();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const authStateChanged = auth.onAuthStateChanged(async (user) => {
      if (user) {
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
          setIsAuthChecked(true);
        }
      }
    });

    return () => authStateChanged();
  }, []);

  return isAuthChecked ? (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Auth'}>
        <MainStack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{ headerMode: 'none' }}
        />
        <MainStack.Screen
          name="Home"
          component={TabNavigation}
          options={{ headerMode: 'none' }}
        />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={({ navigation }) => ({
            header: () => (
              <CustomHeader
                title={'Comments'}
                navigation={navigation}
                isShown={'left'}
              />
            ),
          })}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={({ navigation }) => ({
            header: () => (
              <CustomHeader
                title={'Location'}
                navigation={navigation}
                isShown={'left'}
              />
            ),
          })}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  ) : (
    <AuthLoader />
  );
};
