import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig"; // Adjust the path as necessary

export default function Menu() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log("User signed out");
      Alert.alert("Signed Out", "You have been signed out successfully.");
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
      Alert.alert("Error", "Failed to sign out.");
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-5`}>
      <Text style={tw`text-blue-500 text-2xl mb-6`}>Menu</Text>

      <View style={tw`flex-row items-center border border-gray-300 rounded-lg p-3 mb-5`}>
        <View style={tw`w-10 h-10 rounded-full bg-blue-500 justify-center items-center mr-3`}>
          <Text style={tw`text-white`}>FL</Text>
        </View>
        <View>
          <Text style={tw`text-blue-500 font-bold`}>FirstName LastName</Text>
          <Text style={tw`text-gray-500`}>Email</Text>
        </View>
      </View>

      <View style={tw`flex-row items-center border border-gray-300 rounded-lg p-3 mb-5`}>
        <View style={tw`w-10 h-10 rounded-full bg-blue-500 justify-center items-center mr-3`}>
          <Text style={tw`text-white`}>FL</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Text style={tw`text-green-500 font-bold`}>User Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center border border-gray-300 rounded-lg p-3 mb-5`}>
        <Text style={tw`flex-1`}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <View style={tw`flex-row items-center border border-gray-300 rounded-lg p-3 mb-5`}>
        <Text style={tw`flex-1`}>Display</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`mr-2`}>Light Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleSignOut} style={tw`bg-blue-500 py-3 rounded-lg`}>
        <Text style={tw`text-white text-center`}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}