import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, FlatList, Alert, StyleSheet } from 'react-native';
import { styles } from './Style';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { createHotelReview } from '../../services/reducers/Hotels/Reviews';
import StarRating from './Ratings';
import { API_BASE_URL } from "../../baseUrl";
const URL = `${API_BASE_URL}`;
const HotelDetails = ({ route,  places, success, error, createHotelReview}) => {

  const handleRate = (rating) => {
    console.log('Selected rating:', rating);
    // You can perform any further logic with the selected rating here
  };
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
  navigation.navigate('HotelReservation', { hotelId: hotelId, roomPrice: hotel.room_price });
};

    useEffect(()=>{
      const fetchHotelsReviews = async () => {
        try {
          const response = await fetch(`${URL}hotel-review/${hotelId}`);
          const data = await response.json();
          setReviews(data);
        } catch (error) {
          console.error('Error fetching hotelsReviews:', error);
        }
      };
  
      fetchHotelsReviews();
    },[reviewRating, dispatch])

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
    const alreadyAdded = reviews.find((rev)=> user.id === rev.user)
    if(alreadyAdded){
      Alert.alert('Oops, You have already added one before');
      return;
    }
      dispatch(createHotelReview({
        user: user.id,
        hotel: hotelId,
        title: reviewTitle,
        comment: reviewComment,
        rating: reviewRating
      }))
      // if (response.ok) {
        // const newReviewItem = {
        //   id: Date.now(),
        //   user: user.id, 
        //   hotel: hotelId,
        //   title: reviewTitle,
        //   comment: reviewComment,
        //   rating: reviewRating,
        // };
        setReviews([...reviews, newReviewItem]);
        // setReviews(data);
        setReviewTitle('');
        setReviewComment('');
        setReviewRating('');
        setUser('')
      // } else {
      //   Alert.alert('Error', 'Unable to add review. Please try again later.');
      // }
  };
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`${URL}hotel/${hotelId}`);
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
        <Text style={{textDecorationLine: 'underline'}}>User Review:</Text>
        <Text style={{ fontWeight: 'bold', paddingTop: 10, paddingBottom: 10 }}> {item.title}</Text>
        <Text style={{paddingTop: 5, paddingBottom: 10}}> {item.comment}</Text>
        <Text style={{paddingTop: 5, paddingBottom: 10}}><Icon2 name="star" size={16} color="gold" /> {item.rating}</Text>

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

  <ScrollView>
    <View style={styles.container}>
      <Image source={{uri: hotel.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.desc}>{hotel.description}</Text>
        <View style={styles.info}>
          <Text style={styles.text}>
            <Icon2 name="location-pin" size={16} color="red" /> {hotel.city}, {hotel.countryId}
          </Text>
          <Text style={styles.text}>Available Rooms: {hotel.available_rooms}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>
            <Icon name="dollar-sign" size={16} color="#666" /> Price: {hotel.room_price}
          </Text>
        <Text><Icon2 name="star" size={16} color="gold" /> {hotel.avg_rating}</Text>
        </View>
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
        {/* <View>
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
                
              </View> */}
        
      <StarRating style={{margin: 'auto'}} defaultRating={0} starSize={24} onRate={setReviewRating} />
      </View>
      <View>
      {!reviewTitle || !reviewComment || !reviewRating ? <Text style={{color: 'red'}}>You have to fill all this fields</Text> : null}
    </View>
        <TouchableOpacity style={{...styles.bookbutton, backgroundColor: reviewTitle.length < 3 || reviewTitle.length && reviewComment.length < 3 || reviewComment.length > 100 > 100? "gray" : "#2cb8e5"}} onPress={addReview} disabled={!reviewTitle || !reviewComment || !reviewRating} >
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

      </ScrollView>





        
  );
};
const mapStateToProps = (state) => ({
  hotelReviews: state.hotels.hotelReviews,
  error: state.hotels.isError,
  success: state.hotels.isSuccess,

});

const mapDispatchToProps = { createHotelReview };

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetails);



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
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  numberInput: {
    width: "95%",
    height: 40,
    backgroundColor: "#e8e8e8",
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

