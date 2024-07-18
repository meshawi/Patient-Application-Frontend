// actions/authActions.js
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const AUTH_INIT = 'AUTH_INIT';
export const PASSWORD_RESET = 'PASSWORD_RESET';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILURE = 'PASSWORD_RESET_FAILURE';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const login = (username, password) => async dispatch => {
  dispatch({ type: LOGIN });
  try {
    const response = await axios.post('http://192.168.0.169:8080/login', {
      email: username,
      password: password,
    });

    if (response.status === 200) {
      const { token, id, email, firstname, lastname } = response.data;
      await AsyncStorage.multiSet([
        ['token', token],
        ['id', id.toString()],
        ['email', email],
        ['firstname', firstname],
        ['lastname', lastname],
      ]);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { username, token, id, email, firstname, lastname },
      });
      Alert.alert('Login Successful');
    } else {
      dispatch({ type: LOGIN_FAILURE, error: response.data.message });
      Alert.alert('Login Failed', response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'An error occurred while trying to login.';
    dispatch({ type: LOGIN_FAILURE, error: errorMessage });
    Alert.alert('Login Failed', errorMessage);
  }
};

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.multiRemove(['token', 'id', 'email', 'firstname', 'lastname']);
    dispatch({ type: LOGOUT_SUCCESS });
    Alert.alert('Logout Successful', 'You have been logged out.');
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'An error occurred while trying to logout.';
    dispatch({ type: LOGOUT_FAILURE, error: errorMessage });
    Alert.alert('Logout Failed', errorMessage);
  }
};

export const initializeAuth = () => async dispatch => {
  const token = await AsyncStorage.getItem('token');
  const id = await AsyncStorage.getItem('id');
  const email = await AsyncStorage.getItem('email');
  const firstname = await AsyncStorage.getItem('firstname');
  const lastname = await AsyncStorage.getItem('lastname');
  
  if (token && id && email && firstname && lastname) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, id, email, firstname, lastname },
    });
  } else {
    dispatch({ type: AUTH_INIT });
  }
};

export const resetPassword = (email, mobile, newPassword) => async dispatch => {
  dispatch({ type: PASSWORD_RESET });
  try {
    const response = await axios.post('http://192.168.0.169:8080/passreset', {
      email,
      mobile,
      newPassword,
    });

    if (response.status === 200) {
      dispatch({ type: PASSWORD_RESET_SUCCESS });
      Alert.alert('Password Updated', 'Your password has been updated successfully.');
    } else {
      dispatch({ type: PASSWORD_RESET_FAILURE, error: 'Password reset failed' });
      Alert.alert('Error', 'An error occurred while trying to update the password.');
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'An error occurred while trying to update the password.';
    dispatch({ type: PASSWORD_RESET_FAILURE, error: errorMessage });
    Alert.alert('Error', errorMessage);
  }
};

export const deleteUser = (email, password) => async dispatch => {
  dispatch({ type: DELETE_USER });
  try {
    const response = await axios.delete('http://192.168.0.169:8080/deleteuser', {
      data: {
        email,
        password,
      },
    });

    if (response.status === 200) {
      await AsyncStorage.multiRemove(['token', 'id', 'email', 'firstname', 'lastname']);
      dispatch({ type: DELETE_USER_SUCCESS });
      Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
    } else {
      dispatch({ type: DELETE_USER_FAILURE, error: 'Delete user failed' });
      Alert.alert('Error', 'An error occurred while trying to delete the account.');
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'An error occurred while trying to delete the account.';
    dispatch({ type: DELETE_USER_FAILURE, error: errorMessage });
    Alert.alert('Error', errorMessage);
  }
};

export const register = (userData) => async dispatch => {
  dispatch({ type: REGISTER });
  try {
    const response = await axios.post('http://192.168.0.169:8080/createpationt', userData);

    if (response.data === 'Pationt created') {
      dispatch({ type: REGISTER_SUCCESS });
      Alert.alert('Success', 'Patient created successfully.');
    } else {
      dispatch({ type: REGISTER_FAILURE, error: 'Registration failed' });
      Alert.alert('Error', 'Something went wrong.');
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'An error occurred while trying to register.';
    dispatch({ type: REGISTER_FAILURE, error: errorMessage });
    Alert.alert('Error', errorMessage);
  }
};
