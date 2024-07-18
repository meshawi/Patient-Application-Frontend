// screens/MyAccountScreen.js
import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authActions";
import styles from "../Styles/styles";

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(logout());
  };

  const buttons = [
    {
      label: "View User Details",
      action: () => navigation.navigate("UserDetails"),
    },
    {
      label: "Reset Password",
      action: () => navigation.navigate("ForgetPassword"),
    },
    {
      label: "Delete Account",
      action: () => navigation.navigate("DeleteUser"),
    },
    { label: "Logout", action: handleLogout },
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text style={[styles.header, { color: theme.colors.textPrimary }]}>
        My Account
      </Text>
      <View style={styles.cardsContainer}>
        {buttons.map((button, index) => (
          <View style={styles.inputWrapper} key={index}>
            <Button
              mode="contained"
              style={[
                styles.button,
                { backgroundColor: theme.colors.onSurface },
              ]}
              onPress={button.action}
            >
              {button.label}
            </Button>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default MyAccountScreen;
