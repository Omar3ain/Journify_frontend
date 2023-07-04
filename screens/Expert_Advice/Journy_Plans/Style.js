import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container_error: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  header:{
    fontSize: 16,
    marginVertical: 20,
    paddingHorizontal:10,
    textAlign: 'center',
    color: '#666',
    fontFamily: 'monospace',
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
  subtextContainer:{
    // flexDirection: '',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 10,
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