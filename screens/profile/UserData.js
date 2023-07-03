import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


export default function UserData({ navigation }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>First Name:</Text>
          <Text style={styles.userDataValue}>{user?.user.first_name}</Text>
        </View>
        
        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Last Name:</Text>
          <Text style={styles.userDataValue}>{user?.user.last_name}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Email:</Text>
          <Text style={styles.userDataValue}>{user?.user.email}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Username:</Text>
          <Text style={styles.userDataValue}>{user?.user.username}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Date of Birth:</Text>
          <Text style={styles.userDataValue}>{user?.user.dob}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Gender:</Text>
          <Text style={styles.userDataValue}>{user?.user.gender}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Zipcode:</Text>
          <Text style={styles.userDataValue}>{user?.user.zip_code}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Country:</Text>
          <Text style={styles.userDataValue}>{user?.user.country}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>City:</Text>
          <Text style={styles.userDataValue}>{user?.user.city}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Street Name:</Text>
          <Text style={styles.userDataValue}>{user?.user.street_name}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Building No:</Text>
          <Text style={styles.userDataValue}>{user?.user.building_no}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Phone:</Text>
          <Text style={styles.userDataValue}>{user?.user.phone}</Text>
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
    flex: 1,
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