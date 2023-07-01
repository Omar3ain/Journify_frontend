import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Flights from '../screens/Flights/AvailableFlights';
import DateSelector from '../screens/Flights/DateSelector';
import Reservations from '../screens/Flights/Reservations';

const Stack = createStackNavigator();

export  function FlightTabNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Booking" component={Flights} options={{ headerShown: false }} />
        <Stack.Screen name="My Reservations" component={Reservations} options={{ headerShown: true }} />
      </Stack.Navigator>
  );
}


export  function FlightsNavigator() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Booking" component={Flights} options={{ headerShown: false }} />
          <Stack.Screen name="Select Date" component={DateSelector} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
  }
  