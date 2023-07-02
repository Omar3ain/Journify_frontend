import { createStackNavigator } from '@react-navigation/stack';
import Countries from '../screens/Home/Countries';
import HomeScreen from '../screens/Home/HomeScreen';

const Stack = createStackNavigator();

export default function Home({ navigation }) {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Countries" component={Countries} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}
