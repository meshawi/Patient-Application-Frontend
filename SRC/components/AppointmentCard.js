import React from 'react';
import { View, Text } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import styles from '../Styles/styles';

const AppointmentCard = ({ appointment }) => {
  return (
    <Card key={appointment.AppointmentID} style={styles.apmntCardContainer}>
      <Card.Content>
        <Text style={styles.absulotAppmntWord}>
          Appointment
        </Text>
        <View style={styles.centeredTextContainer}>
        <Text style={[styles.heading4,{marginTop: 10}]}>
          {appointment.ClinicName}
        </Text>
        <Text style={styles.heading5}>
          {appointment.DayOfWeek}, {new Date(appointment.Date).toLocaleDateString()}
        </Text>
        </View>
      </Card.Content>

      <Card.Actions style={styles.apmntCardFooterContainer}>
        <View style={styles.apmntTimeAvatarContainer}>
          <Avatar.Icon
            size={24}
            icon="watch"
            style={styles.icon}
          />
          <Text>{appointment.TimeSlot}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.buttonLikeStyle}>{appointment.Status}</Text>
        </View>
      </Card.Actions>
    </Card>
  );
};

export default AppointmentCard;
