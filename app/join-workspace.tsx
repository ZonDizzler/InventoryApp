import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function JoinWorkspace() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Join Workspace</Text>
        <TouchableOpacity>
          <Text style={styles.nextText}>Next</Text>
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