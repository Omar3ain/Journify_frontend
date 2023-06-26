// import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button } from '@react-native-material/core';

export default function InBoardingThree({ navigation }) {

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/4012176.png')}
        style={styles.imageStyle}
      />
      <Text style={styles.heading}>Enjoy your trip with us</Text>
      <Text style={styles.text}>Hope you a safe and smooth trip. Enjoy an amazing vacation thats fulfills your mind and soul.</Text>
      <Button
        style={styles.buttonStyle}
        title="Next"
        color='#2cb8e5'
        titleStyle={{
          color: '#fff', 
        }}
        onPress={() => navigation.navigate('Logo')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2cb8e5',
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  imageStyle: {
    width: 250,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonStyle: {
    width: '90%',
  }
});