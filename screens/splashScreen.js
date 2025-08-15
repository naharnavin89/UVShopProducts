import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
import {useAuthStore} from '../stores/useAuthStore'; // Ensure this path is correct
const SplashScreen = ({ navigation }) => {
  const store = useAuthStore();
  const {phone} = store;
  useEffect(() => {
    setTimeout(() => {
        if(!phone) {
        navigation.replace('LoginScreen'); // navigate to login if no phone number
        }else{
        navigation.replace('HomeScreen');
        }
    //   SplashScreen.hide();
      // navigate after splash
    }, 2000); // 2 seconds splash
  }, [navigation, phone]);

  return (
    <View style={styles.container}>
      <Image source={require('../images/UV_Collections.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 150, height: 150, resizeMode: 'contain' },
});

export default SplashScreen;
