import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
  