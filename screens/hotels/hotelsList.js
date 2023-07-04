import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from './Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from "../../baseUrl";
const URL = `${API_BASE_URL}`;
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
        const response = await fetch(`${URL}hotel`);
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);
  const renderHotelItem = ({ item }) => (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigateToOtherPage(item.id)}>
        <View style={styles.card}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
            <View style={styles.info}>
                 
                  <Text style={styles.text}>Available Rooms: {item.available_rooms}</Text>
                  <Text style={styles.text}><Icon2 name="star" size={16} color="gold" /> {item.avg_rating}</Text>
            </View>
            <View style={styles.info}>
                  <Text style={styles.text}><Icon2 name="location-pin" size={16} color="red" /> {item.countryId} </Text>
                  {/* <Text style={styles.text}><Icon2 name="location-pin" size={16} color="#666" /> City: {item.city}</Text> */}
                  <Text style={styles.text}><Icon name="dollar-sign" size={16} color="#666" /> {item.room_price}</Text>
                  </View>
                {/* <View >
                  <TouchableOpacity
                     style={styles.button}
                     onPress={() => navigateToOtherPage(item.id)}><Text style={{color:'white'}}>Show Details</Text></TouchableOpacity>
                </View> */}
                
              </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hotels}
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HotelList;
