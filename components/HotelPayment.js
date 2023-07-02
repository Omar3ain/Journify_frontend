// import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View, Button, Text } from 'react-native';
// import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
// import axios from 'axios';

// const STRIPE_KEY =
//   'pk_test_51NPUYhA5woj6pmWHVTgTncbGFy4hDtCtUBh15L4zQsokoen27lKgaHQeCsRapXXD4gjeFr02z42XlFjvC3pH0TH300Zlu0v0O5';

// const Payment = () => {
//   const [paymentIntent, setPaymentIntent] = useState(null);
//   const { confirmPayment } = useStripe();

//   useEffect(() => {
//     createPaymentIntent();
//   }, []);

//   const createPaymentIntent = async () => {
//     try {
//       const response = await axios.post('http://localhost:8000/payment/hotel-checkout/', {
//         amount: 1000, // Replace with the desired amount
//       });

//       const { paymentIntent } = response.data;
//       setPaymentIntent(paymentIntent);
//     } catch (error) {
//       console.log('Error creating payment intent:', error);
//     }
//   };

//   const handlePayment = async () => {
//     try {
//       const { error } = await confirmPayment(paymentIntent.client_secret, {
//         type: 'Card',
//         billingDetails: {
//           email: 'example@example.com', // Replace with customer's email
//         },
//       });

//       if (error) {
//         console.log('Payment failed:', error);
//       } else {
//         console.log('Payment succeeded!');
//         // Handle successful payment here
//       }
//     } catch (error) {
//       console.log('Error during payment:', error);
//     }
//   };

//   return (
//     <StripeProvider publishableKey={STRIPE_KEY}>
//       {paymentIntent ? (
//         <View style={styles.container}>
//           {/* Render your payment components here */}
//           <Text style={styles.title}>Enter Card Information:</Text>
//           <CardField
//             postalCodeEnabled={true}
//             placeholder={{
//               number: '4242 4242 4242 4242',
//             }}
//             style={styles.cardField}
//           />
//           <Button title="Pay" onPress={handlePayment} />

//           {/* You can also display payment details or any additional components */}
//           <Text style={styles.paymentDetails}>
//             Payment Amount: {paymentIntent.amount / 100} USD
//           </Text>
//         </View>
//       ) : (
//         <View style={styles.loadingContainer}>
//           {/* Render a loading indicator while the paymentIntent is being fetched */}
//           {/* For example, you can use ActivityIndicator */}
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       )}
//       <StatusBar style="auto" />
//     </StripeProvider>
//   );
// };
// export default Payment;