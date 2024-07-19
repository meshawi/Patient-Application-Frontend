// components/ReuseableTextInput.js
import React, { useState } from "react";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import { View } from "react-native";
import styles from "../Styles/styles";
import colors from "../Styles/colors";
const ReuseableTextInput = ({
  label,
  placeholder,
  validate,
  errorMessage,
  onValueChange,
  keyboardType = "default", 
  secureTextEntry = false, 
}) => {
  const [value, setValue] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const theme = useTheme(); 

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
        style={[styles.textInput, { backgroundColor: theme.colors.surface }]}
        onChangeText={handleChange}
        outlineColor={colors.primaryBlue}
        activeOutlineColor={colors.federalBlue}
        textColor={colors.black}
        mode="outlined"
        outlineStyle={styles.textInputRadius}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry} 
      />
      {showHelperText && (
        <HelperText
          type="error"
          visible={showHelperText}
          style={{ color: colors.error}}
        >
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

export default ReuseableTextInput;
