import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
        overflow: 'hidden'
      },
    container_error: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
        overflow: 'hidden'
      },
    button: {
        width: 200,
        height: 40,
        alignSelf:'center',
        backgroundColor: '#2cb8e5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      },
    buttonText: {
        color: '#fff',
        fontSize: 16,
      },
      textFieldsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
      },
      textField: {
        width: '48%', // Adjust the width as needed
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
      },
      dropdown: {
        width: '100%', // Adjust the width as needed
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#fff'
      },
      card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
      },
      image: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 10,
      },
      details: {
        flexDirection: 'column',
        padding: 10
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      info: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
      },
      text: {
        fontSize: 12,
        color: '#666666',
      },

  });
  