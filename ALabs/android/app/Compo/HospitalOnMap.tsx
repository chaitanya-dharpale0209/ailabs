import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; 
import { useNavigation } from '@react-navigation/native';

interface HospitalOnMapProps {
  route: {
    params: {
      hospitals?: any[]; 
      latitude: number; 
      longitude: number; 
    };
  };
}

const HospitalOnMap = ({ route }: HospitalOnMapProps) => {
  const { hospitals, latitude, longitude } = route.params;
  const navigation = useNavigation();

  
  if (!hospitals || hospitals.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No hospitals found near your location.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      
        <Marker coordinate={{ latitude, longitude }} title="You" description="Your Location" />

      
        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: hospital.geometry.location.lat,
              longitude: hospital.geometry.location.lng,
            }}
            title={hospital.name}
            description={hospital.vicinity}
          />
        ))}
      </MapView>

      
      <Button
        title="View in List"
        onPress={() => navigation.navigate('ListOfHosp', { hospitals })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default HospitalOnMap;
