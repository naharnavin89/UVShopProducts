import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  ScrollView,
  useColorScheme,
  Alert,
} from 'react-native';
import {useStore} from '../stores/useStore';
import {Header} from '../components/header';
import { styles } from './commonstyle';
import RazorpayCheckout from 'react-native-razorpay';

const CheckoutScreen = ({ navigation }) => {
  const clearCart = useStore((s) => s.clearCart);
const products = useStore((s) => s.products);
  const cart = useStore((s) => s.cart);
    const items = Object.entries(cart).map(([id, v]) => ({ product: products.find((p) => p.id === id), ...v }));
  const subtotal = items.reduce((sum, it) => sum + (it.product?.price || 0) * it.qty, 0);
  const delivery = items.length ? 49 : 0;
  const total = subtotal + delivery;
  const formatINR = (num) => `₹${Number(num).toLocaleString('en-IN')}`;
  console.log('total//', total);

  // const handleRazorpayPayment = () => {
  //    Alert.alert('Please fill details', 'You have chosen Pay with Razorpay');
  //   navigation.navigate('DeliveryAddressScreen', { total });
  //   var options = {
  //     description: 'Clothes Purchase',
  //     image: 'https://your-logo-url.com/logo.png',
  //     currency: 'INR',
  //     key: 'rzp_test_5mlaTpUjUVB9ly', // Enter your Razorpay Key here
  //     amount: total * 100, // Amount in paise
  //     name: 'UV Collections',
  //     prefill: {
  //       email: 'naharnavin89@gmail.com',
  //       contact: '6260899865',
  //       name: 'Navin Nahar'
  //     },
  //     theme: { color: '#53a20e' }
  //   }
  //    console.log('Payment failed',options);
  //       RazorpayCheckout.open(options)
  //     .then((data) => {
  //       // handle success
  //       Alert.alert("Payment Successful", `Payment ID: ${data.razorpay_payment_id}`);
  //      clearCart();
  //       navigation.popToTop();
  //       // You can update order status in backend here
  //     })
  //     .catch((error) => {
  //       console.log('Payment failed', error);
  //       // handle failure
  //       Alert.alert("Payment Failed", error.description);
  //     });
  // }

  const CODPayment = () => {
    Alert.alert('Please fill All details', 'You have chosen Cash on Delivery');
    navigation.navigate('DeliveryAddressScreen', { total, cod: true });
  };
    const RajorPayPayment = () => {
     Alert.alert('Please fill All details', 'You have chosen Pay with Razorpay');
    navigation.navigate('DeliveryAddressScreen', { total });
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Checkout"
        left={<TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.topIcon}>←</Text></TouchableOpacity>}
        right={<View />}
      />
      <View style={{ padding: 16,marginTop:100}}>
        <Text style={{ fontSize: 16, lineHeight: 22, textAlign:'center' }}>
          This is a demo checkout screen. Integrate a payment gateway (e.g. Razorpay / Stripe) and address forms here.
        </Text>
         </View>
        <View style={{justifyContent: 'center',padding: 16 ,marginTop:100 }}>
         <Text style={{textAlign:'center',fontWeight:'800'}}>Total Amount: {formatINR(total)}</Text>
         <TouchableOpacity
          style={[styles.ctaBtn, { marginBottom: 12,marginTop:5 }]}
          onPress={RajorPayPayment}
        >
          <Text style={styles.ctaBtnText}>Pay with Razorpay</Text>
        </TouchableOpacity>


        {/* Cash on Delivery Button */}
        <TouchableOpacity
          style={[styles.ctaBtn, { backgroundColor: '#555' }]}
          onPress={CODPayment}
        >
          <Text style={styles.ctaBtnText}>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>
     
    </SafeAreaView>
  );
};
export default CheckoutScreen;

