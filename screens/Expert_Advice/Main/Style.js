import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      overflow: 'hidden'
    },
    headerContainer: {
      paddingTop: 50,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 100,
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    icon: {
      alignItems: 'center',
    },
    iconImage: {
      width: 150,
      height: 150,
      borderColor: '#eee',
      borderWidth: 3,
      borderRadius: 50,
      resizeMode: 'contain',
    },
    animated:{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
    },
    iconText: {
      marginTop: 10,
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'monospace',
      color: '#666'
    },
  });
  