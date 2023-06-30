import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useDispatch, useSelector } from "react-redux";
import Logo from '../../components/Logo';
import { register } from '../../services/reducers/auth/authSlice';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Register({ navigation }) {
  const pickerRef = useRef();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [streetName, setStreetName] = useState('');
  const [buildingNo, setBuildingNo] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDob(currentDate);
  };
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

  const dispatch = useDispatch();
  const { isRegisterSuccess, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(isRegisterSuccess){
      navigation.navigate('Login');
    }
  }, [dispatch, isRegisterSuccess]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSignUp = () => {
    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, "0");
    const day = String(dob.getDate()).padStart(2, "0");

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      username: username,
      dob: `${year}-${month}-${day}`,
      gender: gender,
      zipcode: zipcode,
      country: country,
      city: city,
      street_name: streetName,
      building_no: buildingNo,
      phone: phone,
      image: image,
    };
    dispatch(register(data));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.logoContainer}>
        <Logo width={150} height={150}/>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name..."
              placeholderTextColor="gray"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name..."
              placeholderTextColor="gray"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email..."
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password..."
              placeholderTextColor="gray"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your username..."
              placeholderTextColor="gray"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.inputWrapper}>
          <Button onPress={showDatepicker} title="Select date" color="#2cb8e5" />
          <Text>selected: {dob.toLocaleString()}</Text>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={dob}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.inputWrapper}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Please choose value..." value="" />
              <Picker.Item label="Male" value="M"/>
              <Picker.Item label="Female" value="F" />
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Zipcode</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your zipcode..."
              placeholderTextColor="gray"
              value={zipcode}
              onChangeText={setZipcode}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country</Text>
          <View style={styles.inputWrapper}>
            <Picker
              selectedValue={country}
              onValueChange={(itemValue) => setCountry(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Please choose value..." value="" />
              <Picker.Item label="Egypt" value="EG" />
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <View style={styles.inputWrapper}>
          <Picker
            selectedValue={city}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              setCity(itemValue)
            }>
            <Picker.Item label="Please choose value..." value="" />
            <Picker.Item label="Cairo" value="cairo" />
          </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Street Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your street name..."
              placeholderTextColor="gray"
              value={streetName}
              onChangeText={setStreetName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Building Number</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your building number..."
              placeholderTextColor="gray"
              value={buildingNo}
              onChangeText={setBuildingNo}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number..."
              placeholderTextColor="gray"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Image</Text>
          <View style={styles.inputWrapper}>
            <TouchableOpacity onPress={pickImage}>
              { image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>Pick an image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View> */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.createAccountButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , marginTop: 20}}>
          <Text style={{ fontSize: 16 }}>Have an account?{' '}
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
        </ScrollView>
      </View>
);

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },
    formContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    inputContainer: {
      marginBottom: 16,
      width: '100%',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      flex: 1,
      height: 40,
      backgroundColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
    },
    label: {
      color: '#727171',
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'left',
    },
    button: {
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor:'#2cb8e5',
      borderRadius: 5
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 32,
      marginBottom: 32,
    },
    divider: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#727171',
      width: 150,
    },
    dividerText: {
      marginHorizontal: 8,
      color: '#727171',
      fontWeight: 'bold',
    },
    createAccountButton: {
      backgroundColor: '#4caf50',
      padding: 15,
      width: '65%',
    },
    createAccountButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });