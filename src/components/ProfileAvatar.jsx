import { useState } from 'react';
import { RegAvatar } from './RegAvatar';
import { ModalBox } from './ModalBox';
import { useDispatch } from 'react-redux';
import { setUpUser } from '../redux/user/userSlice';
import { updateUserDocDataInFirestore } from '../firebase/auth';
import vars from '../utils/vars';
import Toast from 'react-native-toast-message';

export const ProfileAvatar = ({ currentAva, userId }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [avatar, setAvatar] = useState(currentAva);
  const dispatch = useDispatch();

  const handleAvatarPress = () => {
    if (avatar === vars.DEFAULT_AVATAR) setModalVisible(true);
    if (avatar !== vars.DEFAULT_AVATAR) {
      setAvatar(vars.DEFAULT_AVATAR);

      handleAvatarRemove(userId, vars.DEFAULT_AVATAR);
    }
  };

  const handleAvatarRemove = async (userId, newAva) => {
    try {
      dispatch(
        setUpUser({
          user: {
            avatar: newAva,
          },
        })
      );

      await updateUserDocDataInFirestore(userId, { avatar: newAva }, 'users');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `⚠️Error: ${error.message}`,
      });
    }
  };

  return (
    <>
      <RegAvatar avatar={avatar} handleAvatarPress={handleAvatarPress} />
      <ModalBox
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        setAvatar={setAvatar}
        profile={userId}
      />
    </>
  );
};
