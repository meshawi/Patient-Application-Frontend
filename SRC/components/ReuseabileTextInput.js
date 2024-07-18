// components/ReuseableTextInput.js
import React, { useState } from 'react';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import styles from '../Styles/styles';

const ReuseableTextInput = ({ label, placeholder, validate, errorMessage, onValueChange }) => {
  const [value, setValue] = useState('');
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const theme = useTheme(); // Access the theme

  const handleChange = (text) => {
    setValue(text);
    setHasStartedTyping(true);
    onValueChange(text);
  };

  const isValid = validate(value);
  const showHelperText = hasStartedTyping && !isValid;

  return (
    <View>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        style={[{ backgroundColor: theme.colors.surface }]}
        onChangeText={handleChange}
      />
      {showHelperText && (
        <HelperText type="error" visible={showHelperText} style={{ color: theme.colors.error }}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

export default ReuseableTextInput;
