// ForgetPasswordScreen.js
import * as React from "react";
import { ScrollView, Alert, Image, View } from "react-native";
import {
  Text,
  Button,
  Divider,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styles from "../Styles/styles";
import {
  validateEmail,
  validatePass,
  validateMobile,
} from "../validations/validations";
import ReuseableTextInput from "../components/ReuseabileTextInput";
import { resetPassword } from "../redux/authActions";
const ForgetPasswordScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme(); // Access the theme

  const formValues = React.useRef({
    email: "",
    newpass: "",
    mobile: "",
  });

  const handleInputChange = (field, value) => {
    formValues.current[field] = value;
  };

  const validateForm = () => {
    return (
      validateEmail(formValues.current.email) &&
      validatePass(formValues.current.newpass) &&
      validateMobile(formValues.current.mobile)
    );
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please ensure all fields are valid.");
      return;
    }

    dispatch(
      resetPassword(
        formValues.current.email,
        formValues.current.mobile,
        formValues.current.newpass
      )
    );
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
      label: "Mobile Number",
      placeholder: "ex: 0599999999",
      validate: validateMobile,
      errorMessage: "Mobile number should be 10 digits long and start with 05.",
      field: "mobile",
      keyboardType: "numeric",
    },
    {
      label: "New Password",
      placeholder: "Avsodfje@123",
      validate: validatePass,
      errorMessage:
        "Password should be 8-16 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      field: "newpass",
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
          <View style={styles.centeredTextContainer}>
          <Text style={[styles.heading1]}>
            Password Reset
          </Text>
          </View>
          <Image
            source={require("../assets/ResetPasswordImage.png")}
            style={[styles.Illustrations, { width: 200, height: 200 }]}
          />
          <Text
            style={[styles.heading4,{fontWeight: "normal",}]}
          >
            Enter the Email and the Mobile number for validation and enter the
            new Password
          </Text>

          {inputsArray.map((input, index) => (
            <React.Fragment key={index}>
              <ReuseableTextInput
                label={input.label}
                placeholder={input.placeholder}
                validate={input.validate}
                errorMessage={input.errorMessage}
                onValueChange={(value) => handleInputChange(input.field, value)}
                secureTextEntry={input.secureTextEntry}
                keyboardType={input.keyboardType}
              />
            </React.Fragment>
          ))}

          <Button
            mode="contained"
            style={styles.button}
            onPress={handleUpdate}
          >
            Update Password
          </Button>
        </ScrollView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default ForgetPasswordScreen;
