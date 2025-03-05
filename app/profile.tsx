import { useRouter } from 'expo-router';
import React, { useState } from 'react';
<<<<<<< HEAD:app/profile.tsx
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
=======
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
>>>>>>> Yaroslav-Branch:app/(tabs)/profile.tsx
import tw from 'twrnc';

export default function UserProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  return (
<<<<<<< HEAD:app/profile.tsx
    <View style={styles.container}>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#22c55e" />
      </TouchableOpacity>

      <Text style={tw`text-blue-500 text-2xl text-center mb-6`}>User Profile</Text>
=======
    <View style={tw`flex-1 bg-white p-5`}>
      <Text style={tw`text-blue-500 text-2xl mb-6`}>User Profile</Text>
>>>>>>> Yaroslav-Branch:app/(tabs)/profile.tsx

      <View style={tw`border border-gray-300 rounded-lg p-3 mb-5`}>
        <TextInput
          placeholder="First Name..."
          value={firstName}
          onChangeText={setFirstName}
          style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
        />
        <TextInput
          placeholder="Last Name..."
          value={lastName}
          onChangeText={setLastName}
          style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
        />
        <TextInput
          placeholder="Email..."
          value={email}
          onChangeText={setEmail}
          style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
        />
        <TextInput
          placeholder="Change Password..."
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
        />
      </View>

<<<<<<< HEAD:app/profile.tsx
      <TouchableOpacity onPress={() => router.replace('/menu')} style={styles.saveButton}>
        <Text style={tw`text-white text-center`}>Save Changes</Text>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
  },
  form: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 20,
  },
});
=======
      <TouchableOpacity style={tw`bg-blue-500 py-3 rounded-lg`}>
        <Link href="/menu" style={tw`text-white text-center`}>Save Changes</Link>
      </TouchableOpacity>
    </View>
  );
}
>>>>>>> Yaroslav-Branch:app/(tabs)/profile.tsx
