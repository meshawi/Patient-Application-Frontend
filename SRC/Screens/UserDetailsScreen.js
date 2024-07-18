// screens/UserDetailsScreen.js
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Text,
  Divider,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
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
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.header, { color: theme.colors.textPrimary }]}>
            User Details
          </Text>
          {userDetails.map((detail, index) => (
            <View key={index}>
              <View
                style={[
                  styles.detailContainer,
                  { backgroundColor: theme.colors.surface },
                ]}
              >
                <Text style={[styles.title, { color: theme.colors.text }]}>
                  {detail.label}:
                </Text>
                <Text style={[styles.value, { color: theme.colors.text }]}>
                  {detail.value}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default UserDetailsScreen;
