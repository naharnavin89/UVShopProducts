// screens/OtpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import {useAuthStore} from '../../stores/useAuthStore';

export default function OtpScreen({ navigation }) {
  const store = useAuthStore();
  const { setUserOtp } = store;
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    setUserOtp(otp);
    // Add your OTP verification logic here
    alert('OTP verified for ' + store.phone);
      navigation.navigate('HomeScreen'); 
    // Navigate to home or dashboard after verification
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Enter OTP sent to {store.phone}</Text>
      <TextInput
        placeholder="OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 }}
      />
      <Button title="Verify OTP" onPress={handleVerify} />
    </View>
  );
}
