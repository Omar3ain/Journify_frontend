// 476260552224-ap98kbabb8d5qs7e136rncb6t1ud4m1f.apps.googleusercontent.com
// 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
// IOS: 476260552224-n00g9fc8us5fukpq3lm7p1vq8oalsuae.apps.googleusercontent.com
// Android: 476260552224-8crsh0vvora0u1h7ku6ev6khb1hqvrji.apps.googleusercontent.com

import axios from 'axios';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image,TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { loginOAuth } from '../services/reducers/auth/authSlice';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { API_BASE_URL } from "../baseUrl";
const URL = `${API_BASE_URL}`;
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
      navigation.navigate("Auth");
    }
  }, [dispatch, user, isSuccess, isError]);

  async function handleEffect() {
    if (response?.type === "success") {
      const { authentication } = response;
      const { accessToken, idToken } = authentication;

      // Send token and email to backend
      const responsee = await axios.post(`${URL}user/auth/convert-token`, {
        token: accessToken,
        backend: 'google-oauth2',
        grant_type: 'convert_token',
        client_id: 'Q7YutXPhVaYYTQcpDcuwMsiybrVNzaMtRGewwYpE',
        client_secret: 'ZJ376GHB4JfDDI9rjrwwYrjKlvznBguiBDGANQ8DmJIYlT5r1eqyrn2wTgR0uWJdyRAo2kYHoYfy7VyYiK1yHReddjBIvelicOYeCOzTNdcfYHk79BwzgMienPbHlRed',
      });

      const { access_token, refresh_token } = responsee.data;
      setToken(accessToken);
      dispatch(loginOAuth(access_token))
      
    }
}
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => promptAsync()} style={styles.button}>
        <View style={styles.buttonContent}>
          <Image style={styles.image} source={require('../assets/google.png')} />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginTop: 8
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
});


// const googleClientId = '476260552224-n36k1mbs3aa5ipm5v3qe63np3b6180aa.apps.googleusercontent.com';
// const drfClientId = 'GUBv9bMsYg9cQ7j7Ibo95ROKO4XJjPyQgXh9t00Q';
// const drfClientSecret = 'pbkdf2_sha256$600000$G5BcE5qoAIyFbHEgIOlUOM$0LcWVHOzSUW+G90hzkskAYJon5zBglsjYQ4i3O+rUWU=';
// const baseURL = 'http://localhost:8000';