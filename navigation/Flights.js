import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Flights from "../screens/Flights/AvailableFlights";
import DateSelector from "../screens/Flights/DateSelector";
import Reservations from "../screens/Flights/Reservations";
import Auth from "./Auth";

const Stack = createStackNavigator();

export function FlightTabNavigator() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Booking"
        component={isLoggedIn ? Flights : Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="My Reservations"
        component={isLoggedIn ? Reservations : Auth}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export function FlightsNavigator() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Booking"
        component={isLoggedIn ? Flights : Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Select Date"
        component={isLoggedIn ? DateSelector : Auth}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
