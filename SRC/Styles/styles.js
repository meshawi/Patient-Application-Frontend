import { StyleSheet } from "react-native";
import colors from './colors';

const styles = StyleSheet.create({
  // Containers
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 18,
    backgroundColor: colors.background,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 3,
  },
  twoRowsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  centeredTextContainer: {
    alignItems: "center",
  },
  modualContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor:  colors.white
  },
  customDividerContainer: {
    marginVertical: 10,
  },

  // Inputs
  textInputRadius: {
    borderRadius: 50,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  datePickerButton: {
    height: 50,
    borderRadius: 50,
    borderColor: colors.primaryBlue,
    marginVertical: 7,
    textAlign: "left",
    justifyContent: "center",
  },
  datePickerButtonText: {
    textAlign: "left",
    width: "100%",
    paddingLeft: 10,
    fontSize: 14,
  },

  // Headings
  heading1: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heading2: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heading3: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heading4: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heading5: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heading6: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },


  // Divider
  customDivider: {
    height: 2,
    backgroundColor:colors.dividerColor,
    marginHorizontal: 20,
  },

  // Radio
  radioGroupRow: {
    flexDirection: "row",
    alignItems: "center", 
  },
  radioItem: {
    flexDirection: "row", 
    alignItems: "center", 
    marginRight: 10,
  },
  radioGroupLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 16,
  },
  radioText: {
    fontSize: 16,
  },

  // Buttons
  button: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primaryBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
    elevation: 15,
  },
  buttonLikeStyle: {
    backgroundColor: colors.primaryBlue,
    borderRadius: 5,
    color: colors.white,
    padding: 5,
  },

  // Cards
  twoRowsWarpper: {
    width: '48%', 
    marginVertical: 5,
  },
  cardWithLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  absulotAppmntWord: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontWeight: 'bold',  
    color:colors.error  
  },
  apmntCardFooterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  apmntTimeAvatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    marginLeft: 'auto',
  },
  apmntCardContainer: {
    marginBottom: 10,
  },
  closestAppointmentCard:{
    backgroundColor:colors.primaryBlue,
    elevation: 15,
  },
  closestAppointmentCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  closestAppointmentCardHeaderInfo: {
    marginLeft: 10,
    justifyContent: 'center',    
  },
  closestAppointmentInnerCard: {
    backgroundColor: colors.lighterPraimaryBlue,
    padding: 10,
    borderRadius: 8,
  },
  closestAppointmentNoteContainer: {
    backgroundColor: colors.whiteGreenLight,
    padding: 15,
    borderRadius: 8,
  },
  closestAppointmentNoteText: {
    fontSize: 16,
    color: colors.greenLight,
  },

  // Icons
  icon: {
    marginRight: 5,
    backgroundColor: colors.iconColor,
    
  },

  // Illustrations
  Illustrations: {
    width: 400,
    height: 400,
    alignSelf: "center",
    marginBottom: 20,
  },
  // CustomCard specific styles
  card: {
    marginVertical: 5,
    padding: 10,
    elevation: 15,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    marginLeft: 10,
    fontSize: 15,
  },
});

export default styles;
