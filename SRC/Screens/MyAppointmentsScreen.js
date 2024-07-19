import React, { useEffect } from "react";
import { Image, ScrollView, View } from "react-native";
import { Text, PaperProvider, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../redux/appointmentActions";
import styles from "../Styles/styles";
import AppointmentCard from "../components/AppointmentCard";
import CustomDivider from "../components/CustomDivider";
import ClosestAppointment from "../components/ClosestAppointment";

const MyAppointmentsScreen = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const authState = useSelector((state) => state.auth);

  const { appointments, loading, error } = useSelector((state) => state.appointments);
  const theme = useTheme(); // Access the theme

  useEffect(() => {
    if (userId) {
      dispatch(fetchAppointments(userId));
    }
  }, [dispatch, userId]);

  const getClosestAppointment = (appointments) => {
    const now = new Date();
    return appointments
      .filter((appointment) => new Date(appointment.Date) >= now)
      .sort((a, b) => new Date(a.Date) - new Date(b.Date))[0];
  };

  const closestAppointment = getClosestAppointment(appointments);

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.Date) - new Date(a.Date)
  );

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={[styles.container]}>
        <Image
          source={require("../assets/ReminderImage.png")}
          style={[styles.Illustrations, { width: 200, height: 200 }]}
        />
        <View style={styles.centeredTextContainer}>
          <Text style={styles.heading3}>My Next Appointment</Text>
          <View>
            {loading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text>Error: {error}</Text>
            ) : closestAppointment ? (
              <ClosestAppointment closestAppointment={closestAppointment} authState={authState} />
            ) : (
              <Text>No upcoming appointments</Text>
            )}
          </View>
        </View>
        <CustomDivider />
        <Text style={styles.heading4}>All Appointments:</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          sortedAppointments.map((appointment) => (
            <AppointmentCard key={appointment.AppointmentID} appointment={appointment} />
          ))
        )}
      </ScrollView>
    </PaperProvider>
  );
};

export default MyAppointmentsScreen;
