import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Reservations from "./Reservations";
import { FlightsNavigator } from "../../navigation/Flights";

const Tab = createMaterialTopTabNavigator();

function FlgihtsTab() {
  return (
    <Tab.Navigator
      initialRouteName="Flights"
      screenOptions={{
        tabBarActiveTintColor: "#2cb8e5",
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: {
          marginVertical: 10,
          color: "#2cb8e5",
          marginHorizontal: 10,
          borderRadius: 5,
        },
      }}
    >
      <Tab.Screen
        name="Booking"
        component={FlightsNavigator}
        options={{ tabBarLabel: "Booking" }}
      />
      <Tab.Screen
        name="My Reservations"
        component={Reservations}
        options={{ tabBarLabel: "My Reservations" }}
      />
    </Tab.Navigator>
  );
}

export default FlgihtsTab;

