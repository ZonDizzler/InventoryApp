import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import tw from "twrnc";

export default function NewWorkspace() {
  return (
    <SafeAreaView style={tw`flex-1 bg-white p-5`}>
    <View style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.headerText}>New Organization</Text>
        
        <TouchableOpacity>
  <Link
    href="/(tabs)/dashboard"
    style={tw`bg-blue-500 text-white py-2 px-6 rounded-lg mb-4`}
  >
    <Text style={tw`text-white text-sm text-center`}>Next</Text>
  </Link>
</TouchableOpacity>
      </View>
      <Text style={styles.title}>Enter Your Organization Name</Text>
      <TextInput
        placeholder="Business Name"
        style={styles.input}
        maxLength={40}
      />
    </View>
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
  cancelText: {
    color: 'blue',
  },
  nextText: {
    color: 'blue',
  },
  headerText: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});