import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from "expo-router";

export default function LocatePage() {
  const locations = [
    { id: '1', name: 'Location 1', address: '1234 Main Street, Dallas, TX 75201' },
    { id: '2', name: 'Location 2', address: '5678 Industrial Parkway, Chicago, IL 60601' },
    { id: '3', name: 'Location 3', address: '9101 Logistics Boulevard, Atlanta, GA 30301' },
    { id: '4', name: 'Location 4', address: '2468 Harbor Drive, Los Angeles, CA 90001' },
    { id: '5', name: 'Location 5', address: '357 Warehouse Lane, Philadelphia, PA 19101' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Locations</Text>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Location</Text>
        </View>
      </View>

      <TextInput
        placeholder="Search"
        style={styles.searchInput}
      />

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map Placeholder</Text>
      </View>

      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007b83',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  mapPlaceholder: {
    height: 200,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#888',
  },
  locationItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  locationName: {
    fontWeight: 'bold',
  },
});