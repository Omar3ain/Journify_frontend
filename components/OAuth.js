// 476260552224-ap98kbabb8d5qs7e136rncb6t1ud4m1f.apps.googleusercontent.com
// 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
// IOS: 476260552224-n00g9fc8us5fukpq3lm7p1vq8oalsuae.apps.googleusercontent.com
// Android: 476260552224-8crsh0vvora0u1h7ku6ev6khb1hqvrji.apps.googleusercontent.com

import axios from 'axios';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image,TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { loginOAuth } from '../services/reducers/auth/authSlice';

WebBrowser.maybeCompleteAuthSession();

export default function OAuth() {
  const [token, setToken] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '396331414022-m38emov2m8nnuqsq1mcrisfpkn2h9qmk.apps.googleusercontent.com',
    iosClientId:'396331414022-6jbd35d3vl5lni57g18vm29ve7p5huv8.apps.googleusercontent.com',
    webClientId: '396331414022-p1lbfjevg6voe9j72lnnuj0sico7995d.apps.googleusercontent.com',
    expoClientId: "396331414022-rljj6f3a47tnunl654gg9unk7begmdj7.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess && user) {
      setTimeout(() => {
        navigation.navigate("App");
      }, 1000);
    }
    if (!user && !isSuccess) {
      navigation.navigate("auth");
    }
  }, [dispatch, user, isSuccess, isError]);

  async function handleEffect() {
    if (response?.type === "success") {
      const { authentication } = response;
      const { accessToken, idToken } = authentication;

      // Send token and email to backend
      const responsee = await axios.post(`http://127.0.0.1:8000/user/auth/convert-token`, {
        token: accessToken,
        backend: 'google-oauth2',
        grant_type: 'convert_token',
        client_id: 'OT2C5W6Ku7mTtNwsARl8Wjdin7MTlN1KhOtP2Ml0',
        client_secret: '7bT8UZAbrSLwAsunKtAvd5DiOzVn8IzhquP55EWIVtJwv34rZo7OLsuXoxJ7oFXCHuhG86Cb6hCDWEuqfqKoFMcplodBwpiqbWxSDAEV8qocitV0dPRrm7l32eBzWsdb',
      });

      const { access_token, refresh_token } = responsee.data;
      setToken(accessToken);
      dispatch(loginOAuth(access_token))
      
    }
}
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => promptAsync()} style={styles.button}>
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    button: {
    marginVertical: 5,
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 8,
      borderColor: '#666',
      borderWidth: 1,
    },
    buttonText: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

// const googleClientId = '476260552224-n36k1mbs3aa5ipm5v3qe63np3b6180aa.apps.googleusercontent.com';
// const drfClientId = 'GUBv9bMsYg9cQ7j7Ibo95ROKO4XJjPyQgXh9t00Q';
// const drfClientSecret = 'pbkdf2_sha256$600000$G5BcE5qoAIyFbHEgIOlUOM$0LcWVHOzSUW+G90hzkskAYJon5zBglsjYQ4i3O+rUWU=';
// const baseURL = 'http://localhost:8000';