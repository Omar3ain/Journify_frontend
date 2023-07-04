import { View, Image, Text } from 'react-native';
import { styles } from './Styles';
import Loader from '../../components/Loader';
import { Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "../../baseUrl";

const URL = `${API_BASE_URL}`;

export default function PlaceInfo() {
  const route = useRoute();
  const { xid } = route.params;
  const [responseData, setResponseData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedXids = await AsyncStorage.getItem("xids");
        let xids = storedXids === null ? [] : storedXids;
        if (xids.length) {
          xids = JSON.parse(xids);
    
          let obj = xids.find((p) => p.xid === xid);
          if (obj) {
            setResponseData(obj["place"]);
            return;
          }
        }

        const response = await axios.get(`${URL}place/${xid}/`);

        let obj = xids.find((p) => p.xid === xid);
        if (!obj) {
          xids.push({ xid, place: response.data });
        }
        await AsyncStorage.setItem(
          "xids",
          JSON.stringify(xids)
        );
  
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [xid]);


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
        <Image source={{
          uri: responseData.preview
          ? responseData.preview.source
          : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
          }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{responseData.name}</Text>
  
          <View style={styles.info}>
            <Text style={styles.text}>Address:</Text>
            <View style={styles.addressFields}>
              <Text style={styles.text}>{responseData.address && responseData.address.city},</Text>
              <Text style={styles.text}>{responseData.address && responseData.address.state},</Text>
              <Text style={styles.text}>{responseData.address && responseData.address.country}</Text>
            </View>
          </View>
  
          <View style={styles.info}>
            <Text style={styles.text}>Rating:</Text>
            <View style={styles.addressFields}>
              <Text style={styles.text}>{convertRating(responseData.rate).toFixed(1)}/5.0</Text>
            </View>
          </View>
  
          <View style={styles.info}>
            <Text style={styles.text}>Extra Info:</Text>
            <View style={styles.extraInfoFields}>
              <Text style={styles.text}>{responseData.info && responseData.info.url}</Text>
              <Text style={styles.text}>{responseData.info && responseData.info.src}</Text>
            </View>
          </View>
  
          <View style={styles.info}>
            <Text style={styles.text}>Google Map:</Text>
            <Text style={styles.text}>
              <Text style={{color: 'blue'}} onPress={() => Linking.openURL(`https://maps.google.com/?q=${responseData.point.lat},${responseData.point.lon}`)}>
                Open Map
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  }  