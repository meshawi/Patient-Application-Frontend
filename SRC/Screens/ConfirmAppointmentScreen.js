import React from "react";
import { View } from "react-native";
import {
  Text,
  Button,
  Dialog,
  Portal,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addAppointment } from "../redux/appointmentActions";
import styles from "../Styles/styles";

const ConfirmAppointmentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { clinicName, clinicId, patientId, dayId, timeId, date, time } =
    route.params;
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");
  const theme = useTheme(); // Access the theme

  const appointmentDetails = [
    { label: "Clinic", value: clinicName },
    { label: "Date", value: date },
    { label: "Time", value: time },
  ];

  const confirmAppointment = () => {
    const requestBody = {
      clinicId,
      patientId,
      dayId,
      timeId,
      date,
      status: "booked",
    };

    axios
      .post("http://192.168.0.169:8080/appointment", requestBody)
      .then((response) => {
        const newAppointment = {
          AppointmentID: response.data.appointmentId,
          ClinicName: clinicName,
          Date: date,
          TimeSlot: time,
          DayOfWeek: response.data.dayOfWeek,
          Status: "booked",
        };
        dispatch(addAppointment(newAppointment));
        setDialogContent("Appointment booked successfully!");
        setDialogVisible(true);
      })
      .catch((error) => {
        console.error(
          "Error booking appointment:",
          error.response?.data || error.message
        );
        setDialogContent("Failed to book appointment.");
        setDialogVisible(true);
      });
  };

  const hideDialog = () => {
    setDialogVisible(false);
    if (dialogContent === "Appointment booked successfully!") {
      navigation.navigate("MyAppointmentsScreen");
    }
  };

  return (
    <PaperProvider>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={[styles.header, { color: theme.colors.textPrimary }]}>
          Confirm Appointment
        </Text>

        {appointmentDetails.map((detail, index) => (
          <View
            key={index}
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
        ))}

        <Button
          mode="contained"
          onPress={confirmAppointment}
          style={[{ backgroundColor: theme.colors.primary, marginBottom: 10 }]}
        >
          Confirm
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={[
            { borderColor: theme.colors.accent, color: theme.colors.primary },
          ]}
        >
          <Text style={{ color: theme.colors.textPrimary }}>Cancel</Text>
        </Button>

        <Portal>
          <Dialog visible={dialogVisible} onDismiss={hideDialog}>
            <Dialog.Title>Appointment Status</Dialog.Title>
            <Dialog.Content>
              <Text>{dialogContent}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default ConfirmAppointmentScreen;
