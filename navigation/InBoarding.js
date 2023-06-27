import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from '../screens/InitialScreen';
import InBoardingOne from '../screens/inBoarding/InBoardingOne';
import InBoardingTwo from '../screens/inBoarding/inBoardingTwo';
import InBoardingThree from '../screens/inBoarding/inBoardingThree';


const Stack = createStackNavigator();

export default function InBoarding() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding one" component={InBoardingOne} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding two" component={InBoardingTwo} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding three" component={InBoardingThree} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}


