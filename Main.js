import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import InBoardingOne from './screens/inBoarding/InBoardingOne';
import InBoardingTwo from './screens/inBoarding/inBoardingTwo';
import InBoardingThree from './screens/inBoarding/inBoardingThree';
import InitialScreen from './screens/InitialScreen';
import Auth from './navigation/Auth';
import ExpertAdvice from './navigation/Expert_Advice'

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding one" component={InBoardingOne} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding two" component={InBoardingTwo} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding three" component={InBoardingThree} options={{ headerShown: false }} />
        
        {/* Expert Advice Screens */}
        {/* <Stack.Screen name="ExpertAdvice" component={ExpertAdvice} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
