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
import { UserContext } from "../hooks/useUsersAuth";
import { useNavigation } from "@react-navigation/native";
import { CameraView } from "./CameraView";

export const CreatePostForm = () => {
  const { users, setUsers, userId } = useContext(UserContext);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const navigation = useNavigation();

  const clearPostForm = () => {
    setLocation("");
    setPhoto("");
    setName("");
    setIsCameraOn(false);
  };

  const handlePublishPost = () => {
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
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-50}
      style={styles.containerAvoid}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={{ flex: 1 }}>
            <View style={styles.photoContainer}>
              <View style={styles.addImgContainer}>
                {photo && !isCameraOn ? (
                  <Image
                    source={{ uri: photo }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  !isCameraOn && (
                    <TouchableOpacity onPress={() => setIsCameraOn(true)}>
                      <View style={styles.iconWrapper}>
                        <Ionicons
                          name="camera-sharp"
                          size={24}
                          color="#BDBDBD"
                        />
                      </View>
                    </TouchableOpacity>
                  )
                )}
                {isCameraOn && !photo && <CameraView setPhoto={setPhoto} />}
              </View>

              <Text style={styles.text}>Upload photo</Text>
            </View>

            <View style={{ flex: 1 }}>
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
                onPress={() => handlePublishPost()}
              />
            </View>
          </View>

          <View style={styles.deleteImgWrapper}>
            <TouchableOpacity onPress={() => clearPostForm()}>
              <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  photoContainer: { flex: 1 },
  addImgContainer: {
    paddingVertical: 90,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  iconWrapper: {
    padding: 30,
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
  containerAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
  },
});
