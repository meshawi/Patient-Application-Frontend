import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import styles from '../Styles/styles';

const CustomCard = ({ label, value, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.content}>
            {label && (
              <Text style={styles.label}>
                {label}:
              </Text>
            )}
            {value && (
              <Text style={styles.value}>
                {value}
              </Text>
            )}
            {children}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomCard;
