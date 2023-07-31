import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.3,
    marginBottom: 33,
  },
  subText: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },

  loginFormContainer: {
    marginTop: 320,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 220,
  },
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
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },

  relative: { position: "relative" },
  // shadowedLoginInput: {
  //   elevation: 4,
  // },

  noMarginBottom: {
    marginBottom: 0,
  },
  showBtn2: { position: "absolute", left: "88%", top: "55%" },
  noMarginBottom: {
    marginBottom: 0,
  },
  button: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  // buttonTxt: {
  //   textAlign: "center",
  //   color: "white",
  //   fontSize: 16,
  //   fontFamily: "Roboto-Regular",
  // },
});
