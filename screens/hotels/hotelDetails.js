import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, FlatList, Alert, StyleSheet } from 'react-native';
import { styles } from './Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { createHotelReview } from '../../services/reducers/Hotels/Reviews';

const HotelDetails = ({ route }) => {

  const navigation = useNavigation();

  const { hotelId } = route.params;
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState('');
  const [titleError, setTitleError] = useState('');
  const [commentError, setCommentError] = useState('');
  // const [user, setUser] = useState('');
  const dispatch = useDispatch();

  // const deleteReview = async (reviewId) => {
  //   try {
  //     // Make an API request to delete the review with the specified reviewId
  //     const response = await fetch(`http://127.0.0.1:8000/hotel-review/delete/${reviewId}`, {
  //       method: 'DELETE',
  //     });
      
  //     if (response.ok) {
  //       // Remove the deleted review from the reviews array
  //       const updatedReviews = reviews.filter((review) => review.id !== reviewId);
  //       setReviews(updatedReviews);
  //     } else {
  //       Alert.alert('Error', 'Unable to delete review. Please try again later.');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'Unable to delete review. Please try again later.');
  //   }
  // };

  const navigateToOtherPage = (itemId) => {
    console.log('itemId:', hotelId);
  navigation.navigate('HotelReservation', { hotelId: hotelId });
};

    useEffect(()=>{
      const fetchHotelsReviews = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/hotel-review/${hotelId}`);
          const data = await response.json();
          setReviews(data);
        } catch (error) {
          console.error('Error fetching hotelsReviews:', error);
        }
      };
  
      fetchHotelsReviews();
    },[])

  const addReview = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    console.log(reviews);

    if (reviewTitle.length < 3 || reviewTitle.length > 100) {
      setTitleError('Title must be between 3 and 100 characters long');
      return;
    } else {
      setTitleError('');
    }
    if (reviewComment.length < 3 || reviewComment.length > 100) {
      setCommentError('Comment must be between 3 and 100 characters long');
      return;
    } else {
      setCommentError('');
    }

    try {
      await dispatch(createHotelReview({
        user: user.id,
        hotel: hotelId,
        title: reviewTitle,
        comment: reviewComment,
        rating: reviewRating
      }))
      
      // if (response.ok) {
        const newReviewItem = {
          id: Date.now(),
          user: user.id, 
          hotel: hotelId,
          title: reviewTitle,
          comment: reviewComment,
          rating: reviewRating,
        };
        setReviews([...reviews, newReviewItem]);
        // setReviews(data);
        setReviewTitle('');
        setReviewComment('');
        setReviewRating('');
        setUser('')
      // } else {
      //   Alert.alert('Error', 'Unable to add review. Please try again later.');
      // }
    } catch (error) {
      Alert.alert('Error', 'Unable to add review. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/hotel/${hotelId}`);
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error('Error fetching hotel:', error);
      }
    };
    
    fetchHotelDetails();
  }, [hotelId]);

  if (!hotel) {
    return <Loader />;
  }

  const renderReview = ({ item }) => {
    return (
      <View style={{backgroundColor: '#eee', borderColor: 'black', borderStyle: 'solid', borderWidth: 3, borderRadius: 5, marginTop: 4}}>
        {/* <Text>User: {item.user}</Text> */}
        <Text style={{ fontWeight: 'bold' }}> {item.title}</Text> 
        <Text> {item.comment}</Text>
        <Text> {item.rating}</Text>
        {/* <TouchableOpacity onPress={() => deleteReview(item.id)}>
        <Text>Delete</Text>
      </TouchableOpacity> */}
        
      </View>
    );
  };

  const increaseRating = () => {
    setReviewRating(prevRating => Math.min(prevRating + 1, 5));
  };

  const decreaseRating = () => {
    setReviewRating(prevRating => Math.max(prevRating - 1, 0));
  };
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Expert_Advice/3959402.jpg')} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.desc}>{hotel.description}</Text>
        <View style={styles.info}>
          <Text style={styles.text}>
            <Icon2 name="location-pin" size={16} color="#666" /> Country: {hotel.countryId}
          </Text>
          <Text style={styles.text}>
            <Icon name="city" size={16} color="#666" /> Price: {hotel.room_price}
          </Text>
          <Text style={styles.text}>Available Rooms: {hotel.available_rooms}</Text>
        </View>
        <Text>Rate: {hotel.avg_rating}</Text>
        <TouchableOpacity
                     style={styles.button}
                     onPress={() => navigateToOtherPage()}><Text style={{color:'white'}}>Book Now</Text></TouchableOpacity>
        







      <View style={styless.dividerContainer}>
        
          <View style={styless.divider} />
          <Text style={styless.dividerText}>Reviews</Text>
      <View style={styless.divider} />
        </View>
        <Text>{reviews.title}</Text>
        <TextInput
          style={{ ...styless.numberInput }}
          placeholder="Title"
          value={reviewTitle}
          onChangeText={setReviewTitle}
        />
        {titleError ? <Text style={styless.error}>{titleError}</Text> : null}
        <TextInput
          style={{ ...styless.numberInput }}
          placeholder="Comment"
          value={reviewComment}
          onChangeText={setReviewComment}
        />
        {commentError ? (
          <Text style={styless.error}>{commentError}</Text>
        ) : null}
        <View>
                <View style={styless.inputWrapper}>
                  <TouchableOpacity
                    onPress={increaseRating}
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
                    placeholder='Rate'
                    keyboardType="numeric"
                    maxLength={15}
                    onChangeText={setReviewRating}
                    value={reviewRating.toString()}
                    disabled
                  />
                  <TouchableOpacity
                    onPress={decreaseRating}
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
        
      </View>
        <TouchableOpacity style={styles.bookbutton} onPress={addReview} disabled={!reviewTitle || !reviewComment || !reviewRating}>
          <Text style={styles.buttonText}>Add Review</Text>
        </TouchableOpacity>
        <View>
          <View>
        <View style={styless.inputContainer}>
            <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id.toString()}
        />
         </View>
          </View>
        </View>
        
      </View>







        
  );
};

export default HotelDetails;


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