import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllRecs } from '../../../../services/reducers/Expert_Advice/Recommendations/RecommendationSlice';
import { View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import {styles} from './Style'
import Loader from '../../../../components/Loader'
const MadeForYou = ({ places, count, status, error, fetchAllRecs }) => {
  useEffect(() => {
    fetchAllRecs();
  }, [fetchAllRecs]);

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

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
  return (
    <View style={styles.container}>
      {places.map((place) => {
          if(place.image && place.name){
            return <View key={place.xid} style={styles.card}>
              <Image source={place.preview.source} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{place.name}</Text>
                <View style={styles.info}>
                  <Text style={styles.text}><Icon2 name="location-pin" size={16} color="#666" /> {place.address.country}</Text>
                  <Text style={styles.text}><Icon name="city" size={16} color="#666" /> {place.address.state}</Text>
                  <Text style={styles.text}></Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.text}>
                    <Icon name="star" size={16} color="#666" /> {convertRating(place.rate).toFixed(1)}/5.0</Text>
                </View>
              </View>
            </View>
          }
        })}
    </View>
  );
};



const mapStateToProps = (state) => ({
  places: state.recommendations.places,
  count: state.recommendations.count,
  status: state.recommendations.status,
  error: state.recommendations.error,
});

const mapDispatchToProps = { fetchAllRecs };

export default connect(mapStateToProps, mapDispatchToProps)(MadeForYou);
