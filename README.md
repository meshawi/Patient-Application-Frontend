# Patient Application - Frontend

A simple patient management application created as part of a diploma program training with King Faisal Hospital and Research Center. This project allows users to manage their appointments, view account details, and perform other essential tasks. Built using **React Native** with **Redux** for state management and connects to a backend using **Express** and **SQL** (via PHPMyAdmin) for data handling.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Acknowledgements](#acknowledgements)

---

## Features
- User authentication (login, registration, password reset)
- Appointment booking and management
- Viewing and updating user account details
- Persistent state management with Redux
- Intuitive, user-friendly interface with custom styling

## Tech Stack
- **Frontend Framework**: React Native
- **State Management**: Redux
- **Backend**: Express (see backend README)
- **Database**: SQL (via PHPMyAdmin, using XAMPP)

## Project Structure

```
src
├── assets                     # Static assets like images and fonts
├── components                 # Reusable components
├── redux                      # Redux actions, reducers, and store
├── Screens                    # Screens for different app functionalities
├── Styles                     # App-wide styling files
└── validations                # Form validation logic

```

### Main Files and Directories

- **assets**: Contains images and fonts used throughout the app.
- **components**: Includes reusable components such as `AppointmentCard.js`, `CustomCard.js`, and `ReuseableTextInput.js` to standardize UI elements across screens.
- **redux**: Contains Redux-related files, including actions (`appointmentActions.js`, `authActions.js`), reducers (`appointmentReducer.js`, `authReducer.js`), and the Redux store configuration (`store.js`).
- **Screens**: Houses the main screens such as `LoginScreen.js`, `MyAccountScreen.js`, and `AppointmentsScreen.js` that represent different features of the application.
- **Styles**: Contains custom styling files, including color definitions (`colors.js`) and shared style objects (`styles.js`).
- **validations**: Holds validation logic to ensure input correctness and security across forms.

## Setup Instructions

### Prerequisites
- **Node.js** (version >= 12)
- **npm** or **yarn**
- **XAMPP** (for SQL database)
- **React Native CLI** (for running on Android/iOS)
- **Backend API**: The frontend requires a running backend server. [Visit the backend repository here]() for setup instructions.

### Steps

1. **Clone the repository**:


2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Link assets** (if required for fonts/images):
    ```bash
    npx react-native link
    ```

4. **Run the Backend**:
    Follow the instructions in the [backend repository]() to set up and run the backend server. Ensure the backend server is running and accessible before starting the frontend.

5. **Run the app**:
    ```bash
    npx react-native run-android  # For Android
    npx react-native run-ios      # For iOS
    ```

## Usage

Once the app is running:
- **Login/Register**: Access account features with authentication.
- **Manage Appointments**: View, create, and delete appointments.
- **Profile Management**: Update personal details within the app.
- **Notifications**: Receive reminders and notifications for appointments.

## Future Enhancements
- **Push Notifications**: Implement real-time notifications for appointment reminders.
- **Enhanced UI**: Improve styling and add animations for a more responsive feel.
- **Additional Validations**: Increase validation checks for input fields.
- **Multi-language Support**: Add support for multiple languages.

## Acknowledgements
This project was developed as part of my college diploma program during my training at King Faisal Hospital and Research Center.