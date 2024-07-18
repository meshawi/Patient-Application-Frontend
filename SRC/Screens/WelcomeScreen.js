import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Text,
  Divider,
  Provider as PaperProvider,
  Card,
  useTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import styles from "../Styles/styles";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const authState = useSelector((state) => state.auth);
  const [clinics, setClinics] = useState([]);
  const navigation = useNavigation();
  const theme = useTheme(); // Access the theme

  useEffect(() => {
    axios
      .get("http://192.168.0.169:8080/clinics")
      .then((response) => {
        const uniqueClinics = [];
        const clinicMap = new Map();

        response.data.forEach((item) => {
          if (!clinicMap.has(item.ClinicID)) {
            clinicMap.set(item.ClinicID, {
              ClinicName: item.ClinicName,
              Description: item.Description,
              StartTime: item.StartTime,
              EndTime: item.EndTime,
            });
            uniqueClinics.push({
              ClinicID: item.ClinicID,
              ...clinicMap.get(item.ClinicID),
            });
          }
        });

        setClinics(uniqueClinics);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClinicPress = (clinic) => {
    console.log("Clinic pressed: ", clinic);
    navigation.navigate("Appointments", { clinicId: clinic.ClinicID });
  };

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.header, { color: theme.colors.textPrimary ,marginTop: 50,
          }]}>
            Welcome {authState.firstname} {authState.lastname}!
          </Text>
          <Divider
            style={[
              styles.divider,
              { backgroundColor: theme.colors.placeholder },
            ]}
          />
          {clinics.map((clinic, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleClinicPress(clinic)}
            >
              <Card
                style={[styles.card, { backgroundColor: theme.colors.surface }]}
              >
                <Card.Content>
                  <Text
                    style={[styles.clinicName, { color: theme.colors.primary }]}
                  >
                    {clinic.ClinicName}
                  </Text>
                  <Text
                    style={[styles.description, { color: theme.colors.text }]}
                  >
                    {clinic.Description}
                  </Text>
                  <Text
                    style={[styles.times, { color: theme.colors.placeholder }]}
                  >
                    {clinic.StartTime} - {clinic.EndTime}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default WelcomeScreen;
