import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from './screens/Logo';

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Logo">
        <Stack.Screen name="Logo" component={Logo} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding" component={Logo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
