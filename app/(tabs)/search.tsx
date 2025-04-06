import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TextInput, Button, Alert, FlatList, Text } from 'react-native';

export default function MyLocations() {
  const [address, setAddress] = useState('');
  const [locations, setLocations] = useState([
    { id: '1', name: 'Location 1', latitude: 37.78825, longitude: -122.4324 },
    { id: '2', name: 'Location 2', latitude: 37.75825, longitude: -122.4624 },
  ]);

  const addLocation = async () => {
    try {
      const coordinates = await geocodeAddress(address);
      setLocations([...locations, { id: Date.now().toString(), name: address, ...coordinates }]);
      setAddress('');
    } catch (error) {
      Alert.alert('Error', 'Unable to find location');
    }
  };

  const geocodeAddress = async (address: string) => {
    // Mock function for geocoding
    // Replace with actual API call to a geocoding service
    return { latitude: 37.7749, longitude: -122.4194 }; // Example coordinates
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.addressInput}
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Add Location" onPress={addLocation} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
          />
        ))}
      </MapView>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  locationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});