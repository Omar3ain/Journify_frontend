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
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createHotelReserv } from '../../services/reducers/Hotels/HotelReservation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';

const HotelReservation = ({ route }) => {
  const { hotelId } = route.params;

  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('S');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch()
  const handleValidation = () => {
    setError('');

    
 

    
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
      console.log(startDate,numberOfRooms,numberOfDays,hotelId,selectedOption,numberOfPeople);
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

  const increaseNumber = () => {
    setNumberOfRooms(prevRating => Math.min(prevRating + 1, 10));
  };

  const decreaseNumber = () => {
    setNumberOfRooms(prevRating => Math.max(prevRating - 1, 1));
  };

  const increaseNumberDays = () => {
    setNumberOfDays(prevRating => Math.min(prevRating + 1, 10));
  };

  const decreaseNumberDays = () => {
    setNumberOfDays(prevRating => Math.max(prevRating - 1, 1));
  };

  const increaseNumberPeople = () => {
    setNumberOfPeople(prevRating => Math.min(prevRating + 1, 10));
  };

  const decreaseNumberPeople = () => {
    setNumberOfPeople(prevRating => Math.max(prevRating - 1, 1));
  };
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const today = new Date();
    if (today > currentDate) {
      setError('The start date must be today or later.');
      return false;
    }
    setShow(false);
    setStartDate(currentDate);
  };
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of Rooms:</Text>
          <View style={styles.numberInputContainer}>
            <TouchableOpacity onPress={decreaseNumber}>
              <Icon name="minus" size={20} color="#727171" />
            </TouchableOpacity>
            <TextInput
              style={styles.numberInput}
              placeholder="Number of Rooms..."
              keyboardType="numeric"
              maxLength={15}
              onChangeText={setNumberOfRooms}
              value={numberOfRooms.toString()}
              editable={false}
            />
            <TouchableOpacity onPress={increaseNumber}>
              <Icon name="plus" size={20} color="#727171" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of Days:</Text>
          <View style={styles.numberInputContainer}>
            <TouchableOpacity onPress={decreaseNumberDays}>
              <Icon name="minus" size={20} color="#727171" />
            </TouchableOpacity>
            <TextInput
              style={styles.numberInput}
              placeholder="Number of Days..."
              keyboardType="numeric"
              maxLength={15}
              onChangeText={setNumberOfDays}
              value={numberOfDays.toString()}
            />
            <TouchableOpacity onPress={increaseNumberDays}>
              <Icon name="plus" size={20} color="#727171" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of People:</Text>
          <View style={styles.numberInputContainer}>
            <TouchableOpacity onPress={decreaseNumberPeople}>
              <Icon name="minus" size={20} color="#727171" />
            </TouchableOpacity>
            <TextInput
              style={styles.numberInput}
              placeholder="Number of People..."
              keyboardType="numeric"
              maxLength={15}
              onChangeText={setNumberOfPeople}
              value={numberOfPeople.toString()}
            />
            <TouchableOpacity onPress={increaseNumberPeople}>
              <Icon name="plus" size={20} color="#727171" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Start Date:</Text>
          <Text>selected: {startDate.toLocaleString()}</Text>
          <Button onPress={showDatepicker} title="Select date" color="#2cb8e5" />
            {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Room Type:</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedOption}
            onValueChange={itemValue => setSelectedOption(itemValue)}
          >
            <Picker.Item label="Single" value="S" />
            <Picker.Item label="Double" value="D" />
          </Picker>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button title="Proceed" onPress={handleSubmit} disabled={!numberOfDays || !numberOfPeople || !numberOfRooms} />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
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
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#727171',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  numberInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: '#000'
  },
  dateInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#727171',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    marginTop: 5,
    marginBottom: 15,
    borderColor: '#727171',
    borderWidth: 1,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
export default HotelReservation;