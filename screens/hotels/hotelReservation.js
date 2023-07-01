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
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { StyleSheet } from 'react-native-web';

const HotelReservation = () => {
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [startDate, setStartDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [hotelId, setHotelId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      const response = await axios.post('http://localhost:8000/stayreservation/', {
        numberOfRooms,
        startDate,
        numberOfDays,
        hotel: hotelId,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError('An error occurred while processing your request. Please try again later.');
    }

    setIsLoading(false);
  };

  return (
    <View>
      <Text>Number of Rooms:</Text>
      <TextInput style={styles.input}
        placeholder="Enter the number of Rooms"
        numeric
        keyboardType={'numeric'} value={numberOfRooms} onChangeText={(value) => setNumberOfRooms(value)} />

      <Text style={styles.label}>Start Date:</Text>
      <TextInput value={startDate} onChangeText={(value) => setStartDate(value)} />

      <Text>Number of Days:</Text>
      <TextInput
      style={styles.input} placeholder="Enter the number of Days"
      value={numberOfDays} onChangeText={(value) => setNumberOfDays(value)} />

      <Text>Hotel ID:</Text>
      <TextInput value={hotelId} onChangeText={(value) => setHotelId(value)} />

      {error ? <Text>{error}</Text> : null}

      <Button title="Make Reservation" onPress={handleSubmit} disabled={isLoading} />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      marginBottom: 20,
    },
    datePickerButton: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      marginBottom: 20,
      alignItems: 'center',
    },
    datePickerButtonText: {
      fontSize: 16,
      color: '#666',
    },
    submitButton: {
      backgroundColor: 'blue',
      paddingVertical: 12,
      borderRadius: 4,
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default HotelReservation;