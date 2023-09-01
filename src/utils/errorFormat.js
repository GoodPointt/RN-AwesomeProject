import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const errorFormat = (error) => {
  const errArr = error.split('/');
  const errorMsg = errArr[1].split(')')[0];
  Toast.show({
    type: 'error',
    text1: `Login or password wrong`,
    text2: `⚠️Error: ${errorMsg}`,
  });
};
