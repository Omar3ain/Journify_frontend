import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, Button, Picker, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../services/reducers/auth/authSlice';

export default function UserUpdate({ navigation }) {
  const { user: { user } } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [dob, setDob] = useState(user.dob);
  const [gender, setGender] = useState(user.gender);
  const [zip_code, setZipcode] = useState(user.zip_code);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [streetName, setStreetName] = useState(user.street_name);
  const [buildingNo, setBuildingNo] = useState(user.building_no);
  const [phone, setPhone] = useState(user.phone);

  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setDob(user.dob);
    setGender(user.gender);
    setZipcode(user.zip_code);
    setCountry(user.country);
    setCity(user.city);
    setStreetName(user.street_name);
    setBuildingNo(user.building_no);
    setPhone(user.phone);
  }, [user]);

  const handleSubmit = () => {
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      dob,
      gender,
      zip_code,
      country,
      city,
      street_name: streetName,
      building_no: buildingNo,
      phone,
    };
    dispatch(updateUserInfo(updatedUser));
    return navigation.navigate('UserProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        <View style={styles.fieldData}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.userDataValue}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.userDataValue}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>Date of Birth:</Text>
          <TextInput
            style={styles.userDataValue}
            value={dob}
            onChangeText={setDob}
          />
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>Gender:</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Please choose value..." value="" />
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Female" value="F" />
          </Picker>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>Zipcode:</Text>
          <TextInput
            style={styles.userDataValue}
            value={zip_code}
            onChangeText={setZipcode}
          />
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>Country:</Text>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => setCountry(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Please choose value..." value="" />
            <Picker.Item label="Egypt" value="EG" />
          </Picker>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>City:</Text>
          <TextInput
            style={styles.userDataValue}
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>Street Name:</Text>
          <TextInput
            style={styles.userDataValue}
            value={streetName}
            onChangeText={setStreetName}
          />
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>Building No:</Text>
          <TextInput
            style={styles.userDataValue}
            value={buildingNo}
            onChangeText={setBuildingNo}
          />
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={styles.userDataValue}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.createAccountButtonText}>Update</Text>
        </TouchableOpacity>
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
  fieldData: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userDataContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    width: '30%',
  },
  userDataValue: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  pickerItem: {
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor:'#2cb8e5',
    borderRadius: 5
  },
  createAccountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
