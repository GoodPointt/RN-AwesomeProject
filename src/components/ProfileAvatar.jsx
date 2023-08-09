import { useState } from "react";
import { RegAvatar } from "./RegAvatar";
import { ModalBox } from "./ModalBox";

export const ProfileAvatar = ({ currentAva, handleAvatarChange, userId }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [avatar, setAvatar] = useState(currentAva);

  const handleAvatarPress = () => {
    if (!avatar) setModalVisible(true);
    if (avatar) setAvatar(null);
  };

  return (
    <>
      <RegAvatar avatar={avatar} handleAvatarPress={handleAvatarPress} />
      <ModalBox
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        placeholder={"Avatar URL"}
        value={avatar}
        handleChange={setAvatar}
        text={"Enter URL for your avatar"}
        onPress={() => handleAvatarChange(userId, avatar)}
      />
    </>
  );
};
