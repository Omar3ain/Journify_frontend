
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TextInput, FlatList, Alert } from 'react-native';
// import { styles } from './Style';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import Icon2 from 'react-native-vector-icons/Entypo';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Loader from '../../components/Loader'
// import { log } from 'react-native-reanimated';

// const HotelDetails = ({ route }) => {
//   const { hotelId } = route.params;
//   const [hotel, setHotel] = useState(null);
//   const [newReview, setNewReview] = useState([]);
//   const [reviewText, setReviewText] = useState('');
//   // const [revDetails, setRevDetails] = useState('');

//   const addReview = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/hotel-review/create/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text: reviewText }),
//       });
//       const newReviewItem = { id: Date.now(), text: reviewText };
//       setNewReview([...newReview, newReviewItem]);
//       setNewReview(data);
//       setReviewText('');

//     } catch (error) {
//       Alert.alert('Error', 'Unable to add review. Please try again later.');
//     }


//       };

//   useEffect(() => {
//     const fetchHotelDetails = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/hotel/${hotelId}`);
//         const data = await response.json();
//         setHotel(data);
//         // setNewReview('');
//       } catch (error) {
//         console.error('Error fetching hotels:', error);
//       }
//     };

//     fetchHotelDetails();
//   }, [hotelId]);

//   if (!hotel) {
//     return <Loader></Loader>;
//   }

//   const render = ({ item }) => {
//       return <textarea newReview={item} />;
//       };
//       const renderReview = ({ item }) => {
//         return <Text>{item.name}</Text>;
//       };
//   return (
//     <View style={styles.container}>
//       {/* <Image source={{ uri: hotel.image }} style={styles.image} /> */}
//       <Image source={require('../../assets/Expert_Advice/3959402.jpg')} style={styles.image} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{hotel.name}</Text>
//         <Text style={styles.desc}>{hotel.description}</Text>
//         <View style={styles.info}>
//           <Text style={styles.text}>
//             <Icon2 name="location-pin" size={16} color="#666" /> Country: {hotel.countryId}
//           </Text>
//           <Text style={styles.text}>
//             <Icon name="city" size={16} color="#666" /> Price: {hotel.room_price}
//           </Text>
//           <Text style={styles.text}>Available Rooms: {hotel.available_rooms}</Text>
//         </View>
//         <Text>Rate: {hotel.avg_rating}</Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Book Now</Text>
//         </TouchableOpacity>
//         <Text>Add Review:</Text>
//         <TextInput style={{borderWidth: 2, borderColor:'black', borderStyle: 'solid', height: 50}} placeholder='Add Your review here...'  value={reviewText} onChangeText={setReviewText} />
//         <Text>{newReview.user}</Text>
//         <Text>hiii</Text>
//         <TouchableOpacity style={styles.button} onPress={addReview}>
//           <Text style={styles.buttonText}>Add Review</Text>
//         </TouchableOpacity>
//         <Text>Reviews: </Text>
//         <textarea disabled value={hotel.reviews}></textarea>
//         {/* <FlatList data={newReview} renderItem={render} /> */}
//         {/* {newReview && newReview.map(review => <Text 
//             key={review.id}
//              >
//               {todo.newReview}
//             </Text>)} */}
//             <FlatList
//         data={newReview}
//         renderItem={({ item }) => <textarea disabled>{item.text}</textarea>}
//         keyExtractor={(item) => item.id.toString()}
//       />
//       </View>
//     </View>
//   );
// };

// export default HotelDetails;








import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, FlatList, Alert } from 'react-native';
import { styles } from './Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';

const HotelDetails = ({ route }) => {
  const { hotelId } = route.params;
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState('');
  const [user, setUser] = useState('');

  const addReview = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/hotel-review/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user, 
          hotel: hotelId,
          title: reviewTitle,
          comment: reviewComment,
          rating: reviewRating,
        }),
      });

      if (response.ok) {
        const newReviewItem = {
          id: Date.now(),
          user: user, 
          hotel: hotelId,
          title: reviewTitle,
          comment: reviewComment,
          rating: reviewRating,
        };
        setReviews([...reviews, newReviewItem]);
        setReviewTitle('');
        setReviewComment('');
        setReviewRating('');
      } else {
        Alert.alert('Error', 'Unable to add review. Please try again later.');
      }
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
      <View>
        <Text>User: {item.user}</Text>
        <Text>Title: {item.title}</Text>
        <Text>Comment: {item.comment}</Text>
        <Text>Rating: {item.rating}</Text>
      </View>
    );
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
        <Text>Add Review:</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={reviewTitle}
          onChangeText={setReviewTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Comment"
          value={reviewComment}
          onChangeText={setReviewComment}
        />
        <TextInput
          style={styles.input}
          placeholder="Rating"
          value={reviewRating}
          onChangeText={setReviewRating}
        />
        <TouchableOpacity style={styles.button} onPress={addReview}>
          <Text style={styles.buttonText}>Add Review</Text>
        </TouchableOpacity>
        <Text>Reviews: </Text>
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default HotelDetails;
