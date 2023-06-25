// import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-native-material/core';

export default function InBoardingOne() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/4056364.png')}
        style={styles.imageStyle}
      />
      <Text style={styles.heading}>Plan a Trip</Text>
      <Text style={styles.text}>Plan a trip to your favorite location. Do a bit of online research to choose from the various beautiful locations.</Text>
      <Button
        style={styles.buttonStyle}
        title="Next"
        color='#2cb8e5'
        titleStyle={{
          color: '#fff', 
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
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