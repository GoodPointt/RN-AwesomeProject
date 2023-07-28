// import { ImageBackground, KeyboardAvoidingView } from "react-native";

// import { styles } from "../../App";
// import { RegistrationContainer } from "../components/RegistrationContainer";

// export const RegistrationScreen = () => {
//   return (
//     <ImageBackground
//       style={styles.backgroundImage}
//       source={require("../assets/img/login-bg.jpg")}
//     >
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"} // Choose "padding" for iOS and "height" for Android
//         style={styles.container}
//       >
//         <RegistrationContainer />
//       </KeyboardAvoidingView>
//     </ImageBackground>
//   );
// };

import React from "react";
import { ImageBackground, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "../../App";
import { RegistrationContainer } from "../components/RegistrationContainer";

export const RegistrationScreen = () => {
  const behavior =
    Platform.OS === "ios"
      ? "padding"
      : Platform.OS === "android"
      ? "position"
      : null;

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/img/login-bg.jpg")}
    >
      <KeyboardAvoidingView behavior={behavior} style={styles.container}>
        <RegistrationContainer />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
