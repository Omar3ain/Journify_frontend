import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden'
      },
    text: {
        fontSize: 16,
        marginBottom: 20,
        paddingHorizontal:10,
        textAlign: 'center',
        color: '#666',
        fontFamily: 'monospace',
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        width: 200,
        height: 40,
        backgroundColor: '#2cb8e5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      },
    buttonText: {
        color: '#fff',
        fontSize: 16,
      },
    secondButton:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#2cb8e5'
    },
    secondButtonText:{
        color: '#000',
    }
  });
  