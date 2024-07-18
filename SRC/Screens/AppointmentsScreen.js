import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Text,
  Button,
  Provider as PaperProvider,
  useTheme,
  Divider,
} from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import CalendarPicker from "react-native-calendar-picker";
import dayjs from "dayjs";
import styles from "../Styles/styles";
import { useNavigation } from "@react-navigation/native";

const AppointmentsScreen = () => {
  const route = useRoute();
  const { clinicId } = route.params;
  const [state, setState] = useState({
    clinicDetails: [],
    selectedDate: null,
    availableTimes: [],
    selectedTime: "",
  });

  const patientId = useSelector((state) => state.auth.id);
  const navigation = useNavigation();
  const theme = useTheme(); // Access the theme

  useEffect(() => {
    axios
      .get(`http://192.168.0.169:8080/clinic_detials/${clinicId}`)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          clinicDetails: response.data,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [clinicId]);

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date);
    const selectedDay = formattedDate.format("dddd");
    const timesForDay = state.clinicDetails.filter(
      (detail) => detail.DayOfWeek === selectedDay
    );
    const formattedDateString = formattedDate.format("YYYY-MM-DD");

    axios
      .post(`http://192.168.0.169:8080/clinic_appointments/${clinicId}`, {
        date: formattedDateString,
      })
      .then((response) => {
        const bookedTimes = response.data.map((app) => app.TimeID);
        const availableTimes = timesForDay.filter(
          (time) => !bookedTimes.includes(time.TimeID)
        );
        setState((prevState) => ({
          ...prevState,
          selectedDate: formattedDate,
          availableTimes,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const bookAppointment = () => {
    const { clinicDetails, selectedTime, selectedDate, availableTimes } = state;
    navigation.navigate("ConfirmAppointment", {
      clinicName: clinicDetails[0].ClinicName,
      clinicId,
      patientId,
      dayId: availableTimes.find((time) => time.TimeSlot === selectedTime)
        .DayID,
      timeId: availableTimes.find((time) => time.TimeSlot === selectedTime)
        .TimeID,
      date: selectedDate.format("YYYY-MM-DD"),
      time: selectedTime,
    });
  };

  const { clinicDetails, selectedDate, availableTimes, selectedTime } = state;

  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.header, { color: theme.colors.textPrimary }]}>
          Select a Date
        </Text>
        <CalendarPicker
          onDateChange={handleDateChange}
          minDate={new Date()}
          weekdays={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          months={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          disabledDates={(date) => {
            const dayOfWeek = dayjs(date).format("dddd");
            return !clinicDetails.some(
              (detail) => detail.DayOfWeek === dayOfWeek
            );
          }}
        />
        <Divider
          style={[
            styles.divider,
            { backgroundColor: theme.colors.textPrimary },
          ]}
        />
        {availableTimes.length > 0 && (
          <View>
            <Text style={[styles.title, { color: theme.colors.textSecondary }]}>
              Available Times
            </Text>
            <View style={styles.cardsContainer}>
              {availableTimes.map((time, index) => (
                <View style={styles.cardsWrapper} key={time.TimeID}>
                  <Button
                    mode="outlined"
                    onPress={() =>
                      setState((prevState) => ({
                        ...prevState,
                        selectedTime: time.TimeSlot,
                      }))
                    }
                    style={{ borderColor: theme.colors.primary }}
                  >
                    <Text style={{ color: theme.colors.textPrimary }}>
                      {time.TimeSlot}
                    </Text>
                  </Button>
                </View>
              ))}
            </View>
          </View>
        )}
        <Divider
          style={[
            styles.divider,
            { backgroundColor: theme.colors.textPrimary },
          ]}
        />
        {selectedDate && selectedTime && (
          <View>
            <Button
              mode="outlined"
              style={{
                borderColor: theme.colors.accent,
                backgroundColor: theme.colors.background,
                marginBottom: 10,
              }}
            >
              <Text style={[{ color: theme.colors.textPrimary }]}>
                Selected: {selectedDate.format("YYYY-MM-DD")} at {selectedTime}
              </Text>
            </Button>
            <Button
              mode="contained"
              onPress={bookAppointment}
              style={[{ backgroundColor: theme.colors.primary }]}
            >
              Book Appointment
            </Button>
          </View>
        )}
      </ScrollView>
    </PaperProvider>
  );
};

export default AppointmentsScreen;
