import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Logo from '../../components/Logo';
import { Button } from '@react-native-material/core';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      navigation.navigate('Home');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={150} height={150}/>
      </View>
      <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your username..."
            placeholderTextColor="gray"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password..."
            placeholderTextColor="gray"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
        <Button
          style={styles.button}
          title="Log in"
          color='#2cb8e5'
          titleStyle={{
            color: '#fff', 
            textTransform: 'capitalize',
          }}
          onPress={handleLogin}
        />
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>
      <TouchableOpacity style={styles.createAccountButton}>
        <Text style={styles.createAccountButtonText}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'column',
    marginBottom: 16,
    width: '100%',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e8e8e8',
    border: 'none',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  label: {
    color: '#727171',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  button: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  divider: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#727171',
    width: 150,
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#727171',
    fontWeight: 'bold',
  },
  createAccountButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    width: '65%',
  },
  createAccountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});