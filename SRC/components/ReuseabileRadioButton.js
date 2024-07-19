// components/ReuseableRadioButton.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
import styles from '../Styles/styles';

const ReuseableRadioButton = ({ options, label, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const theme = useTheme(); 

  const handlePress = (value) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <View style={styles.radioGroupContainer}>
      {/* <Text style={[styles.radioGroupLabel]}>{label}</Text> */}
      <View style={styles.radioGroupRow}>
        {options.map((option, index) => (
          <View key={index} style={styles.radioItem}>
            <RadioButton
              value={option.value}
              status={selectedValue === option.value ? 'checked' : 'unchecked'}
              onPress={() => handlePress(option.value)}
              color={theme.colors.primary}
            />
            <Text style={[styles.radioText]}>{option.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};


export default ReuseableRadioButton;
