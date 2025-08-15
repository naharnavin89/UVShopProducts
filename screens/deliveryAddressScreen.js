import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useStore } from '../stores/useStore';
import { styles } from './commonstyle';
import { Header } from '../components/header';
import RazorpayCheckout from 'react-native-razorpay';
const DeliveryAddressScreen = ({ navigation, route }) => {
  const { total, cod } = route.params;
  const clearCart = useStore((s) => s.clearCart);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      Alert.alert('Error', 'Please fill all details.');
      return;
    }

    // Here you can call backend API to save the COD order with address details
    if(!cod) {
    handleRazorpayPayment();
    } else {
        Alert.alert(
      'Order Placed',
      `Order confirmed for ₹${total} with Cash on Delivery.`
    );
     clearCart();
    navigation.popToTop();
    }
   
  };

    const handleRazorpayPayment = () => {
      var options = {
        description: 'Clothes Purchase',
        image: 'https://your-logo-url.com/logo.png',
        currency: 'INR',
        key: 'rzp_test_5mlaTpUjUVB9ly', // Enter your Razorpay Key here
        amount: total * 100, // Amount in paise
        name: 'UV Collections',
        prefill: {
          email: 'naharnavin89@gmail.com',
          contact: '6260899865',
          name: 'Navin Nahar'
        },
        theme: { color: '#53a20e' }
      }
       console.log('Payment failed',options);
          RazorpayCheckout.open(options)
        .then((data) => {
          // handle success
          Alert.alert("Payment Successful", `Payment ID: ${data.razorpay_payment_id}`);
         clearCart();
          navigation.popToTop();
          // You can update order status in backend here
        })
        .catch((error) => {
            navigation.popToTop();
          console.log('Payment failed', error);
          // handle failure
          Alert.alert("Payment Canceled");
        });
    }
  

  return (
    <SafeAreaView style={styles.screen}>
         <Header
                title="Checkout"
                left={<TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.topIcon}>←</Text></TouchableOpacity>}
                right={<View />}
              />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, marginBottom: 16 }}>Enter Delivery Details</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={[styles.input, { marginBottom: 12,borderWidth: 0.5 }]}
        />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={[styles.input, { marginBottom: 12,borderWidth: 0.5 }]}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline
          style={[styles.input, { marginBottom: 24, height: 100,borderWidth: 0.5 }]}
        />

        <TouchableOpacity style={styles.ctaBtn} onPress={handlePlaceOrder}>
          <Text style={styles.ctaBtnText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryAddressScreen;
