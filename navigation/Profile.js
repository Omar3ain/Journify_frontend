import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from '../screens/profile/UserProfile';
import UserData from '../screens/profile/UserData';


const Stack = createStackNavigator();

export default function Profile() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="UserData" component={UserData} />
      </Stack.Navigator>
  );
}
