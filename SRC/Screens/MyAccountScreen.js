// screens/MyAccountScreen.js
import * as React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
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
      ]}
    >
      <View style={styles.centeredTextContainer}>
      <Text style={[styles.heading1]}>
        My Account
      </Text>
      </View>
      <View style={styles.twoRowsContainer}>
        {buttons.map((button, index) => (
          <View style={styles.twoRowsWarpper} key={index}>
            <Button
              mode="contained"
              style={[
                styles.button,
              ]}
              onPress={button.action}
            >
              {button.label}
            </Button>
          </View>
        ))}
      </View>
      <Image
        source={require("../assets/AccountImage.png")}
        style={styles.Illustrations}
      />
    </ScrollView>
  );
};
export default MyAccountScreen;
