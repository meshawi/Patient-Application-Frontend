// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import appointmentReducer from "./appointmentReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
  },
});

export default store;
