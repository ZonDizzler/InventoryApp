import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from './context/DarkModeContext'; 

export default function AddItem() {
  const { darkMode } = useTheme(); 

  return (
    <SafeAreaView style={[tw`flex-1 p-5`, darkMode ? tw`bg-black` : tw`bg-white`]}>
      <View style={[styles.container, darkMode && { backgroundColor: '#333' }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
            <Ionicons name="arrow-back" size={28} color={darkMode ? "#00bcd4" : "#00bcd4"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[tw`text-blue-500`, darkMode && { color: 'white' }]}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.photoContainer, darkMode && { backgroundColor: '#555' }]}>
          <Ionicons name="camera-outline" size={64} color={darkMode ? "#00bcd4" : "#00bcd4"} />
          <Text style={darkMode ? { color: 'white' } : {}}>Add photos</Text>
        </View>

        <Text style={[tw`text-lg font-bold mt-4`, darkMode && { color: 'white' }]}>Enter Item Name</Text>
        <TextInput
          placeholder="Item name cannot be blank"
          style={[tw`border-b mb-4`, darkMode ? { borderColor: '#fff' } : { borderColor: '#ccc' }]}
        />

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={darkMode ? { color: 'white' } : {}}>Quantity</Text>
            <TextInput placeholder="1" style={[styles.input, darkMode && { backgroundColor: '#444' }]} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={darkMode ? { color: 'white' } : {}}>Min Level</Text>
            <TextInput placeholder="-" style={[styles.input, darkMode && { backgroundColor: '#444' }]} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={darkMode ? { color: 'white' } : {}}>Price</Text>
            <TextInput placeholder="-" style={[styles.input, darkMode && { backgroundColor: '#444' }]} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={darkMode ? { color: 'white' } : {}}>Total Value</Text>
            <TextInput placeholder="-" style={[styles.input, darkMode && { backgroundColor: '#444' }]} />
          </View>
        </View>

        <View style={styles.qrContainer}>
          <TouchableOpacity style={[styles.qrButton, darkMode && { backgroundColor: '#444' }]}>
            <Text style={darkMode ? { color: 'white' } : {}}>Create Custom Label</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.qrButton, darkMode && { backgroundColor: '#444' }]}>
            <Text style={darkMode ? { color: 'white' } : {}}>Link QR / Barcode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <Text style={darkMode ? { color: 'white' } : {}}>This item has variants</Text>
          <Switch />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputContainer: {
    width: '48%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  qrContainer: {
    marginBottom: 20,
  },
  qrButton: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
