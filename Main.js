import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from './screens/Logo';
import ExpertMain from './screens/Expert_Advice/Main/Main'
const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="ExpertMain">
        <Stack.Screen name="Logo" component={Logo} options={{ headerShown: false }} />
        {/* <Stack.Screen name="In boarding" component={Logo} options={{ headerShown: false }} /> */}

        {/* Expert Advice Screens */}
        <Stack.Screen name="ExpertMain" component={ExpertMain} options={{ headerShown: false, title: 'Expert Advisor' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
