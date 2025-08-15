/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/homeScreen'; // Ensure this path is correct
import ProductScreen from '../screens/productScreen';
import CartScreen from '../screens/cartScreen';
import CheckoutScreen from '../screens/checkoutScreen';
import FavoritesScreen from '../screens/favoritesScreen'
import DeliveryAddressScreen from '../screens/deliveryAddressScreen';


const Stack = createNativeStackNavigator();
function ScreenNavigation() {
  const isDarkMode = useColorScheme() === 'dark';
  const scheme = useColorScheme();
  return (
      <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="HomeScreen" component={HomeScreen} />
         <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
         <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} /> 
         <Stack.Screen name="DeliveryAddressScreen" component={DeliveryAddressScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

export default ScreenNavigation;
