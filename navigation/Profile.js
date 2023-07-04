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
        <Stack.Screen name="Profile info" component={UserData} />
        <Stack.Screen name="Update Profile" component={UserUpdate} />
        <Stack.Screen name="Change Password" component={ChangePassword} />
      </Stack.Navigator>
  );
}
