import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from '../screens/profile/UserProfile';
import UserData from '../screens/profile/UserData';
import UserUpdate from '../screens/profile/UserUpdate';
import ChangePassword from '../screens/profile/ChangePassword';


const Stack = createStackNavigator();

export default function Profile() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="User Data" component={UserData} />
        <Stack.Screen name="User Update" component={UserUpdate} />
        <Stack.Screen name="Password Update" component={ChangePassword} />
      </Stack.Navigator>
  );
}
