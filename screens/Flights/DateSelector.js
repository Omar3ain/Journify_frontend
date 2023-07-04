import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CalendarPicker from "../../components/CalenderPicker";
import Loader from "../../components/Loader";
import Icon from "react-native-vector-icons/FontAwesome5";
import { cardStyle } from "./flightCard";
import { selectFlight } from "../../services/reducers/Flights/availableSlice";

export default function DateSelector({ navigation }) {
  const dispatch = useDispatch();
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedFlights, setSelectedFlights] = useState([]);
  const { availableFlights, selectedDate, isLoading } = useSelector(
    (state) => state.flights
  );
  const { flightsIDS } = useSelector((state) => state.reservations);

  useEffect(() => {
    const newAvailableDates = availableFlights.map(
      (flight) => flight.traveling_date
    );
    setAvailableDates(newAvailableDates);
  }, [availableFlights]);

  useEffect(() => {
    const filtered_flights = availableFlights.filter(
      (flight) => flight.traveling_date.split("T")[0] == selectedDate
    );
    setSelectedFlights([...filtered_flights]);
  }, [availableFlights, selectedDate]);

  const reserveFlight = (flight) => {
    dispatch(selectFlight(flight));
    navigation.navigate("Booking");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <CalendarPicker availableDates={availableDates}></CalendarPicker>
        </View>
        <View style={{ width: "100%" }}>
          {!isLoading ? (
            <View style={cardStyle.container}>
              {selectedFlights.length ? (
                selectedFlights.map((flight) => (
                  <View key={flight.id} style={cardStyle.card}>
                    <View style={cardStyle.details}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "90%",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {/* <Text style={cardStyle.name}>
                        <Icon name="city" size={16} color="#666" />
                        {"   "}
                        {flight.company_name}
                      </Text> */}
                        {flightsIDS[flight.id] && (
                          <View style={{ marginLeft: 10 }}>
                            <Text
                              style={{
                                ...cardStyle.name,
                                color: "#2cb8e5",
                                fontWeight: "bold",
                              }}
                            >
                              Upcoming Flight
                            </Text>
                          </View>
                        )}
                      </View>
                      <View style={{ ...cardStyle.info, marginTop: 30 }}>
                        <View>
                          <Text style={cardStyle.name}>
                            <Icon
                              name="plane-departure"
                              size={16}
                              color="#666"
                            />
                            {"   "}
                            {flight.origin}
                          </Text>
                          <Text style={cardStyle.text}>
                            <Icon
                              name="clock"
                              size={20}
                              color="#666"
                              style={{ paddingBottom: 15 }}
                            />
                            {"   "}
                            {new Date(flight.traveling_date).getUTCHours() +
                              " : " +
                              new Date(flight.traveling_date).getMinutes()}
                          </Text>
                        </View>
                        <View>
                          <Text style={cardStyle.name}>
                            <Icon name="plane-arrival" size={16} color="#666" />
                            {"   "}
                            {flight.destination}
                          </Text>
                          <Text style={cardStyle.text}>
                            <Icon
                              name="clock"
                              size={20}
                              color="#666"
                              style={{ paddingBottom: 15 }}
                            />
                            {"   "}
                            {new Date(flight.traveling_date).getUTCHours() +
                              " : " +
                              new Date(flight.traveling_date).getMinutes()}
                          </Text>
                        </View>
                      </View>
                      {!flightsIDS[flight.id] && (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "90%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginHorizontal: 10,
                          }}
                        >
                          <View style={{ marginRight: 5 }}>
                            <Text style={{ ...cardStyle.name }}>
                              <Icon
                                name="money-check-alt"
                                size={20}
                                color="#666"
                              />
                              {"   "}
                              {flight.ticket_price + " $"}
                            </Text>
                          </View>

                          <View style={{ marginRight: 5 }}>
                            <TouchableOpacity
                              style={{ ...cardStyle.button }}
                              onPress={() => reserveFlight(flight)}
                            >
                              <Text style={cardStyle.buttonText}>
                                Select Flight
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text style={{ ...cardStyle.name }}>
                    {" "}
                    No Available flights Found{" "}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <Loader />
          )}
        </View>
      </View>
    </ScrollView>
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
  image: {
    alignSelf: "center",
    resizeMode: "contain",
  },
});
