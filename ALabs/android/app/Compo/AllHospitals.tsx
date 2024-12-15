import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const AllHospitals = ({ route }: { route: any }) => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    if (route.params) {
      const { latitude, longitude } = route.params;
      setLocation({ latitude, longitude });
      fetchNearbyHospitals(latitude, longitude);
    }
  }, [route.params]);

  const fetchNearbyHospitals = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=AIzaSyCycuR2Ty8Dhq1EkMYTL3uZqmjD8dMjxx4`
      );

      const hospitalData = response.data.results;
      console.log('Nearby Hospitals:', hospitalData);
      setHospitals(hospitalData);
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
      Alert.alert('Error', 'Unable to fetch hospitals');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Showing Hospitals Near By You!</Text>
      {location && (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}

      <FlatList
        data={hospitals}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.hospitalItem}
            onPress={() => navigation.navigate('HospitalsOnMap', { hospital: item })}
          >
            <Text style={styles.hospitalName}>{item.name}</Text>
            <Text>{item.vicinity}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Go Back to Sign In" onPress={() => navigation.navigate('Signin')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  hospitalItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    width: '100%',
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AllHospitals;
