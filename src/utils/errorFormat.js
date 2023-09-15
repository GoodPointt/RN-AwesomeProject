import Toast from 'react-native-toast-message';

export const errorFormat = (error, msg = 'Opps! error occured😒') => {
  const errArr = error.split('/');
  const errorMsg = errArr[1].split(')')[0];
  return Toast.show({
    type: 'error',
    text1: msg,
    text2: `⚠️ ${errorMsg}`,
  });
};
