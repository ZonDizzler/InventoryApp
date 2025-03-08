import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import tw from "twrnc";

export default function NewWorkspace() {
  const [organizationName, setOrganizationName] = useState('');

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-5`}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>New Organization</Text>
          <TouchableOpacity>
            <Link
              href={{
                pathname: '/(tabs)/dashboard',
                params: { organizationName },
              }}
              style={tw`bg-blue-500 text-white py-2 px-6 rounded-lg mb-4`}
            >
              <Text style={tw`text-white text-sm text-center`}>Next</Text>
            </Link>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Business Name"
          value={organizationName}
          onChangeText={setOrganizationName}
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
  headerText: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});