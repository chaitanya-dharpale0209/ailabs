
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  iosClientId: '1008176566294-2gg670mq6o4i3mnsv4rr9b9gfhhb78e0.apps.googleusercontent.com',
});

const API_KEY = 'AIzaSyCycuR2Ty8Dhq1EkMYTL3uZqmjD8dMjxx4'; 

const Signin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkIfSignedIn = async () => {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
        getCurrentLocation();
      }
    };
    
    checkIfSignedIn();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      getCurrentLocation();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
  
      setUserInfo(userInfo);
      
    
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  
      getCurrentLocation();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Google Sign-In failed');
    }
  };
  
  
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
    
        getNearbyHospitals(latitude, longitude);

       
        navigation.replace('HospitalsOnMap', { latitude, longitude });
      },
      (error) => {
        console.error('Error in getting location:', error);
        Alert.alert('Error', 'cannot get location');
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }
    );
  };

const getNearbyHospitals = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=${API_KEY}`
    );

    const hospitalData = response.data.results;
    console.log('Nearby Hospitals:', hospitalData);

   
    if (hospitalData && hospitalData.length > 0) {
      navigation.replace('HospitalsOnMap', { hospitals: hospitalData, latitude, longitude });
    } else {
      Alert.alert('No hospitals found', 'we cannot find hospitals nearby you.');
    }
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    Alert.alert('Error', 'Unable to fetch hospitals');
  }
};


  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      await AsyncStorage.removeItem('userInfo'); 
      Alert.alert('Signed Out', 'You have successfully signed out');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Sign-Out failed');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        'Sign in with Google'
      </Text>

    
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
        />
    
    </View>
  );
};

export default Signin;

