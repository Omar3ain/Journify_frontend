import Main from './Main';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message'
import store from './services/store';
import { IconComponentProvider } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function App() {
  
  return (
    <Provider store={store}>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Main/>
        <Toast />
      </IconComponentProvider>
    </Provider>
  );
}

