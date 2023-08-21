import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/user/userSlice';
import { logout } from '../firebase/auth';

export const CustomHeader = ({ title, navigation, isShown }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        {isShown === 'left' && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#212121ba" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        {isShown === 'right' && (
          <TouchableOpacity
            onPress={() => {
              dispatch(removeUser());
              logout();
              navigation.navigate('Auth', { screen: 'Login' });
            }}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: Platform.OS === 'ios' ? 90 : 70,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#00000028',
    elevation: 5,
  },
  headerLeft: {
    flex: 1,
    paddingLeft: 16,
    paddingBottom: 8,
  },
  headerCenter: {
    flex: 1,
    paddingBottom: 8,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
