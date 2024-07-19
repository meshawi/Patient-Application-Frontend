import React from "react";
import { View } from "react-native";
import { Text, Card, Avatar } from "react-native-paper";
import CustomDivider from "../components/CustomDivider";
import styles from "../Styles/styles";

const ClosestAppointment = ({ closestAppointment, authState }) => {
  return (
    <Card key={closestAppointment.AppointmentID} style={styles.closestAppointmentCard}>
      <Card.Content>
        <View style={styles.closestAppointmentCardRow}>
          <Avatar.Icon size={48} icon={closestAppointment.ClinicIcon} style={styles.icon}/>
          <View style={styles.closestAppointmentCardHeaderInfo}>
            <Text style={[styles.heading4, { marginBottom: 0, fontWeight: "normal" }]}>
              {closestAppointment.ClinicName} Clinic
            </Text>
            <Text style={[styles.heading6, { marginBottom: 0, fontWeight: "normal" }]}>
              Patient name: {authState.firstname} {authState.lastname}
            </Text>
          </View>
        </View>
        <View style={styles.centeredTextContainer}>
          <View style={styles.closestAppointmentInnerCard}>
            <View style={styles.closestAppointmentCardRow}>
              <Avatar.Icon size={24} icon="calendar-clock" style={[styles.icon]} />
              <Text style={[styles.heading6, { marginBottom: 0, fontWeight: "normal" }]}>
                {closestAppointment.DayOfWeek}{" "}
                {new Date(closestAppointment.Date).toLocaleDateString()}
              </Text>
              <Text style={[styles.heading6, { marginBottom: 0, marginLeft: 3, fontWeight: "normal" }]}>
                , {closestAppointment.TimeSlot}
              </Text>
            </View>
          </View>
        </View>
        <CustomDivider />
        <View style={styles.closestAppointmentNoteContainer}>
          <Text style={styles.closestAppointmentNoteText}>
            Your upcoming appointment is scheduled at the {closestAppointment.ClinicName} Clinic.
            Please make sure to arrive 15 minutes early for any necessary paperwork.
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ClosestAppointment;
