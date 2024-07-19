import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReuseableRadioButton from './ReuseabileRadioButton';
import colors from '../Styles/colors';
const CardWithLabel = ({ label, options, onValueChange }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <ReuseableRadioButton options={options} onValueChange={onValueChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.white,
    elevation: 8,
    marginBottom: 20,
    alignItems: 'center',
    width: '48%',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardWithLabel;
