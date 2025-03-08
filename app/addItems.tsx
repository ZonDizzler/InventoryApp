import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

export default function AddItem() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={tw`text-blue-500`}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.photoContainer}>
        <Ionicons name="camera-outline" size={64} color="#00bcd4" />
        <Text>Add photos</Text>
      </View>

      <Text style={tw`text-lg font-bold mt-4`}>Enter Item Name</Text>
      <TextInput
        placeholder="Item name cannot be blank"
        style={tw`border-b border-gray-300 mb-4`}
      />

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text>Quantity</Text>
          <TextInput placeholder="1" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text>Min Level</Text>
          <TextInput placeholder="-" style={styles.input} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text>Price</Text>
          <TextInput placeholder="-" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text>Total Value</Text>
          <TextInput placeholder="-" style={styles.input} />
        </View>
      </View>

      <View style={styles.qrContainer}>
        <TouchableOpacity style={styles.qrButton}>
          <Text>Create Custom Label</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.qrButton}>
          <Text>Link QR / Barcode</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.switchContainer}>
        <Text>This item has variants</Text>
        <Switch />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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