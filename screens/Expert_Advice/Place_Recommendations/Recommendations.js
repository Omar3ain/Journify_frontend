import React, { useRef, useEffect } from 'react';
import { View, Text,TouchableOpacity, Image, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {styles} from './Style'
const Recommendations = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Discover the top-rated nearby locations that come highly recommended and are in close proximity to your current stay</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.firstButton]}  onPress={() => navigation.navigate('MadeForYou')}>
        <Text style={styles.buttonText}>Made for you</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondButton]}  onPress={() => navigation.navigate('Custom')}>
        <Text style={[styles.buttonText, styles.secondButtonText]}>Custom</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};


export default Recommendations;
