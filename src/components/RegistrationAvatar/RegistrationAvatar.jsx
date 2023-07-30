import { TouchableOpacity, View, ImageBackground, Image } from "react-native";
import { AddAvatarSvg } from "../Svg/AddAvatarSvg";
import { RemoveAvatarSvg } from "../Svg/RemoveAvatarSvg";
import { useState } from "react";
import { styles } from "../../styles";

export const RegistrationAvatar = () => {
  const [avatar, setAvatar] = useState(null);

  const handlePress = () => {
    if (avatar) {
      setAvatar(null);
    } else {
      setAvatar(
        "https://thumbs.dreamstime.com/b/d-cg-rendering-super-woman-warrior-super-woman-warrior-98757814.jpg"
      );
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.addAvatar}>
      <View style={styles.avatarBox}>
        {avatar && <Image style={styles.avatarImg} source={{ uri: avatar }} />}
        <View style={styles.avatarIconBox}>
          {avatar ? <RemoveAvatarSvg /> : <AddAvatarSvg />}
        </View>
      </View>
    </TouchableOpacity>
  );
};
