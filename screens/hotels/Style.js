import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
        overflow: 'hidden'
      },
      card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 35,
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {width: 5 , height: 10}
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
        margin: 'auto',
        paddingBottom: 30,
      },
      info: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-around',
        // margin: 'auto'
      },
      text: {
        fontSize: 12,
        color: '#666666',
        // marginLeft: 30

      },
      desc: {
        margin: 'auto',
        paddingBottom: 30,
      },
      button: {
        marginTop: 30,
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black'
      },
      bookbutton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        width: '50%',
        marginBottom: 30,
      },

  });
  