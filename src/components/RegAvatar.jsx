import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

export const RegAvatar = ({ avatar, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.addAvatar}>
      <View style={styles.avatarBox}>
        {avatar && <Image style={styles.avatarImg} source={{ uri: avatar }} />}
        <View style={styles.avatarIconBox}>
          {avatar ? (
            <SimpleLineIcons name="close" size={24} color="#bababa" />
          ) : (
            <AntDesign name="pluscircleo" size={24} color="#ff6a00a6" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  avatarBox: {
    display: "block",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatarImg: { width: 120, height: 120, borderRadius: 16 },
  avatarIconBox: {
    width: 25,
    height: 25,
    position: "absolute",
    transform: [{ translateX: 100 }, { translateY: 75 }],
  },
  addAvatar: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
  },
});
