import React, { useEffect } from 'react';
import Logo from '../components/Logo';
import { StyleSheet, View } from 'react-native';

export default function InitialScreen({ navigation }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('In boarding one');
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Logo width={300} height={250} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});