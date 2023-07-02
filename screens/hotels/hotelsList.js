import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import {styles} from './Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HotelList = () => {
    const navigation = useNavigation();

    const navigateToOtherPage = (itemId) => {
        console.log('itemId:', itemId);
      navigation.navigate('HotelDetails', { hotelId: itemId });
    };

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/hotel');
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const renderHotelItem = ({ item }) => (
    
        <View style={styles.card}>
              <Image source={require('../../assets/Expert_Advice/3959402.jpg')} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
            <View style={styles.info}>
                  <View>
                  <Text style={styles.text}><Icon2 name="location-pin" size={16} color="#666" /> {item.countryId} </Text>
                  {/* <Text style={styles.text}><Icon2 name="location-pin" size={16} color="#666" /> City: {item.city}</Text> */}
                  </View>
                  <Text style={styles.text}><Icon name="city" size={16} color="#666" /> Price: {item.room_price}$</Text>
                  <Text style={styles.text}>Available Rooms: {item.available_rooms}</Text>
                  <Text style={styles.text}>rate: {item.avg_rating}</Text>
            </View>
                <View >
                  <TouchableOpacity
                     style={styles.button}
                     onPress={() => navigateToOtherPage(item.id)}><Text style={{color:'white'}}>Show Details</Text></TouchableOpacity>
                </View>
                {/* <View style={styles.info}>
                  <Text style={styles.text}>
                    <Icon name="star" size={16} color="#666" /> {convertRating(place.rate).toFixed(1)}/5.0</Text>
                </View> */}
              </View>
        </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotels</Text>
      <FlatList
        data={hotels}
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HotelList;
