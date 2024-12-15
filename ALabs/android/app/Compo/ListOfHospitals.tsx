import React from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Hospital {
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_phone_number?: string; 
}

interface AllHospitalsProps {
  route: {
    params: {
      hospitals: Hospital[];
    };
  };
}

const ListOfHospitals = ({ route }: AllHospitalsProps) => {
  const { hospitals } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={hospitals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.hospitalItem}>
            <Text style={styles.hospitalName}>{item.name}</Text>
            <Text>{item.vicinity}</Text>
            {item.formatted_phone_number && (
              <Text>Contact: {item.formatted_phone_number}</Text>
            )}
            <Button
              title="View on Map"
              onPress={() =>
                navigation.navigate('HospitalsOnMap', {
                  hospitals,
                  latitude: item.geometry.location.lat,
                  longitude: item.geometry.location.lng,
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  hospitalItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ListOfHospitals;
