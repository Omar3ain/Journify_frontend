import React, { useEffect, useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
  getReservedFlights,
  cancelReservedFlights,
} from "../../services/reducers/Flights/reservationsSlice";
import { cardStyle } from "./flightCard";

const Reservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(
    (state) => state.reservations.flightReservations
  );

  const [displayedReservations, setDisplayedReservations] = useState([
    ...reservations,
  ]);

  const [display, setDisplay] = useState("latest");

  const canCancel = (date) => {
    const now = new Date();
    const timeDiff = new Date(date).getTime() - now.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    // Return false if the current date is less than two days from the other date
    return daysDiff > 2;
  };

  const active = (date) => {
    const now = new Date();
    const timeDiff = new Date(date).getTime() - now.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff > 0;
  };

  const mapDate = (data) => {
    return data.map((item) => {
      return { ...item, traveling_date: item.flight.traveling_date.split("T") };
    });
  };

  useEffect(() => {
    dispatch(getReservedFlights());
  }, [dispatch]);

  useEffect(() => {
    if (display === "latest") {
      setDisplayedReservations(mapDate([...reservations].reverse()));
    } else setDisplayedReservations(mapDate([...reservations]));
  }, [reservations, display]);


  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
          marginVertical: 10,
          paddingVertical: 5,
          marginRight: 15,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Icon name="sort" size={20} color="#2cb8e5" />
        </View>
        <Picker
          selectedValue={display}
          onValueChange={(itemValue) => setDisplay(itemValue)}
          style={styles.input}
          key={display}
        >
          <Picker.Item label="Recent" value="latest" />
          <Picker.Item label="Earliest" value="earliest" />
        </Picker>
      </View>
      {displayedReservations.map((reservation) => (
        <View key={reservation.id} style={cardStyle.card}>
          <View style={cardStyle.details}>
            <View style={styles.cardPart}>
              <Text style={cardStyle.name}>
                <Icon name="city" size={16} color="#666" />
                {"   "}
                {reservation.flight.company_name}
              </Text>
              <Text
                style={{
                  color: active(reservation.traveling_date[0])
                    ? "#2cb8e5"
                    : "#666",
                }}
              >
                <Icon
                  name="calendar"
                  solid= {active(reservation.flight.traveling_date) ? true : false}
                  size={16}
                  color={
                    active(reservation.flight.traveling_date) ? "#2cb8e5" : "#666"
                  }
                />
                {"   "}
                {reservation.traveling_date[0]}
              </Text>
            </View>
            <View style={{ ...cardStyle.info2, marginTop: 30 }}>
              <View style={cardStyle.reservationBox}>
                <Text style={cardStyle.name}>
                  <Icon name="plane-departure" size={16} color="#666" />
                  {"   "}
                  {reservation.flight.origin}
                </Text>
                <Text style={cardStyle.text}>
                  <Icon
                    name="clock"
                    size={20}
                    color="#666"
                    style={{ paddingBottom: 15 }}
                  />
                  {"   "}
                  {new Date(reservation.flight.traveling_date).getUTCHours() +
                    " : " +
                    new Date(reservation.flight.traveling_date).getMinutes()}
                </Text>
              </View>
              <View style={cardStyle.reservationBox}>
                <Text style={cardStyle.name}>
                  <Icon name="plane-arrival" size={16} color="#666" />
                  {"   "}
                  {reservation.flight.destination}
                </Text>
                <Text style={cardStyle.text}>
                  <Icon
                    name="clock"
                    size={20}
                    color="#666"
                    style={{ paddingBottom: 15 }}
                  />
                  {"   "}
                  {new Date(reservation.flight.traveling_date).getUTCHours() +
                    " : " +
                    new Date(reservation.flight.traveling_date).getMinutes()}
                </Text>
              </View>
              <View
                style={{
                  ...styles.cardPart,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 20,
                  }}
                >
                  <Text style={{ ...cardStyle.name, marginBottom: 20 }}>
                    {"Class: "}
                    {" Business"}
                  </Text>
                  <Text style={cardStyle.text}>
                    {"Seats Number: "}
                    {reservation.number_seats}
                  </Text>
                </View>
                {canCancel(reservation.flight.traveling_date[0]) && (
                  <View style={{ paddingTop: 20 }}>
                    <TouchableOpacity
                      style={{
                        ...cardStyle.button,
                        backgroundColor: "red",
                      }}
                      onPress={() =>
                        dispatch(cancelReservedFlights(reservation))
                      }
                    >
                      <Text style={cardStyle.buttonText}>Cancel </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Reservations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  cardPart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    backgroundColor: "#e8e8e8",
    border: "none",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: "30%",
  },
});
