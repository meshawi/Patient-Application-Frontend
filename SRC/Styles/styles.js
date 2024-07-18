import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
  },
  divider: {
    height: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  inputWrapper: {
    width: "48%", // Adjust the width as needed
    marginBottom: 8, // Add some spacing between rows
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  cardsWrapper: {
    width: "48%", // Adjust the width as needed
    marginBottom: 8, // Add some spacing between rows
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 5,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexWrap: "wrap",
    elevation: 5,
  },
  buttonBottomApsoulte: {
    position: "absolute",
    bottom: 10,
    left: "5%",
    width: "100%",
  },
  // squared button
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default styles;
