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
import Icon from 'react-native-vector-icons/FontAwesome5';


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

  return (
       <View style={styles.container}>  
     <Text style={styles.label}>Number of Rooms:</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter the number of Rooms"
        keyboardType="numeric"
        value={numberOfRooms}
        maxLength={2}
        onChangeText={setNumberOfRooms}
      /> */}
      <View>
                <View style={styless.inputWrapper}>
                  <TouchableOpacity
                    onPress={increaseNumber}
                  >
                    <Text>
                      <Icon
                        name="plus"
                        size={20}
                        
                      />
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    style={{ ...styless.numberInput }}
                    placeholder='Number of Rooms...'
                    keyboardType="numeric"
                    maxLength={15}
                    onChangeText={setNumberOfRooms}
                    value={numberOfRooms.toString()}
                    disabled
                  />
                  <TouchableOpacity
                    onPress={decreaseNumber}
                  >
                    <Text>
                      <Icon
                        name="minus"
                        size={20}
                        
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
                
              </View>

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
      {/* <TextInput
        style={styles.input}
        placeholder="Enter the number of Days"
        keyboardType="numeric"
        value={numberOfDays}
        maxLength={2}
        onChangeText={setNumberOfDays}
      /> */}
      <View>
                <View style={styless.inputWrapper}>
                  <TouchableOpacity
                    onPress={increaseNumberDays}
                  >
                    <Text>
                      <Icon
                        name="plus"
                        size={20}
                        
                      />
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    style={{ ...styless.numberInput }}
                    placeholder='Number of Days...'
                    keyboardType="numeric"
                    maxLength={15}
                    onChangeText={setNumberOfDays}
                    value={numberOfDays.toString()}
                    disabled
                  />
                  <TouchableOpacity
                    onPress={decreaseNumberDays}
                  >
                    <Text>
                      <Icon
                        name="minus"
                        size={20}
                        
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
                
              </View>

      <Text style={styles.label}>Number of People:</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter the number of People"
        keyboardType="numeric"
        value={numberOfPeople}
        maxLength={3}
        onChangeText={setNumberOfPeople}
      /> */}

<View>
                <View style={styless.inputWrapper}>
                  <TouchableOpacity
                    onPress={increaseNumberPeople}
                  >
                    <Text>
                      <Icon
                        name="plus"
                        size={20}
                        
                      />
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    style={{ ...styless.numberInput }}
                    placeholder='Number of People...'
                    keyboardType="numeric"
                    maxLength={15}
                    onChangeText={setNumberOfPeople}
                    value={numberOfPeople.toString()}
                    disabled
                  />
                  <TouchableOpacity
                    onPress={decreaseNumberPeople}
                  >
                    <Text>
                      <Icon
                        name="minus"
                        size={20}
                        
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
                
              </View>

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

      <Button title="Proceed" onPress={handleSubmit}  disabled={!numberOfDays || !numberOfPeople || !numberOfRooms}/>
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

const styless = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "column",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "column",
    marginBottom: 16,
    width: "100%",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#e8e8e8",
    border: "none",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  numberInput: {
    width: "95%",
    height: 40,
    backgroundColor: "#e8e8e8",
    border: "none",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 20,
  },
  label: {
    color: "#727171",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left",
  },
  button: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#2cb8e5",
    borderRadius: 5,
    margin: 20,
    textAlign: "center",
  },
  flighDateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 32,
  },
  divider: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#727171",
    width: 150,
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#727171",
    fontWeight: "bold",
  },

  mutedText: {
    color: "gray",
    fontWeight: "100",
  },
  flightsDates: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  fieldSet: {
    marginHorizontal: 10,
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#727171",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  legend: {
    position: "absolute",
    top: -10,
    left: 10,
    fontWeight: "bold",
    backgroundColor: "#FFFFFF",
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold'
  },
});

export default HotelReservation;