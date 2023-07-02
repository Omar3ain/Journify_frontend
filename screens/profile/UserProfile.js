import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/reducers/auth/authSlice';
import { Icon } from "@react-native-material/core";


export default function UserProfile({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    return navigation.navigate('Auth');
  };

  const { user } = useSelector((state) => state.auth);
  
  
  const imageUrl = 'http://127.0.0.1:8000' + user?.user.image;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Image style={styles.avatar} source={{ uri: imageUrl }} />
      <Text style={styles.name}>{user?.user.first_name} {user?.user.last_name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('User Data')}
      >
        <View style={styles.right}>
          <View style={styles.beforeTitle}>
            <Icon name="account-outline" size={28} color="#28aad2"/>
          </View>
          <Text style={styles.buttonText}>Profile info</Text>
        </View>
        <Icon name="chevron-right" size={28} color="grey"/>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('User Update')}
      >
        <View style={styles.right}>
          <View style={styles.beforeTitle}>
            <Icon name="account-edit" size={28} color="#28aad2"/>
          </View>
          <Text style={styles.buttonText}>Update Profile</Text>
        </View>
        <Icon name="chevron-right" size={28} color="grey"/>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Password Update')}
      >
        <View style={styles.right}>
          <View style={styles.beforeTitle}>
            <Icon name="account-key-outline" size={28} color="#28aad2"/>
          </View>
          <Text style={styles.buttonText}>Change Password</Text>
        </View>
        <Icon name="chevron-right" size={28} color="grey"/>
      </TouchableOpacity>
      
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <View style={styles.right}>
          <View style={styles.beforeTitle}>
            <Icon name="logout" size={28} color="#28aad2"/>
          </View>
          <Text style={styles.buttonText}>Logout</Text>
        </View>
        <Icon name="chevron-right" size={28} color="grey"/>
      </TouchableOpacity>
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
  
  },
  header:{
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: 'none',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonArrow: {
    fontSize: 20,
  },
  beforeTitle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7f8f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});