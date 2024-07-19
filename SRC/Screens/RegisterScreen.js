import React, { useRef, useState } from "react";
import { View, ScrollView, Alert, Image, KeyboardAvoidingView, Platform } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
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
import CustomDivider from "../components/CustomDivider";
import CardWithLabel from "../components/CardWithLabel";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

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
      birthdate: birthdate.toISOString().split("T")[0],
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
      keyboardType: "default",
    },
    {
      label: "Last Name",
      placeholder: "Aleshawi",
      validate: validateLastName,
      errorMessage:
        "Last name should be 3-16 characters long and contain only letters.",
      field: "lastName",
      keyboardType: "default",
    },
    {
      label: "Mobile Number",
      placeholder: "ex: 0599999999",
      validate: validateMobile,
      errorMessage: "Mobile number should be 10 digits long and start with 05.",
      field: "mobile",
      keyboardType: "phone-pad",
    },
    {
      label: "City",
      placeholder: "Enter your city",
      validate: validateCity,
      errorMessage:
        "City name must be at least 3 characters long and contain only letters and spaces.",
      field: "city",
      keyboardType: "default",
    },
    {
      label: "Email",
      placeholder: "Email",
      validate: validateEmail,
      errorMessage: "Email should be a valid email address.",
      field: "email",
      keyboardType: "email-address",
    },
    {
      label: "Password",
      placeholder: "Avsodfje@123",
      validate: validatePass,
      errorMessage:
        "Password should be 8-16 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      field: "password",
      keyboardType: "default",
      secureTextEntry: true,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require("../assets/SignupImage.png")}
            style={[styles.Illustrations, { width: 200, height: 200 }]}
          />
          <View style={styles.centeredTextContainer}>
            <Text style={styles.heading1}>Let's Get Started!</Text>
            <Text style={styles.heading3}>
              Create an account to get all features of this app.
            </Text>
          </View>
          <View style={styles.inputRow}>
            {inputsArray.slice(0, 2).map((input, index) => (
              <View key={index} style={styles.inputContainer}>
                <ReuseableTextInput
                  label={input.label}
                  placeholder={input.placeholder}
                  validate={input.validate}
                  errorMessage={input.errorMessage}
                  keyboardType={input.keyboardType}
                  onValueChange={(value) =>
                    handleInputChange(input.field, value)
                  }
                />
              </View>
            ))}
          </View>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Button
                mode="outlined"
                onPress={() => setIsDatePickerOpen(true)}
                style={styles.datePickerButton}
                contentStyle={styles.datePickerButtonContent}
              >
                <Text style={styles.datePickerButtonText}>
                  {birthdate.toISOString().split("T")[0] ===
                  new Date().toISOString().split("T")[0]
                    ? "Select Date of Birth"
                    : birthdate.toISOString().split("T")[0]}
                </Text>
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

            <View style={styles.inputContainer}>
              <ReuseableTextInput
                label={inputsArray[3].label}
                placeholder={inputsArray[3].placeholder}
                validate={inputsArray[3].validate}
                errorMessage={inputsArray[3].errorMessage}
                keyboardType={inputsArray[3].keyboardType}
                onValueChange={(value) =>
                  handleInputChange(inputsArray[3].field, value)
                }
              />
            </View>
          </View>
          <View>
            <View>
              {inputsArray.slice(2, 3).map((input, index) => (
                <View key={index}>
                  <ReuseableTextInput
                    label={input.label}
                    placeholder={input.placeholder}
                    validate={input.validate}
                    errorMessage={input.errorMessage}
                    keyboardType={input.keyboardType}
                    onValueChange={(value) =>
                      handleInputChange(input.field, value)
                    }
                  />
                </View>
              ))}
            </View>
            {inputsArray.slice(4).map((input, index) => (
              <View key={index}>
                <ReuseableTextInput
                  label={input.label}
                  placeholder={input.placeholder}
                  validate={input.validate}
                  errorMessage={input.errorMessage}
                  keyboardType={input.keyboardType}
                  onValueChange={(value) =>
                    handleInputChange(input.field, value)
                  }
                  secureTextEntry={input.secureTextEntry}
                />
              </View>
            ))}
          </View>
          <View>
            <CustomDivider />
            <View style={styles.cardWithLabelRow}>
              <CardWithLabel
                label="Gender"
                options={radioGender}
                onValueChange={(value) => handleRadioChange("gender", value)}
              />
              <CardWithLabel
                label="Marital Status"
                options={radioMaritalstatus}
                onValueChange={(value) =>
                  handleRadioChange("maritalStatus", value)
                }
              />
            </View>
          </View>

          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Register
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;
