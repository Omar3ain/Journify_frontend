import { View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import { styles } from './Styles';
import Loader from '../../components/Loader';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PlaceInfo() {
  const route = useRoute();
  const { xid } = route.params;
  const [responseData, setResponseData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/place/${xid}/`);
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [xid]);

  console.log(responseData);
  // Rate Converting
  function convertRating(originalRating) {
    switch (originalRating) {
      case '1':
        return 1;
      case '2':
        return 3;
      case '3':
        return 4.5;
      case '1h':
        return 2;
      case '2h':
        return 4;
      case '3h':
        return 5;
      default:
        return 0;
    }
  }

  if (!responseData) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={responseData.preview.source} style={styles.image} />
        <View style={styles.details}>
      <Text style={styles.name}>{responseData.name}</Text>
  
    <View style={styles.info}>
      <Text style={styles.text}>
        Address:
      </Text>
      <View style={styles.addressFields}>
        <Text style={styles.text}>{responseData.address.city},</Text>
        <Text style={styles.text}>{responseData.address.state},</Text>
        <Text style={styles.text}>{responseData.address.country}</Text>

      </View>
    </View>

    <View style={styles.info}>
      <Text style={styles.text}>
      Rating:
      </Text>
      <View style={styles.addressFields}>
          <Text style={styles.text}>{convertRating(responseData.rate).toFixed(1)}/5.0</Text>
      </View>
    </View>
    
    <View style={styles.info}>
      <Text style={styles.text}>
         Extra Info:
      </Text>
      <View style={styles.extraInfoFields}>
        <Text style={styles.text}>{responseData.info.url}</Text>
        <Text style={styles.text}>{responseData.info.src}</Text>
      </View>
    </View>
    
    <View style={styles.info}>
      <Text style={styles.text}>
        Google Map:
      </Text>
      <Text style={styles.text}>
        <a href={`https://maps.google.com/?q=${responseData.point.lat},${responseData.point.lon}`}>Open Map</a>
      </Text>
    </View>
  </View>
      </View>
    </View>
  );
}
