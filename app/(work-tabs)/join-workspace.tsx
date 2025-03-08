import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import tw from "twrnc";

export default function JoinWorkspace() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Join Organization</Text>
        <TouchableOpacity>
  <Link
    href="/(tabs)/dashboard"
    style={tw`bg-blue-500 text-white py-2 px-6 rounded-lg mb-4`}
  >
    <Text style={tw`text-white text-sm text-center`}>Next</Text>
  </Link>
</TouchableOpacity>
      </View>
      <Text style={styles.title}>Enter Invite Code</Text>
      <View style={styles.codeContainer}>
        {/* Add code input fields here */}
      </View>
      <Text style={styles.infoText}>
        In case you have no code or it's expired, please request a new code from the workspace owner.
      </Text>
    </View>
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoText: {
    color: '#888',
  },
});