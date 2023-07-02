import { createStackNavigator } from '@react-navigation/stack';
import Countries from '../screens/home/Countries';
import HomeScreen from '../screens/home/Home';

const Stack = createStackNavigator();

export default function Home({ navigation }) {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Countries" component={Countries} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}
