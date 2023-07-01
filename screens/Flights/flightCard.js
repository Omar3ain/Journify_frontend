import { StyleSheet } from "react-native";
export const cardStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  details: {
    flexDirection: "column",
    padding: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  info2: {
    flexDirection: "column",
    marginVertical: 10,
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 16,
    color: "#666666",
  },

  button: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#2cb8e5",
    borderRadius: 5,
    margin: 20,
    textAlign: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  reservationBox:{
    display: "flex",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "space-around",
    borderRadius: 5,
    padding: 10,
    margin:10
  }
});
