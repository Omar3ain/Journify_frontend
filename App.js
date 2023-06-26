import Main from './Main';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message'
import store from './services/store';

export default function App() {
  return (
    <Provider store={store}>
      <Main/>
      <Toast />
    </Provider>
  );
}

