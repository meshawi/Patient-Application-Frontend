import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import styles from '../Styles/styles';
const CustomDivider = () => {
  return (
    <View style={styles.customDividerContainer}>
      <Divider style={styles.customDivider} />
    </View>
  );
};


export default CustomDivider;
