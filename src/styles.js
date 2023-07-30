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
  regFormContainer: {
    marginTop: 220,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 90,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 220,
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
  loginInput: {
    width: "100%",
    padding: 16,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#e8e8e8",
    borderStyle: "solid",
    marginBottom: 16,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: "#FF6C00",
  },
  relative: { position: "relative" },
  // shadowedLoginInput: {
  //   elevation: 4,
  // },
  showBtn: { position: "absolute", left: "88%", top: "77%" },
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
  loginRegisterBtnMargin: {
    marginBottom: 16,
    marginTop: 43,
  },
  buttonTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
