import React, { useRef, useEffect } from 'react';
import { View, Text,TouchableOpacity, Image, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {styles} from './Style'
const Recommendations = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Discover the top-rated nearby locations that come highly recommended and are in close proximity to your hotel</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.firstButton]}  onPress={() => console.log('Button 1 pressed')}>
        <Text style={styles.buttonText}>Made for you</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondButton]}  onPress={() => console.log('Button 2 pressed')}>
        <Text style={[styles.buttonText, styles.secondButtonText]}>Custom</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};


export default Recommendations;