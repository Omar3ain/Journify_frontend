import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from './Profile';
// For testing purposes replace these navigators with yours...
import Logo from '../components/Logo';
import InBoardingOne from '../screens/inBoarding/InBoardingOne';
import InBoardingTwo from '../screens/inBoarding/inBoardingTwo';

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
        component={Logo} // navigator
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
        component={InBoardingOne}
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
        component={InBoardingTwo}
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