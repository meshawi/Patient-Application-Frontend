// actions/appointmentActions.js
import axios from 'axios';
import { Alert } from 'react-native';

export const FETCH_APPOINTMENTS = 'FETCH_APPOINTMENTS';
export const FETCH_APPOINTMENTS_SUCCESS = 'FETCH_APPOINTMENTS_SUCCESS';
export const FETCH_APPOINTMENTS_FAILURE = 'FETCH_APPOINTMENTS_FAILURE';

export const fetchAppointments = (userId) => async dispatch => {
  dispatch({ type: FETCH_APPOINTMENTS });
  try {
    const response = await axios.get(`http://192.168.0.169:8080/user_appointments/${userId}`);
    if (response.status === 200) {
      dispatch({ type: FETCH_APPOINTMENTS_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: FETCH_APPOINTMENTS_FAILURE, error: 'Failed to fetch appointments' });
      Alert.alert('Error', 'Failed to fetch appointments');
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'An error occurred while trying to fetch appointments.';
    dispatch({ type: FETCH_APPOINTMENTS_FAILURE, error: errorMessage });
    Alert.alert('Error', errorMessage);
  }
};
export const ADD_APPOINTMENT = 'ADD_APPOINTMENT';

export const addAppointment = (appointment) => ({
  type: ADD_APPOINTMENT,
  payload: appointment,
});
