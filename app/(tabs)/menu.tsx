// Menu.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Link } from "expo-router";

export default function Menu() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={tw`text-blue-500 text-2xl mb-6`}>Menu</Text>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={tw`text-white`}>FL</Text>
        </View>
        <View>
          <Text style={tw`text-blue-500 font-bold`}>FirstName LastName</Text>
          <Text style={tw`text-gray-500`}>Email</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={tw`text-white`}>FL</Text>
        </View>
        <Link href="/profile" style={tw`text-green-500 font-bold`}>User Profile</Link>
      </View>

      


      <View style={styles.card}>
        <Text style={tw`flex-1`}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <View style={styles.card}>
        <Text style={tw`flex-1`}>Display</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`mr-2`}>Light Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        </View>
      </View>

        
        <Link href="/" style={styles.signOutButton}> 
        <Text style={tw`text-white text-center`}>Sign Out</Text></Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  signOutButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});