// screens/MyAppointmentsScreen.js
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import {
  Text,
  Card,
  Divider,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../redux/appointmentActions";
import styles from "../Styles/styles";

const MyAppointmentsScreen = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );
  const theme = useTheme(); // Access the theme

  useEffect(() => {
    if (userId) {
      dispatch(fetchAppointments(userId));
    }
  }, [dispatch, userId]);

  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.header, { color: theme.colors.textPrimary }]}>
          My Appointments
        </Text>
        <View style={styles.cardsContainer}>
          {loading ? (
            <Text style={{ color: theme.colors.text }}>Loading...</Text>
          ) : error ? (
            <Text style={{ color: theme.colors.error }}>Error: {error}</Text>
          ) : (
            appointments.map((appointment) => (
              <Card
                key={appointment.AppointmentID}
                style={[
                  styles.cardsWrapper,
                  { backgroundColor: theme.colors.surface },
                ]}
              >
                <Card.Content>
                  <Text style={[styles.title, { color: theme.colors.primary }]}>
                    {appointment.ClinicName}
                  </Text>
                  <Divider
                    style={{ backgroundColor: theme.colors.placeholder }}
                  />
                  <Text style={{ color: theme.colors.text }}>
                    Date: {new Date(appointment.Date).toLocaleDateString()}
                  </Text>
                  <Text style={{ color: theme.colors.text }}>
                    Time: {appointment.TimeSlot}
                  </Text>
                  <Text style={{ color: theme.colors.text }}>
                    Day: {appointment.DayOfWeek}
                  </Text>
                  <Text style={{ color: theme.colors.text }}>
                    Status: {appointment.Status}
                  </Text>
                </Card.Content>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default MyAppointmentsScreen;
