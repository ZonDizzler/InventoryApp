import { useRouter, Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

export default function UserProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  return (
    <View style={tw`flex-1 bg-white p-5`}>
      <Text style={tw`text-blue-500 text-2xl mb-6`}>User Profile</Text>

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

      <TouchableOpacity style={tw`bg-blue-500 py-3 rounded-lg`}>
        <Link href="/dashboard" style={tw`text-white text-center`}>Save Changes</Link>
      </TouchableOpacity>
    </View>
  );
}
