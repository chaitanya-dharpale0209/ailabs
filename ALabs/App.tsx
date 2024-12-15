
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Signin from './android/app/Compo/Signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllHospitals from './android/app/Compo/AllHospitals';
import HospitalOnMap from './android/app/Compo/HospitalOnMap';
import HospitalMap from './android/app/Compo/HospitalMap';
import ListOfHospitals from './android/app/Compo/ListOfHospitals';

import LocationEnabler from 'react-native-android-location-enabler';
import AsyncStorage from '@react-native-async-storage/async-storage';
function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const [location, setLocation] = useState(null);
 const [isSignedIn, setIsSignedIn] = useState(false);
 
  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        getCurrentLocation(); 
      } else {
        Alert.alert('Permission Denied', 'Please turn on the location permision for using this app');
      }
    } catch (error) {
      console.error('Error for requesting location permission', error);
    }
  };

  
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Current position:', position);
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
    
      },
      (error) => {
        console.error('Error in getting location:', error);
        Alert.alert('Error', 'cannot fetch location');
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }
    );
  };

  const checkIfSignedIn = async () => {
    const storedUserInfo = await AsyncStorage.getItem('userInfo');
    if (storedUserInfo) {
      setIsSignedIn(true); 
    } else {
      setIsSignedIn(false); 
    }
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="HospitalsOnMap" component={HospitalOnMap} />
        <Stack.Screen name='ListOfHosp' component={ListOfHospitals}/>
  
      </Stack.Navigator>

      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;



// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, Alert, Linking, Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const App = () => {
//   const [location, setLocation] = useState(null);

//   // Enable location services and request permission
//   const enableLocationServices = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         // Prompt the system location dialog
//         const { promptForEnableLocationIfNeeded } = require('react-native-android-location-enabler');
//         const result = await promptForEnableLocationIfNeeded({
//           interval: 10000, // Check location status interval
//           fastInterval: 5000, // Fastest location update interval
//         });

//         if (result === 'enabled') {
//           console.log('Location services enabled.');
//           requestLocationPermission(); // Request location permissions after enabling
//         } else {
//           throw new Error('Failed to enable location services.');
//         }
//       } catch (error) {
//         console.error('Error enabling location services:', error);
//         Alert.alert(
//           'Location Services Error',
//           'Failed to enable location services automatically. Please try again.'
//         );
//       }
//     } else {
//       console.log('Location services are automatically handled on iOS.');
//     }
//   };

//   // Request location permission
//   const requestLocationPermission = async () => {
//     try {
//       const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

//       if (result === RESULTS.GRANTED) {
//         console.log('Location permission granted.');
//         getCurrentLocation(); // Fetch location if permission granted
//       } else {
//         console.error('Location permission denied.');
//         Alert.alert(
//           'Permission Denied',
//           'Location permission is required to use this feature.'
//         );
//       }
//     } catch (error) {
//       console.error('Error requesting location permission:', error);
//     }
//   };

//   // Get the current location
//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         console.log('Current position:', position);
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//         Alert.alert('Location Fetched', `Latitude: ${latitude}, Longitude: ${longitude}`);
//       },
//       (error) => {
//         console.error('Error getting location:', error);
//         Alert.alert('Error', 'Unable to fetch location.');
//       },
//       { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
//     );
//   };

//   const openLocationSettings = () => {
//     // Open location settings as a fallback
//     Linking.openSettings().catch(() => {
//       Alert.alert('Error', 'Unable to open location settings.');
//     });
//   };

//   useEffect(() => {
//     // Enable location services on app startup
//     enableLocationServices();
//   }, []);

//   return (
//     <View>
//       <Button title="Enable Location Services" onPress={enableLocationServices} />
//       <Button title="Open Location Settings" onPress={openLocationSettings} />
//       {location && (
//         <View>
//           <Text>Latitude: {location.latitude}</Text>
//           <Text>Longitude: {location.longitude}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default App;

