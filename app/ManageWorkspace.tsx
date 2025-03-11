import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';

export default function ManageWorkspace() {
  const [workspaceName, setWorkspaceName] = useState('ICNA');
  const [contributors, setContributors] = useState(['User1', 'User2']);
  const [newContributor, setNewContributor] = useState('');

  const addContributor = () => {
    if (newContributor.trim()) {
      setContributors([...contributors, newContributor]);
      setNewContributor('');
    }
  };

  //const removeContributor = (name) => {
   // setContributors(contributors.filter(contributor => contributor !== name));
  //};

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-5`}>
    <View style={styles.container}>
    <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
        <Ionicons name="arrow-back" size={28} color="#00bcd4" />
    </TouchableOpacity>
      <Text style={tw`text-2xl font-bold mb-4`}>Manage Organization</Text>

      <View style={styles.section}>
        <Text style={tw`text-lg font-bold mb-2`}>Organization Logo</Text>
        <TouchableOpacity style={styles.logoButton}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.logo}
          />
          <Text style={tw`text-blue-500`}>Change Logo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={tw`text-lg font-bold mb-2`}>Workspace Name</Text>
        <TextInput
          value={workspaceName}
          onChangeText={setWorkspaceName}
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Text style={tw`text-lg font-bold mb-2`}>Contributors</Text>
        <FlatList
          data={contributors}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.contributor}>
              <Text>{item}</Text>
              <TouchableOpacity onPress={() => (item)}>
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
        <TextInput
          placeholder="Invite Contributor"
          value={newContributor}
          onChangeText={setNewContributor}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addContributor}>
          <Text style={tw`text-white`}>Add Contributor</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  logoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  backButton: {
    position: "absolute",
    left: 0, 
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  contributor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#00bcd4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});