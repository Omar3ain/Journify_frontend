import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from './Profile';
import InBoardingOne from '../screens/inBoarding/InBoardingOne';
import InBoardingTwo from '../screens/inBoarding/inBoardingTwo';
import Home from '../screens/home/Home';
import FlgihtsTab from "../screens/Flights/FlightsBoarding";
import HotelList from '../screens/hotels/hotelsList';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#00a7d5',
      }}
    >
      <Tab.Screen
        name="Home" // Here the name...
        component={Home} // navigator
        options={{
          tabBarLabel: 'Home', // tab name
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} /> // icon
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Hotels"
        component={HotelList}
        options={{
          tabBarLabel: 'Hotels',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-modern" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Flights"
        component={FlgihtsTab}
        options={{
          tabBarLabel: 'Flights',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="airplane-takeoff" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false
        }}
      />


    </Tab.Navigator>
  );
}
