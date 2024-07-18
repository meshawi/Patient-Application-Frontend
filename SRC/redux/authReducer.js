// reducers/authReducer.js
import {
    LOGIN,
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    AUTH_INIT,
    PASSWORD_RESET,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILURE,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
  } from './authActions';
  
  const initialState = {
    isAuthenticated: false,
    username: '',
    token: null,
    id: null,
    email: '',
    firstname: '',
    lastname: '',
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          error: null,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          username: action.payload.username || state.username,
          token: action.payload.token,
          id: action.payload.id || state.id,
          email: action.payload.email || state.email,
          firstname: action.payload.firstname || state.firstname,
          lastname: action.payload.lastname || state.lastname,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          isAuthenticated: false,
          username: '',
          token: null,
          id: null,
          email: '',
          firstname: '',
          lastname: '',
          error: action.error,
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
          username: '',
          token: null,
          id: null,
          email: '',
          firstname: '',
          lastname: '',
        };
      case LOGOUT_FAILURE:
        return {
          ...state,
          error: action.error,
        };
      case AUTH_INIT:
        return {
          ...state,
          isAuthenticated: false,
        };
      case PASSWORD_RESET:
        return {
          ...state,
          error: null,
        };
      case PASSWORD_RESET_SUCCESS:
        return {
          ...state,
          error: null,
        };
      case PASSWORD_RESET_FAILURE:
        return {
          ...state,
          error: action.error,
        };
      case DELETE_USER:
        return {
          ...state,
          error: null,
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
          username: '',
          token: null,
          id: null,
          email: '',
          firstname: '',
          lastname: '',
        };
      case DELETE_USER_FAILURE:
        return {
          ...state,
          error: action.error,
        };
      case REGISTER:
        return {
          ...state,
          error: null,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          error: null,
        };
      case REGISTER_FAILURE:
        return {
          ...state,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  