import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllRecs } from '../../../../services/reducers/Expert_Advice/Recommendations/CustomRec';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import { styles } from './Style';
import Loader from '../../../../components/Loader';

const Custom = ({ places, count, status, error, fetchAllRecs }) => {
  const [radius, setRadius] = useState('');
  const [name, setName] = useState('');
  const [kinds, setKinds] = useState('');
  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  const handleNumberChange = (text) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    setRadius(numericValue);
  };
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
      <View style={styles.textFieldsContainer}>
        <TextInput maxLength={4} onChangeText={handleNumberChange} keyboardType="numeric" style={styles.textField} value={radius} placeholder="Radius" placeholderTextColor="#666"/>
        <TextInput maxLength={255} style={styles.textField} value={name} onChangeText={setName} placeholder="Place Name" placeholderTextColor="#666" />
      </View>
      <View style={styles.textFieldsContainer}>
          <Picker
            style={styles.dropdown}
            selectedValue={kinds}
            onValueChange={(itemValue) => setKinds(itemValue)}
          >
            <Picker.Item label="Select Place Kind" value="" />
            <Picker.Item label="Cultural" value="cultural" />
            <Picker.Item label="Historic" value="historic" />
            <Picker.Item label="Beaches" value="beaches" />
            <Picker.Item label="Religion" value="religion" />
            <Picker.Item label="Natural" value="natural" />
            <Picker.Item label="Architecture" value="architecture" />


          </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => fetchAllRecs({radius, name, kinds})}>
        <Text style={styles.buttonText}>Get</Text>
      </TouchableOpacity>
      {places.map((place) => {
        if (place.image && place.name) {
          return (
            <View key={place.xid} style={styles.card}>
              <Image source={place.preview.source} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{place.name}</Text>
                <View style={styles.info}>
                  <Text style={styles.text}>
                    <Icon2 name="location-pin" size={16} color="#666" /> {place.address.country}
                  </Text>
                  <Text style={styles.text}>
                    <Icon name="city" size={16} color="#666" /> {place.address.state}
                  </Text>
                  <Text style={styles.text}></Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.text}>
                    <Icon name="star" size={16} color="#666" /> {convertRating(place.rate).toFixed(1)}/5.0
                  </Text>
                </View>
              </View>
            </View>
          );
        }
      })}
    </View>
  );
};

const mapStateToProps = (state) => ({
  places: state.customReducer.places,
  count: state.customReducer.count,
  status: state.customReducer.status,
  error: state.customReducer.error,
});

const mapDispatchToProps = { fetchAllRecs };

export default connect(mapStateToProps, mapDispatchToProps)(Custom);
