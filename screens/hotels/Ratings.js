import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({ defaultRating, starSize, onRate }) => {
  const [rating, setRating] = useState(defaultRating);

  const handleRate = (selectedRating) => {
    setRating(selectedRating);
    onRate(selectedRating);
  };

  const renderStars = () => {
    const stars = [];
    const maxRating = 5;

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={() => handleRate(i)}
        >
          <FontAwesome
            name={rating >= i ? 'star' : 'star-o'}
            size={starSize}
            color="#FFD700"
          />
        </TouchableOpacity>
      );
    }

    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 20
  },
});

export default StarRating;
