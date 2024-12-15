import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

const HospitalMap = () => {
  const route = useRoute();
  const hospital = route.params?.hospital; 

  
  if (!hospital) {
    return (
      <View style={styles.container}>
        <Text>data is not available</Text>
      </View>
    );
  }

 
  const { geometry } = hospital;
  const { location } = geometry;
  const { lat, lng } = location;

  return (
    <View style={styles.container}>
      <Text style={styles.hospitalName}>{hospital.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: lat, longitude: lng }} title={hospital.name} description={hospital.vicinity} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hospitalName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '80%',
  },
});

export default HospitalMap;
