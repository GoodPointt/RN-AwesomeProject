import { useState } from 'react';
import { RegAvatar } from './RegAvatar';
import { ModalBox } from './ModalBox';
import { useDispatch } from 'react-redux';
import { DEFAULT_AVATAR } from '../utils/vars';
import { avatarRemove } from '../redux/user/operations';

export const ProfileAvatar = ({ currentAva, userId }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [avatar, setAvatar] = useState(currentAva);
  const dispatch = useDispatch();

  const handleAvatarPress = async () => {
    if (avatar === DEFAULT_AVATAR) setModalVisible(true);
    if (avatar !== DEFAULT_AVATAR) {
      setAvatar(DEFAULT_AVATAR);
      const newAva = DEFAULT_AVATAR;
      await dispatch(avatarRemove({ userId, newAva }));
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
