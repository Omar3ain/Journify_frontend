import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../services/reducers/auth/authSlice';
import PasswordInput from './PasswordInput';

export default function ChangePassword({ navigation }) {
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    const updatedPassword = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };
    dispatch(updatePassword(updatedPassword));
    return navigation.navigate('UserProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        <View style={styles.fieldData}>
          <Text style={styles.label}>Current Password:</Text>
          <PasswordInput value={currentPassword} onChangeText={setCurrentPassword} />
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>New Password:</Text>
          <PasswordInput value={newPassword} onChangeText={setNewPassword} />
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.label}>Confirm Password:</Text>
          <PasswordInput value={confirmPassword} onChangeText={setConfirmPassword} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.createAccountButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  },
  fieldData: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userDataContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    width: '30%',
  },
  button: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#2cb8e5',
    borderRadius: 5,
  },
  createAccountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});