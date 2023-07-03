
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import InBoarding from "./InBoarding";
import Auth from "./Auth";
import AppTabs from "./AppTabs";
import { fetchUser } from "../services/reducers/auth/authSlice";



const Stack = createStackNavigator();

export default function MainNavigator() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);


  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen name="InBoarding" component={InBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="App" component={AppTabs} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>

  );
}
