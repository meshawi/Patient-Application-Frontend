// LoginScreen.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Alert, Image, View } from "react-native";
import {
  Text,
  Button,
  Divider,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { validateEmail, validatePass } from "../validations/validations";
import ReuseableTextInput from "../components/ReuseabileTextInput";
import { login } from "../redux/authActions";
import styles from "../Styles/styles";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const theme = useTheme(); // Access the theme

  const formValues = React.useRef({
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    formValues.current[field] = value;
  };

  const validateForm = () => {
    return (
      validateEmail(formValues.current.email) &&
      validatePass(formValues.current.password)
    );
  };

  const handleLogin = () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please ensure all fields are valid.");
      return;
    }
    dispatch(login(formValues.current.email, formValues.current.password));
  };

  const inputsArray = [
    {
      label: "Email",
      placeholder: "mohammed@gmail.com",
      validate: validateEmail,
      errorMessage: "Email should be a valid email address.",
      field: "email",
    },
    {
      label: "Password",
      placeholder: "Avsodfje@123",
      validate: validatePass,
      errorMessage:
        "Password should be 8-16 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      field: "password",
      secureTextEntry: true,
    },
  ];

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <ScrollView
          contentContainerStyle={[
            styles.container,
          ]}
        >
          <Image
            source={require("../assets/LoginImage.png")}
            style={[styles.Illustrations,{ marginBottom: 0 }]}
          />
          <View style={styles.centeredTextContainer}>
          <Text style={[styles.heading1]}>
            Welcome Back!
          </Text>
          <Text style={[styles.heading4]}>
            Login to your account to continue.
          </Text>
          </View>
          {inputsArray.map((input, index) => (
            <React.Fragment key={index}>
              <ReuseableTextInput
                label={input.label}
                placeholder={input.placeholder}
                validate={input.validate}
                errorMessage={input.errorMessage}
                onValueChange={(value) => handleInputChange(input.field, value)}
                secureTextEntry={input.secureTextEntry}
              />
            </React.Fragment>
          ))}

          <Button
            mode="contained"
            style={styles.button}
            onPress={handleLogin}
          >
            Login
          </Button>
        </ScrollView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default LoginScreen;
