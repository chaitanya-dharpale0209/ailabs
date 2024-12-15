
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Signin from './android/app/Compo/Signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HospitalOnMap from './android/app/Compo/HospitalOnMap';
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

