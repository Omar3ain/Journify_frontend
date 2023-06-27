import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {styles} from './Style'
const ExpertMain = () => {
  const planeAnimation = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();

  useEffect(() => {
    startPlaneAnimation();
  }, []);

  const startPlaneAnimation = () => {
    Animated.sequence([
      Animated.timing(planeAnimation, {
        toValue: 230,
        duration: 9000,
        useNativeDriver: true,
      }),
      Animated.timing(planeAnimation, {
        toValue: -300,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      startPlaneAnimation(); // Repeat the animation once it completes
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Expert Advisor</Text>
      </View>
        <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Logo')}>
            <View style={styles.icon}>
                <Image source={require('../../../assets/Expert_Advice/3959402.jpg')} style={styles.iconImage} />
                <Text style={styles.iconText}>Journy Plans</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Recommendations')}>
            <View style={[styles.icon, { marginLeft: 35 }]}>
            <Image source={require('../../../assets/Expert_Advice/3457522.jpg')} style={styles.iconImage} />
            <Text style={styles.iconText}>Place Suggestions</Text>
            </View>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.animated, { transform: [{ translateX: planeAnimation }] }]}>
            <Icon name="plane" size={30} color="#2cb8e5" />
    </Animated.View>
    </View>
  );
};


export default ExpertMain;
