// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import {useAuthStore} from '../../stores/useAuthStore';

export default function RegisterScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const store = useAuthStore();

  const handleRegister = () => {
    store.setPhone(phone);
    navigation.navigate('OtpScreen'); // Redirect to OTP screen
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Register</Text>
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 }}
      />
      <Button title="Register" onPress={handleRegister} />
      <Text
        style={{ marginTop: 10, color: 'blue' }}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}
