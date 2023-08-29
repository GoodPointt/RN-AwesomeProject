import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableBlueText } from './TouchableBlueText';
import { Ionicons } from '@expo/vector-icons';

export const FormInput = ({
  placeholder,
  name,
  value,
  inputMode,
  isFocused,
  handleChange,
  handleFocus,
  handleBlur,
  error,
}) => {
  const [isTouchable, setIsTouchable] = useState(true);

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        inputMode={inputMode}
        style={[
          styles.formInput,
          isFocused ? styles.focusedInput : null,
          error ? styles.errorInput : null,
        ]}
        placeholder={placeholder}
        name={name}
        value={value}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={name === 'password' && isTouchable}
      />
      {name === 'password' && value && (
        <TouchableBlueText
          style={styles.showBtn}
          onPress={() => setIsTouchable(!isTouchable)}
          text={
            isTouchable ? (
              <Ionicons name="ios-eye-outline" size={24} color="#000" />
            ) : (
              <Ionicons name="ios-eye-off-outline" size={24} color="#000" />
            )
          }
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#e8e8e8',
    borderStyle: 'solid',
    marginBottom: 16,
  },
  focusedInput: {
    borderColor: '#FF6C00',
    backgroundColor: '#fff',
  },
  showBtn: { position: 'absolute', top: 17, right: 16 },
  errorInput: {
    borderColor: '#ff0000',
    backgroundColor: '#a0000018',
  },
  errorText: {
    color: 'red',
    position: 'absolute',
    left: 5,
    bottom: 0,
    fontStyle: 'italic',
    fontSize: 12,
  },
});
