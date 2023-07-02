// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import axios from 'axios';

// const HotelReservation = () => {
//   const [numberOfRooms, setNumberOfRooms] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [numberOfDays, setNumberOfDays] = useState('');
//   const [hotelId, setHotelId] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:8000/stayreservation/', {
//         numberOfRooms,
//         startDate,
//         numberOfDays,
//         hotel: hotelId,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//       setError('An error occurred while processing your request. Please try again later.');
//     }

//     setIsLoading(false);
//   };

//   return (
//     <View>
//       <Text>Number of Rooms:</Text>
//       <TextInput value={numberOfRooms} onChangeText={(value) => setNumberOfRooms(value)} />

//       <Text>Start Date:</Text>
//       <TextInput value={startDate} onChangeText={(value) => setStartDate(value)} />

//       <Text>Number of Days:</Text>
//       <TextInput value={numberOfDays} onChangeText={(value) => setNumberOfDays(value)} />

//       <Text>Hotel ID:</Text>
//       <TextInput value={hotelId} onChangeText={(value) => setHotelId(value)} />

//       {error ? <Text>{error}</Text> : null}

//       <Button title="Make Reservation" onPress={handleSubmit} disabled={isLoading} />
//     </View>
//   );
// };

// export default HotelReservation;



 

import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createHotelReserv } from '../../services/reducers/Hotels/HotelReservation';
const HotelReservation = ({ route }) => {
  const { hotelId } = route.params;

  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [startDate, setStartDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('S');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch()
  const handleValidation = () => {
    setError('');

    
    const currentDate = new Date();
    const selectedDate = new Date(startDate);
    if (selectedDate < currentDate) {
      setError('The start date must be today or later.');
      return false;
    }

    
    const availableRooms = 10;
    if (numberOfRooms > availableRooms) {
      setError(`There are only ${availableRooms} rooms available.`);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    if (!handleValidation()) {
      setIsLoading(false);
      return;
    }

    try {
      dispatch(createHotelReserv({
        numberOfRooms,
        startDate,
        numberOfDays,
        hotel: hotelId,
        room_type: selectedOption,
        numberOfPeople: numberOfPeople

      }))

      // const response = await axios.post('http://localhost:8000/stayreservation/', {
      //   numberOfRooms,
      //   startDate,
      //   numberOfDays,
      //   hotel: hotelId,
      // });
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      setError('An error occurred while processing your request. Please try again later.');
    }

    setIsLoading(false);
  };


  return (
       <View style={styles.container}>
     <Text style={styles.label}>Number of Rooms:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the number of Rooms"
        keyboardType="numeric"
        value={numberOfRooms}
        maxLength={2}
        onChangeText={setNumberOfRooms}
      />

      {/* <Text style={styles.label}>Start Date:</Text>
      <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
        <Text>{startDate ? startDate : 'Select Date'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      /> */}

      <Text style={styles.label}>Number of Days:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the number of Days"
        keyboardType="numeric"
        value={numberOfDays}
        maxLength={2}
        onChangeText={setNumberOfDays}
      />

      <Text style={styles.label}>Number of People:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the number of People"
        keyboardType="numeric"
        value={numberOfPeople}
        maxLength={3}
        onChangeText={setNumberOfPeople}
      />

      <Text style={styles.label}>Room Type:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="Single" value="S" />
        <Picker.Item label="Double" value="D" />
      </Picker>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Proceed" onPress={handleSubmit} disabled={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberInputText: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    marginTop: 5,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default HotelReservation;