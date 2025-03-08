import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function ImportFromFile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/next')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Import from File</Text>
      <Text style={styles.description}>
        Upload a file to import your whole inventory from a .xlsx in a snap and start managing your items in 1 minute.
      </Text>

      <TouchableOpacity style={styles.fileButton}>
        <Text style={styles.fileButtonText}>Choose File...</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>
        You can upload XLSX files or use a template to import your inventory.
      </Text>
      <Text style={styles.linkText}>
        Read more on <Text style={styles.link}>our website</Text>
      </Text>

      <TouchableOpacity style={styles.importButton} disabled>
        <Text style={styles.importButtonText}>Import</Text>
      </TouchableOpacity>
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
  backText: {
    color: '#00bcd4',
  },
  skipText: {
    color: '#00bcd4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  fileButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  fileButtonText: {
    color: '#888',
  },
  infoText: {
    color: '#888',
    marginBottom: 5,
  },
  linkText: {
    color: '#888',
  },
  link: {
    color: '#00bcd4',
    textDecorationLine: 'underline',
  },
  importButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  importButtonText: {
    color: '#888',
  },
});