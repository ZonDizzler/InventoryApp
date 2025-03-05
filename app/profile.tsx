import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function UserProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is irreversible. All data will be permanently lost.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => console.log("Account deleted") }
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-5`}>
      <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
        <Ionicons name="arrow-back" size={28} color="#22c55e" />
      </TouchableOpacity>

      <Text style={tw`text-blue-500 text-2xl text-center mb-6`}>User Profile</Text>

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

      <TouchableOpacity onPress={() => router.push("/dashboard")} style={tw`bg-blue-500 py-3 rounded-lg mb-5`}>
        <Text style={tw`text-white text-center`}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDeleteAccount} style={tw`bg-red-500 py-3 rounded-lg`}>
        <Text style={tw`text-white text-center`}>Delete Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
