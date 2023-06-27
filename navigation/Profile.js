import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from '../screens/profile/UserProfile';


const Stack = createStackNavigator();

export default function Profile() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}
