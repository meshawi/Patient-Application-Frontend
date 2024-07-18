// components/UserDetailItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import styles from "../Styles/styles";
const UserDetailItem = ({ label, value }) => {
  const theme = useTheme();

  return (
    <>
      <View
        style={[
          styles.detailContainer,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {label}:
        </Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>
          {value}
        </Text>
      </View>
      <Divider style={{ backgroundColor: theme.colors.placeholder }} />
    </>
  );
};

export default UserDetailItem;
