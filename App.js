import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import store from './SRC/redux/store';
import React, { useEffect } from 'react';
import { configureFonts, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RegisterScreen from './SRC/Screens/RegisterScreen';
import LoginScreen from './SRC/Screens/LoginScreen';
import ForgetPasswordScreen from './SRC/Screens/ForgetPasswordScreen';
import DeleteUserScreen from './SRC/Screens/DeleteUserScreen';
import WelcomeScreen from './SRC/Screens/WelcomeScreen';
import AppointmentsScreen from './SRC/Screens/AppointmentsScreen';
import ConfirmAppointmentScreen from './SRC/Screens/ConfirmAppointmentScreen';
import MyAccountScreen from './SRC/Screens/MyAccountScreen';
import UserDetailsScreen from './SRC/Screens/UserDetailsScreen';
import MyAppointmentsScreen from './SRC/Screens/MyAppointmentsScreen';
import { initializeAuth } from './SRC/redux/authActions';
import { Platform } from 'react-native';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'EduAUVICWANTHand-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'EduAUVICWANTHand-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'EduAUVICWANTHand-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'EduAUVICWANTHand-Bold',
      fontWeight: 'normal',
    },
    labelMedium: {
      fontFamily: 'EduAUVICWANTHand-Medium',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'EduAUVICWANTHand-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'EduAUVICWANTHand-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'EduAUVICWANTHand-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'EduAUVICWANTHand-Bold',
      fontWeight: 'normal',
    },
    labelMedium: {
      fontFamily: 'EduAUVICWANTHand-Medium',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'EduAUVICWANTHand-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'EduAUVICWANTHand-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'EduAUVICWANTHand-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'EduAUVICWANTHand-Bold',
      fontWeight: 'normal',
    },
    labelMedium: {
      fontFamily: 'EduAUVICWANTHand-Medium',
      fontWeight: 'normal',
    },
  },
  "default": {
  "fontFamily": "EduAUVICWANTHand-Medium",
  "fontWeight": "400",
  "letterSpacing": 0,
},
};

const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
    background: '#e6e6e6',
    surface: '#ffffff',
    accent: '#03dac4',
    error: '#B00020',
    text: '#333333',
    onSurface: '#333333',
    disabled: '#f6f6f6',
    placeholder: '#a1a1a1',
    backdrop: '#f6f6f6',
    textPrimary: '#333333',
    textGSecondary: '#555555',
    textHint: '#777777',
    textDisabled: '#999999',
    textInverse: '#ffffff',
  },
  roundness: 4,
  animation: {
    scale: 1.0,
  },
};

const AuthTabs = () => (
  <Tab.Navigator
    activeColor={theme.colors.primary}
    inactiveColor={theme.colors.placeholder}
    barStyle={{ backgroundColor: theme.colors.surface }}
  >
    <Tab.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{
        tabBarLabel: 'Welcome',
        tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={20} color={color} />,
      }}
    />
    <Tab.Screen
      name="MyAppointmentsScreen"
      component={MyAppointmentsScreen}
      options={{
        tabBarLabel: 'My Appointments',
        tabBarIcon: ({ color }) => <FontAwesome5 name="calendar-alt" size={20} color={color} />,
      }}
    />
    <Tab.Screen
      name="MyAccount"
      component={MyAccountScreen}
      options={{
        tabBarLabel: 'My Account',
        tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={20} color={color} />,
      }}
    />
  </Tab.Navigator>
);

const GuestTabs = () => (
  <Tab.Navigator
    activeColor={theme.colors.primary}
    inactiveColor={theme.colors.placeholder}
    barStyle={{ backgroundColor: theme.colors.surface }}
  >
    <Tab.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        tabBarLabel: 'Register',
        tabBarIcon: ({ color }) => <FontAwesome5 name="user-plus" size={20} color={color} />,
      }}
    />
    <Tab.Screen
      name="Login"
      component={LoginScreen}
      options={{
        tabBarLabel: 'Login',
        tabBarIcon: ({ color }) => <FontAwesome5 name="user-check" size={20} color={color} />,
      }}
    />
  </Tab.Navigator>
);

const MainApp = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="AuthTabs"
              component={AuthTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Appointments" component={AppointmentsScreen} />
            <Stack.Screen name="ConfirmAppointment" component={ConfirmAppointmentScreen} />
            <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
            <Stack.Screen name="DeleteUser" component={DeleteUserScreen} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
          </>
        ) : (
          <Stack.Screen
            name="GuestTabs"
            component={GuestTabs}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function Main() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <MainApp />
      </PaperProvider>
    </ReduxProvider>
  );
}
