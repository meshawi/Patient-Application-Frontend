import React from "react";
import { Image, ScrollView, View } from "react-native";
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
import CustomCard from "../components/CustomCard";

const ConfirmAppointmentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { clinicName, clinicId, patientId, dayId, timeId, date, time } =
    route.params;
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");
  const theme = useTheme();
  const appointmentDetails = [
    { label: "Clinic", value: clinicName },
    { label: "Date", value: date },
    { label: "Time", value: time },
  ];

  const confirmAppointment = async () => {
    console.log("Confirm button clicked");
    const requestBody = {
      clinicId,
      patientId,
      dayId,
      timeId,
      date,
      status: "booked",
    };

    try {
      const response = await axios.post("http://192.168.0.169:8080/appointment", requestBody);
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
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || error.message);
      setDialogContent("Failed to book appointment.");
      setDialogVisible(true);
    }
  };

  const hideDialog = () => {
    setDialogVisible(false);
    if (dialogContent === "Appointment booked successfully!") {
      navigation.navigate("MyAppointmentsScreen");
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={[styles.container]}>
        <View style={styles.centeredTextContainer}>
          <Text style={[styles.heading4, { marginBottom: 0 }]}>
            Confirm Appointment
          </Text>
          <Text
            style={[styles.heading5, { fontWeight: "normal", marginBottom: 0 }]}
          >
            Please review the details below and confirm your appointment
          </Text>
        </View>
        <Image
          source={require("../assets/ConfirmImage.png")}
          style={[styles.Illustrations, { marginBottom: 0 }]}
        />
        {appointmentDetails.map((detail, index) => (
          <CustomCard key={index}>
            <Text style={[styles.heading5]}>{detail.label}:</Text>
            <Text style={[styles.heading6]}>{detail.value}</Text>
          </CustomCard>
        ))}

        <Button
          mode="contained"
          onPress={confirmAppointment}
          style={[styles.button, { marginBottom: 10 }]}
        >
          Confirm
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={[styles.button, { marginBottom: 10 }]}
        >
          Cancel
        </Button>
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text>{dialogContent}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </PaperProvider>
  );
};

export default ConfirmAppointmentScreen;
