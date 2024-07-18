import React, { useRef, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Text, Divider, Button, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import DatePicker from "react-native-date-picker";
import styles from "../Styles/styles";

import {
  validateFirstName,
  validateLastName,
  validateMobile,
  validateEmail,
  validatePass,
  validateCity,
} from "../validations/validations";
import ReuseableTextInput from "../components/ReuseabileTextInput";
import ReuseableRadioButton from "../components/ReuseabileRadioButton";
import { register } from "../redux/authActions";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme(); // Access the theme

  const [birthdate, setBirthdate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const formValues = useRef({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    city: "",
    gender: "",
    maritalStatus: "",
  });

  const handleInputChange = (field, value) => {
    formValues.current[field] = value;
  };

  const handleRadioChange = (field, value) => {
    formValues.current[field] = value;
  };

  const validateForm = () => {
    const isValid = [
      validateFirstName(formValues.current.firstName),
      validateLastName(formValues.current.lastName),
      validateMobile(formValues.current.mobile),
      validateEmail(formValues.current.email),
      validatePass(formValues.current.password),
      validateCity(formValues.current.city),
      formValues.current.gender !== "",
      formValues.current.maritalStatus !== "",
    ].every(Boolean);

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please ensure all fields are valid.");
      return;
    }

    const userData = {
      firstname: formValues.current.firstName,
      lastname: formValues.current.lastName,
      mobile: formValues.current.mobile,
      email: formValues.current.email,
      password: formValues.current.password,
      city: formValues.current.city,
      gender: formValues.current.gender,
      maritalstatus: formValues.current.maritalStatus,
      birthdate: birthdate.toISOString().split("T")[0], // Format the date as YYYY-MM-DD
    };

    dispatch(register(userData));
  };

  const inputsArray = [
    {
      label: "First Name",
      placeholder: "Mohammed",
      validate: validateFirstName,
      errorMessage:
        "First name should be 3-16 characters long and contain only letters.",
      field: "firstName",
    },
    {
      label: "Last Name",
      placeholder: "Aleshawi",
      validate: validateLastName,
      errorMessage:
        "Last name should be 3-16 characters long and contain only letters.",
      field: "lastName",
    },
    {
      label: "Mobile Number",
      placeholder: "ex: 0599999999",
      validate: validateMobile,
      errorMessage: "Mobile number should be 10 digits long and start with 05.",
      field: "mobile",
    },
    {
      label: "Email",
      placeholder: "Email",
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
    },
    {
      label: "City",
      placeholder: "Enter your city",
      validate: validateCity,
      errorMessage:
        "City name must be at least 3 characters long and contain only letters and spaces.",
      field: "city",
    },
  ];

  const radioGender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const radioMaritalstatus = [
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
  ];

  return (
    <SafeAreaProvider>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.header, { color: theme.colors.textPrimary }]}>
          Register
        </Text>
        <View style={styles.inputContainer}>
          {inputsArray.map((input, index) => (
            <React.Fragment key={index}>
              <View key={index} style={styles.inputWrapper}>
                <ReuseableTextInput
                  label={input.label}
                  placeholder={input.placeholder}
                  validate={input.validate}
                  errorMessage={input.errorMessage}
                  onValueChange={(value) =>
                    handleInputChange(input.field, value)
                  }
                />
              </View>
            </React.Fragment>
          ))}
        </View>
        <Divider
          style={[
            styles.divider,
            { backgroundColor: theme.colors.textPrimary },
          ]}
        />
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Button
              mode="contained"
              onPress={() => setIsDatePickerOpen(true)}
              style={{ backgroundColor: theme.colors.accent }}
            >
              Select Birthdate
            </Button>
            <DatePicker
              modal
              open={isDatePickerOpen}
              date={birthdate}
              mode="date"
              onConfirm={(date) => {
                setIsDatePickerOpen(false);
                setBirthdate(date);
              }}
              onCancel={() => {
                setIsDatePickerOpen(false);
              }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Button
              mode="outlined"
              style={{
                borderColor: theme.colors.accent,
                backgroundColor: theme.colors.background,
              }}
            >
              <Text style={[{ color: theme.colors.textPrimary }]}>
                {birthdate.toDateString()}
              </Text>
            </Button>
          </View>
        </View>

        <Divider
          style={[
            styles.divider,
            { backgroundColor: theme.colors.textPrimary },
          ]}
        />
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <ReuseableRadioButton
              label="Gender"
              options={radioGender}
              onValueChange={(value) => handleRadioChange("gender", value)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <ReuseableRadioButton
              label="Marital Status"
              options={radioMaritalstatus}
              onValueChange={(value) =>
                handleRadioChange("maritalStatus", value)
              }
            />
          </View>
        </View>
        <Button
          mode="contained"
          style={[
            styles.buttonBottomApsoulte,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={handleSubmit}
        >
          Register
        </Button>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;
