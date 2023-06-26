import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from './screens/Logo';
import InBoardingOne from './screens/inBoarding/InBoardingOne';
import InBoardingTwo from './screens/inBoarding/inBoardingTwo';
import InBoardingThree from './screens/inBoarding/inBoardingThree';

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Logo" component={Logo} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding one" component={InBoardingOne} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding two" component={InBoardingTwo} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding three" component={InBoardingThree} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

