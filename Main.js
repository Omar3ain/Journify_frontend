import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Hotels from "./navigation/Hotels";
import PlaceInfo from "./screens/Place/PlaceInfo";
import MainNavigator from "./navigation/MainNavigator";



const Stack = createStackNavigator();

export default function Main() {

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="PlaceInfo" component={PlaceInfo} options={{ headerShown: true, title: 'Place Details' }} />
      <Stack.Screen name="Hotels" component={Hotels} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Flights" component={FlightsTab} options={{ headerShown: true }} /> */}
    </Stack.Navigator>
  </NavigationContainer>
  );
}
