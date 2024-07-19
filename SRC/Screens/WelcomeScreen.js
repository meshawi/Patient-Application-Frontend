import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Text,
  Provider as PaperProvider,
  Card,
  useTheme,
  Button,
  Modal,
  Portal,
  Avatar,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Styles/styles";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ReuseabileTextInput from "../components/ReuseabileTextInput";
import { fetchAppointments } from "../redux/appointmentActions";
import ClosestAppointment from "../components/ClosestAppointment";
import CustomDivider from "../components/CustomDivider";

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );
  const [clinics, setClinics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();

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
              Icon: item.icon, // Updated to use icon from response
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

  useEffect(() => {
    if (authState.id) {
      dispatch(fetchAppointments(authState.id));
    }
  }, [dispatch, authState.id]);

  const handleClinicPress = (clinic) => {
    setSelectedClinic(clinic);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedClinic(null);
  };

  const handleBookAppointment = (clinic) => {
    setModalVisible(false);
    navigation.navigate("Appointments", { clinicId: clinic.ClinicID });
  };

  const getClosestAppointment = (appointments) => {
    const now = new Date();
    return appointments
      .filter((appointment) => new Date(appointment.Date) >= now)
      .sort((a, b) => new Date(a.Date) - new Date(b.Date))[0];
  };

  const closestAppointment = getClosestAppointment(appointments);

  const filteredClinics = clinics.filter((clinic) =>
    clinic.ClinicName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Image
            source={require("../assets/WelcomeImage.png")}
            style={[
              styles.Illustrations,
              { width: 200, height: 200, marginBottom: 0 },
            ]}
          />
          <ReuseabileTextInput
            label="Search Clinic"
            placeholder="Enter clinic name"
            validate={() => true}
            errorMessage=""
            onValueChange={setSearchQuery}
          />
          <View style={[styles.centeredTextContainer, { marginTop: 7 }]}>
            <Text style={styles.heading3}>My Next Appointment</Text>
          </View>
          {loading ? (
            <Text>Loading your next appointment details, please wait...</Text>
          ) : error ? (
            <Text>
              Sorry, there was an error loading your appointment: {error}
            </Text>
          ) : closestAppointment ? (
            <ClosestAppointment
              closestAppointment={closestAppointment}
              authState={authState}
            />
          ) : (
            <Text>
              You have no upcoming appointments. To schedule a new appointment,
              please visit our appointments page or contact your preferred
              clinic.
            </Text>
          )}
          <CustomDivider />
          <Text style={[styles.heading3, { fontWeight: "normal" }]}>
            Clinics:
          </Text>

          <View style={styles.twoRowsContainer}>
            {filteredClinics.map((clinic, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleClinicPress(clinic)}
                style={styles.twoRowsWarpper}
              >
                <Card>
                  <Card.Content
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar.Icon
                      size={48}
                      icon={clinic.Icon} 
                    />
                    <Text
                      style={[
                        styles.heading6,
                        { fontWeight: "normal" , marginTop: 8 },
                      ]}
                    >
                      {clinic.ClinicName}
                    </Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaProvider>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={handleModalClose}
          contentContainerStyle={[
            styles.modualContainer]}
        >
          {selectedClinic && (
            <>
              <Text style={styles.heading5}>
                {selectedClinic.ClinicName} Clinic
              </Text>
              <Text style={[styles.heading6,{fontWeight:"normal"}]}>{selectedClinic.Description}</Text>
              <Text style={[styles.heading6,{fontWeight:"normal"}]}>
                Start Time: {selectedClinic.StartTime}
              </Text>
              <Text style={[styles.heading6,{fontWeight:"normal"}]}>
                End Time: {selectedClinic.EndTime}
              </Text>
              <Button onPress={handleModalClose} style={{ marginTop: 10 }}>
                Close
              </Button>
              <Button
                onPress={() => handleBookAppointment(selectedClinic)}
                style={{ marginTop: 10 }}
              >
                Book Appointment
              </Button>
            </>
          )}
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default WelcomeScreen;
