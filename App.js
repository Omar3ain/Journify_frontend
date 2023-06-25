import Main from './Main';
import { Provider } from 'react-redux';
import store from './services/store';

export default function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}
