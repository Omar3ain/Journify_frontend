import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


export default function UserData({ navigation }) {
  const { user : { user } } = useSelector((state) => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>First Name:</Text>
          <Text style={styles.userDataValue}>{user.first_name}</Text>
        </View>
        
        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Last Name:</Text>
          <Text style={styles.userDataValue}>{user.last_name}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Email:</Text>
          <Text style={styles.userDataValue}>{user.email}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Username:</Text>
          <Text style={styles.userDataValue}>{user.username}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Date of Birth:</Text>
          <Text style={styles.userDataValue}>{user.dob}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Gender:</Text>
          <Text style={styles.userDataValue}>{user.gender}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Zipcode:</Text>
          <Text style={styles.userDataValue}>{user.zip_code}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Country:</Text>
          <Text style={styles.userDataValue}>{user.country}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>City:</Text>
          <Text style={styles.userDataValue}>{user.city}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Street Name:</Text>
          <Text style={styles.userDataValue}>{user.street_name}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Building No:</Text>
          <Text style={styles.userDataValue}>{user.building_no}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Phone:</Text>
          <Text style={styles.userDataValue}>{user.phone}</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'column',
  },
  fieldData:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDataContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  userDataValue: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'normal',
    marginLeft: 10,
  },
});