import { createStackNavigator } from '@react-navigation/stack';
import HotelList from '../screens/hotels/hotelsList';
import HotelDetails from '../screens/hotels/hotelDetails';
import HotelReservation from '../screens/hotels/hotelReservation';



const Stack = createStackNavigator();

export default function Hotels() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="HotelList" component={HotelList} options={{ headerShown: false }} />
        <Stack.Screen name="HotelDetails" component={HotelDetails} options={{ headerShown: true }} />
        <Stack.Screen name="HotelReservation" component={HotelReservation} options={{ headerShown: true }} />
      </Stack.Navigator>
  );
}
