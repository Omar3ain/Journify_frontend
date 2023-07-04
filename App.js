import Main from "./Main";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import Toast from "react-native-toast-message";
import store from "./services/store";
import { IconComponentProvider } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const publishableKey ="pk_test_51NPVMMG8QYLQRO7QiomCihmvATqq78kmN1cEMdCO73b8a5M3N9fNOjVaxXt5Em5e8LqJCwfH4D3SVLiDesX7KXoL00uoRzxQcK"

export default function App() {
  return (

    <Provider store={store}>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <StripeProvider publishableKey={publishableKey} />
        <Main />
        <Toast />
      </IconComponentProvider>
    </Provider>
  );
}
