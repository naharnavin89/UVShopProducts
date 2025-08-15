// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert } from 'react-native';
import {useAuthStore} from '../../stores/useAuthStore';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const store = useAuthStore();
  const {setPhoneNo} = store;
  console.log('LoginScreen store:', store);

  const handleProceed = () => {
        if (!phone) {
          Alert.alert('Error', 'Please enter your phone number.');
          return;
        }
     else {
       setPhoneNo(phone);
    navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Login</Text>
      <TextInput
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 }}
      />
      <Button title="Proceed" onPress={handleProceed} />
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}><Text
        style={{ marginTop: 10, color: 'blue' }}
      >
        Don't have an account? Register
      </Text></TouchableOpacity>
      
    </View>
  );
}
