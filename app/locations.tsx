import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import tw from "twrnc";

export default function Locations() {
  const [locations, setLocations] = useState(['ICNA Nassau center']);
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-5`}> 
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Locations</Text>
        <TouchableOpacity>
          <Text style={styles.selectText}>Select</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search"
        style={styles.searchInput}
      />
     <TouchableOpacity
        style={styles.addLocation}
        onPress={() => router.push('/new-location')}
      >
        <Text style={styles.addLocationText}>Add Location...</Text>
      </TouchableOpacity>
    </View>
    
      <FlatList
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.locationItem}
            onPress={() => router.push({ pathname: '/edit-location', params: { name: item } })}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />

 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    color: '#00bcd4',
  },
  selectText: {
    color: '#00bcd4',
  },
  headerText: {
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  locationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addLocation: {
    padding: 15,
  },
  addLocationText: {
    color: '#00bcd4',
  },
});