import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {styles} from './Style'
import { getUserReservations } from "../../../services/reducers/Hotels/HotelReservation";
import { useDispatch, useSelector } from 'react-redux';
import Toast from "react-native-toast-message";

const ExpertMain = () => {
  const planeAnimation = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { hotelReserv, isSuccess} = useSelector(
    (state) => state.hotelsReservations
  );
  useEffect(() => {
    startPlaneAnimation();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserReservations());
      if(isSuccess && hotelReserv.length > 0){
      }
    }, [dispatch])
  );
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



//Handle Navigate
const handleJournyPress = () => {
  if (isSuccess && hotelReserv.results.length <= 0) {
    Toast.show({
      type: "info",
      text1: "Info",
      text2: "You need to make hotel reservation first",
    });
  } else {
    // Perform the desired action when the condition is false
    navigation.navigate('JournyPlan');
  }
};


const handleRecommendationsPress = () => {
  if (isSuccess && hotelReserv.results.length <= 0) {
    Toast.show({
      type: "info",
      text1: "Info",
      text2: "You need to make hotel reservation first",
    });
  } else {
    // Perform the desired action when the condition is false
    navigation.navigate('Recommendations');
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Expert Advisor</Text>
      </View>
        <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleJournyPress}>
            <View style={styles.icon}>
                <Image source={require('../../../assets/Expert_Advice/3959402.jpg')} style={styles.iconImage} />
                <Text style={styles.iconText}>Journey Plans</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRecommendationsPress}>
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
