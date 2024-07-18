// reducers/appointmentReducer.js
import {
    FETCH_APPOINTMENTS,
    FETCH_APPOINTMENTS_SUCCESS,
    FETCH_APPOINTMENTS_FAILURE,
    ADD_APPOINTMENT,
  } from './appointmentActions';
  
  const initialState = {
    appointments: [],
    loading: false,
    error: null,
  };
  
  const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_APPOINTMENTS:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_APPOINTMENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          appointments: action.payload,
        };
      case FETCH_APPOINTMENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case ADD_APPOINTMENT:
        return {
          ...state,
          appointments: [...state.appointments, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default appointmentReducer;
  