import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPlans } from '../../../services/reducers/Expert_Advice/JourneyPlans/JourneyPlans';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from './Style';
import Loader from '../../../components/Loader';
import { Icon } from "@react-native-material/core";
import { ScrollView } from 'react-native-gesture-handler';

const JourneyPlan = () => {
  const dispatch = useDispatch();
  const { plans, count, status, error } = useSelector((state) => state.journeyPlans);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpansion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const checkAndFetchPlans = async () => {
      try {
        const storedPlans = await AsyncStorage.getItem('plans');

        if (storedPlans) {
          const parsedPlans = JSON.parse(storedPlans);
          dispatch({ type: 'allPlans/fetchPlans/fulfilled', payload: parsedPlans });
        } else {
          dispatch(fetchPlans());
        }
      } catch (error) {
        console.log('Error while retrieving plans from AsyncStorage:', error);
      }
    };

    checkAndFetchPlans();
  }, []);

  if (status === 'loading') {
    return <View style={styles.container}><Loader/></View>;
  }

  if (status === 'failed') {
    return <View style={styles.container_error}>
    <Text style={{textAlign: 'center'}}>Something went wrong, please try again later!</Text>
    
    </View>;
  }
  return (
    <ScrollView style={{backgroundColor: "#fff"}}>
    <View style={styles.container}>
      {(!Array.isArray(plans.plan) || plans.plan.length === 0) && <View style={styles.container_error}>
        <Text style={{textAlign: 'center', color: '#666'}}>Plans not found!</Text>
      </View>}

      {plans.plan && <Text style={styles.header}>We have created customized plans for your recent reservation in <Text style={{color: '#2cb8e5', fontWeight: 'bold'}}>{plans.key && (plans.key.split("-")[1].split(",")[0])}</Text>. Enjoy your vacation!</Text>}
       {plans.plan &&
        plans.plan.map((plan, index) => (
          <View key={plan.day + Date.now().toString()}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => toggleExpansion(index)}
          >
            <View style={styles.right}>
              <View style={styles.beforeTitle}>
                  <Icon
                    name="chart-timeline-variant-shimmer"
                    size={28}
                    color="#28aad2"
                  />
              </View>
              <Text style={styles.buttonText}>Day ({index + 1})</Text>
            </View>
            {expandedIndex === index ? (
                  <Icon name="chevron-down" size={28} color="grey" />
                ) : (
                  <Icon name="chevron-right" size={28} color="grey" />
                )}
           
          </TouchableOpacity>

          {expandedIndex === index && (
            <View style={styles.subtextContainer}>
              <Text style={[styles.subtext, {flexBasis: '100%'}]}>Activities: </Text>
              {plan.activities.map((activity, index) => (
  <Text key={`${index}-${activity.time}`} style={{ flexBasis: '100%', margin: 10 }}>
    At {activity.time} --- {activity.description}
  </Text>
))}
            </View>
          )}
        </View>
      ))} 
    </View>
    </ScrollView>
  );
};

export default JourneyPlan;
