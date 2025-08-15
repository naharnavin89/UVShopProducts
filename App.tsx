/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StatusBar, useColorScheme } from 'react-native';
import Auth from './routeNavigation/authNavigation'; // Ensure this path is correct
import ScreenNavigation from './routeNavigation/screensNavigation'; // Ensure this path is correct
import {useAuthStore} from './stores/useAuthStore'; // Ensure this path is correct
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const store = useAuthStore();
  const {phone} = store;
  console.log('Current phone number:', phone);
  // Debugging: Log the entire store to see its contents
  console.log('Auth store:', store.phone);
  return (
      <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
     {!phone ?  <Auth /> :
      <ScreenNavigation />
    }
     
     
    </>
  );
}

export default App;
