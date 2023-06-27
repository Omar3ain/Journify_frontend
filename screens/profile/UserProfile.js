import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

export default function UserProfile({ navigation }) {

  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <View style={styles.container}>
    </View>
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
  }
});