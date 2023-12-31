import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export const LargeButton = ({
  onPress,
  text,
  disabledText = 'Fill in all fields to continue',
  extraStyles,
  isDisabled,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        extraStyles,
        { backgroundColor: isDisabled ? '#F6F6F6' : '#FF6C00' },
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text
        style={[
          styles.buttonTxt,
          { color: isDisabled ? '#BDBDBD' : '#ffffff' },
        ]}
      >
        {isDisabled && !isLoading ? disabledText : isLoading ? null : text}
      </Text>

      {isLoading ? (
        <ActivityIndicator size={33} color={'#FF6C00'} style={styles.loading} />
      ) : null}
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,

    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  buttonTxt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  loading: { position: 'absolute', alignSelf: 'center', top: '50%' },
});
