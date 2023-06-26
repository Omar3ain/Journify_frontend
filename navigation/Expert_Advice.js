import { createStackNavigator } from '@react-navigation/stack';
import ExpertMain from '../screens/Expert_Advice/Main/Main'
import Recommendations from '../screens/Expert_Advice/Place_Recommendations/Recommendations'


const Stack = createStackNavigator();

export default function ExpertAdvice() {
  return (
      <Stack.Navigator>
            <Stack.Screen name="ExpertMain" component={ExpertMain} options={{ headerShown: false, title: 'Expert Advisor' }} />
            <Stack.Screen name="Recommendations" component={Recommendations} options={{ headerShown: true, title: 'Place Suggestions' }} />
      </Stack.Navigator>
  );
}   
