import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './navigation/Auth';
import ExpertAdvice from './navigation/Expert_Advice'
import Profile from './navigation/Profile';
import InBoarding from './navigation/InBoarding';

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="In boarding" component={InBoarding} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        {/* Expert Advice Screens */}
        {/* <Stack.Screen name="ExpertAdvice" component={ExpertAdvice} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
