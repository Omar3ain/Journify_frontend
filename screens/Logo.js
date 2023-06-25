import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Logo() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('InBoarding');
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-no-background.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});