// components/ReuseableRadioButton.js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
import styles from '../Styles/styles';

const ReuseableRadioButton = ({ options, label, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const theme = useTheme(); // Access the theme

  const handlePress = (value) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <View style={styles.radioGroupContainer}>
      <Text style={[styles.radioGroupLabel, { color: theme.colors.textPrimary }]}>{label}</Text>
      {options.map((option, index) => (
        <View key={index} style={styles.radioGroup}>
          <RadioButton
            value={option.value}
            status={selectedValue === option.value ? 'checked' : 'unchecked'}
            onPress={() => handlePress(option.value)}
            color={theme.colors.primary}
          />
          <Text style={[styles.radioText, { color: theme.colors.text }]}>{option.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default ReuseableRadioButton;
