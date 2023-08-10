import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PostInput } from "./PostInput";
import { LargeButton } from "./LargeButton";
import { useContext, useState } from "react";
import { ModalBox } from "./ModalBox";
import { UserContext } from "../hooks/useUsersAuth";
import { useNavigation } from "@react-navigation/native";

export const CreatePostForm = () => {
  const { users, setUsers, userId } = useContext(UserContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const navigation = useNavigation();

  const clearPostForm = () => {
    setLocation("");
    setPhoto("");
    setName("");
  };

  const handePublishPost = () => {
    const newPost = {
      id: Date.now(),
      photo,
      name,
      location,
      likes: 0,
      comments: [],
    };

    const userToUpdate = users.find((user) => user.id === userId);

    if (userToUpdate) {
      const updatedUser = {
        ...userToUpdate,
        posts: [newPost, ...userToUpdate.posts],
      };

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
    }

    clearPostForm();
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, gap: 10 }}>
      <View>
        <View style={styles.addImgContainer}>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.iconWrapper}>
                <Ionicons name="camera-sharp" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.text}>Upload photo</Text>
        <View style={styles.inputsWrapper}>
          <PostInput
            placeholder={"Name..."}
            name={"name"}
            value={name}
            inputMode={"text"}
            handleChange={setName}
          />
          <PostInput
            placeholder={"Location..."}
            name={"location"}
            value={location}
            inputMode={"text"}
            handleChange={setLocation}
          />
        </View>
        <LargeButton
          isDisabled={!photo || !location || !name}
          text={"Publish post"}
          extraStyles={{ backgroundColor: "#F6F6F6" }}
          onPress={() => handePublishPost()}
        />
      </View>
      <View style={styles.deleteImgWrapper}>
        <TouchableOpacity onPress={() => clearPostForm()}>
          <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <ModalBox
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        placeholder={"Photo URL"}
        value={photo}
        handleChange={setPhoto}
        text={"Enter URL for your photo"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addImgContainer: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  iconWrapper: {
    height: 60,
    width: 60,
    backgroundColor: "#ffffff",
    borderRadius: 50,

    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  inputsWrapper: {
    marginVertical: 32,
    gap: 16,
  },
  deleteImgWrapper: {
    alignSelf: "center",
  },
});
