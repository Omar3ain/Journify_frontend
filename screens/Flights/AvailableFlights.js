import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import Logo from "../../components/Logo";
import Icon from "react-native-vector-icons/FontAwesome5";
import { API_BASE_URL } from "../../baseUrl";
import Toast from "react-native-toast-message";
import {
  getFlights,
  reserveFlight,
} from "../../services/reducers/Flights/availableSlice";

const URL = `${API_BASE_URL}flights/`;

export default function Flights({ navigation }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [adultsNum, setAdults] = useState(1);
  const [kidsNum, setKids] = useState(0);
  const [error, setError] = useState({
    originError: "",
    destinationError: "",
    kidsError: "",
    adultsError: "",
  });

  // const [disableFlyOut, setDisableFlyOut] = useState(true);

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { selectedFlight, reservedFlight } = useSelector(
    (state) => state.flights
  );
  useEffect(() => {
    // if (isSuccess) {
    //   setTimeout(() => {
    //     navigation.navigate("In boarding one");
    //   }, 1000);
    // }
    if (user && !isSuccess) {
      navigation.navigate("InitialScreen");
    }
    console.log("origin", origin);
    console.log(reservedFlight);
  }, [
    dispatch,
    user,
    isSuccess,
    isError,
    selectedFlight,
    reservedFlight,
    setError,
  ]);

  const getAvailableFlights = () => {
    if (origin.length && destination.length) {
      dispatch(getFlights({ origin, destination }));
      navigation.navigate("Select Date");
    } else {
      if (!origin.length)
        setError({ ...error, originError: "select departure first" });
      if (!destination.length)
        setError({ ...error, destinationError: "select destination first " });
    }
    console.log(error);
  };

  const updateInputs = (name, value) => {
    switch (name) {
      case "Departure":
        if (value.length) {
          setOrigin(value);
          setError({ ...error, originError: "" });
        } else {
          setError({ ...error, originError: `select ${name} first` });
        }
        break;
      case "Destination":
        if (value.length) {
          setDestination(value);
          setError({ ...error, destinationError: "" });
        } else {
          setError({ ...error, destinationError: `select ${name} first` });
        }
        break;
      default:
        break;
    }
    console.log(error);
  };

  const increasSeats = (seatsType) => {
    if (seatsType === "adults") {
      if (adultsNum <= 15) setAdults((prev) => prev + 1);
      else return;
    } else if (seatsType === "kids") {
      if (kidsNum <= 15) setKids((prev) => prev + 1);
      else return;
    }
  };

  const decreasSeats = (seatsType) => {
    if (seatsType === "adults") {
      if (adultsNum !== 0) setAdults((prev) => prev - 1);
      else return;
    } else if (seatsType === "kids") {
      if (kidsNum !== 0) setKids((prev) => prev - 1);
      else return;
    }
  };

  const bookFlight = (action) => {
    if (adultsNum + kidsNum > 15) {
      Toast.show({
        type: "error",
        text1: "Maximum allowed seats number is less than 15",
      });
      return;
    }
    dispatch(reserveFlight({ seatsNumber: adultsNum + kidsNum, action }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={100} height={100} />
      </View>
      <View style={styles.flightsDates}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => getAvailableFlights()}
          // disabled={
          //   !(error.destinationError.length && error.originError.length)
          // }
          activeOpacity={0.5}
        >
          <Text style={styles.flighDateButtonText}>Fly out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("select date")}
        >
          <Text style={styles.flighDateButtonText}>Fly back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            <Icon name="plane-departure" size={14} color="#666" /> {"  "}
            Departure
          </Text>
          <View style={styles.inputWrapper}>
            <Picker
              selectedValue={origin}
              onValueChange={(itemValue) =>
                updateInputs("Departure", itemValue)
              }
              style={styles.input}
            >
              <Picker.Item label="Please choose value..." value="" />
              <Picker.Item label="Egypt" value="EG" />
              <Picker.Item label="France" value="FR" />
            </Picker>
          </View>
          {error.originError.length && (
            <View style={{ padding: 10 }}>
              <Text style={{ color: "red", fontSize: 14 }}>
                {error.originError}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            {" "}
            <Icon name="plane-arrival" size={14} color="#666" /> {"  "}
            Destination
          </Text>
          <View style={styles.inputWrapper}>
            <Picker
              selectedValue={destination}
              onValueChange={(itemValue) =>
                updateInputs("Destination", itemValue)
              }
              style={styles.input}
            >
              <Picker.Item label="Please choose value..." value="" />
              <Picker.Item label="Belgium" value="BE" />
              <Picker.Item label="France" value="FR" />
            </Picker>
          </View>
          {error.destinationError.length && (
            <View style={{ padding: 10 }}>
              <Text style={{ color: "red", fontSize: 14 }}>
                {error.destinationError}
              </Text>
            </View>
          )}
        </View>
      </View>
      {selectedFlight && (
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Flight Information</Text>
          <View>
            <Text>
              Traveling Date : {selectedFlight.traveling_date.split("T")[0]}
            </Text>
          </View>
          <View>
            <Text>
              <Icon
                name="clock"
                size={20}
                color="#666"
                style={{ paddingBottom: 15 }}
              />
              {"  "}
              {new Date(selectedFlight.traveling_date).getUTCHours() +
                " : " +
                new Date(selectedFlight.traveling_date).getMinutes()}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Seats Number</Text>
        <View style={styles.divider} />
      </View>
      <View>
        <View>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.label}>Adults </Text>
              <View style={styles.inputWrapper}>
                <TouchableOpacity
                  disabled={adultsNum >= 15 || kidsNum + adultsNum >= 15}
                  onPress={() => increasSeats("adults")}
                >
                  <Text>
                    <Icon
                      name="plus"
                      size={20}
                      color={adultsNum >= 15 || kidsNum + adultsNum >= 15 ? "#000" : "#2cb8e5"}
                    />
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={{ ...styles.numberInput }}
                  value={adultsNum}
                  onChangeText={setAdults}
                  keyboardType="numeric"
                  maxLength={15}
                />
                <TouchableOpacity
                  disabled={adultsNum <= 0}
                  onPress={() => decreasSeats("adults")}
                >
                  <Text>
                    <Icon
                      name="minus"
                      size={20}
                      color={adultsNum > 0 ? "#2cb8e5" : "#000"}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.label}>Children </Text>
              <View style={styles.inputWrapper}>
                <TouchableOpacity
                  disabled={kidsNum >= 15 || kidsNum + adultsNum >= 15}
                  onPress={() => increasSeats("kids")}
                >
                  <Text>
                    <Icon
                      name="plus"
                      size={20}
                      color={kidsNum >= 15 || kidsNum + adultsNum >= 15 ? "#000" : "#2cb8e5"}
                    />
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={{ ...styles.numberInput }}
                  value={kidsNum}
                  onChangeText={setKids}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TouchableOpacity
                  disabled={kidsNum <= 0}
                  onPress={() => decreasSeats("kids")}
                >
                  <Text>
                    <Icon
                      name="minus"
                      size={20}
                      color={kidsNum > 0 ? "#2cb8e5" : "#000"}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      {reservedFlight && (
        <View style={{ width: "100%" }}>
          <Text style={{ color: "#2cb8e5", fontWeight: "bold" }}>
            Total Price:{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>
              {" " + reservedFlight.total_price + " EGP"}
            </span>
          </Text>
        </View>
      )}

      {kidsNum + adultsNum > 15 && (
        <View style={{ width: "100%", padding: 10 }}>
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>
            Total Seats must be less than 15
          </Text>
        </View>
      )}

      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            bookFlight("edit");
          }}
          // disabled={true}
          activeOpacity={0.5}
        >
          <Text style={styles.flighDateButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "column",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "column",
    marginBottom: 16,
    width: "100%",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#e8e8e8",
    border: "none",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  numberInput: {
    width: "95%",
    height: 40,
    backgroundColor: "#e8e8e8",
    border: "none",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 20,
  },
  label: {
    color: "#727171",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left",
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
  flighDateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  divider: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#727171",
    width: 150,
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#727171",
    fontWeight: "bold",
  },

  mutedText: {
    color: "gray",
    fontWeight: "100",
  },
  flightsDates: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  fieldSet: {
    marginHorizontal: 10,
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#727171",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  legend: {
    position: "absolute",
    top: -10,
    left: 10,
    fontWeight: "bold",
    backgroundColor: "#FFFFFF",
  },
});
