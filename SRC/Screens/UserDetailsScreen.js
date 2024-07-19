// screens/UserDetailsScreen.js
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Text, Provider as PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CustomCard from "../components/CustomCard";
import styles from "../Styles/styles";

const UserDetailsScreen = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.auth);

  const userDetails = [
    { label: "First Name", value: user.firstname },
    { label: "Last Name", value: user.lastname },
    { label: "Email", value: user.email },
    { label: "User ID", value: user.id },
    { label: "token", value: user.token },
  ];

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <ScrollView
          contentContainerStyle={[
            styles.container,
          ]}
        >
          <View style={styles.centeredTextContainer}>
          <Text style={[styles.heading1, ]}>
            User Details
          </Text>
          </View>
          <Image
            source={require("../assets/UserDetialsImage.png")}
            style={[styles.Illustrations, { width: 200, height: 200 }]}
          />
          {userDetails.map((detail, index) => (
            <CustomCard key={index} label={detail.label} value={detail.value} />
          ))}
        </ScrollView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default UserDetailsScreen;
