import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { Link } from "expo-router";

export default function Menu() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={tw`text-xl font-bold mb-4 text-[#00bcd4]`}>Menu</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={tw`text-white`}>FL</Text>
        </View>
        <Link href="/profile" style={tw`text-[#00bcd4] font-bold`}>User Profile</Link>
      </View>

      <Text style={tw`text-gray-500 mt-4 mb-2`}>MY WORKSPACES</Text>
      <View style={styles.card}>
        <Text>Organization</Text>
        <Text>1 Contributor</Text>
      </View>
      <View style={styles.card}>
        <Text>Join Organization</Text>
      </View>
      <View style={styles.card}>
        <Text>Add New Organization</Text>
      </View>

      <View style={styles.card}>
        <Text>Archived Items</Text>
      </View>

      <View style={styles.card}>
        <Text style={tw`flex-1`}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#ccc", true: "#00bcd4" }}
          thumbColor={notificationsEnabled ? "#00bcd4" : "#f4f3f4"}
        />
      </View>

      <View style={styles.card}>
        <Text style={tw`flex-1`}>Display</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`mr-2`}>Light Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: "#ccc", true: "#00bcd4" }}
            thumbColor={darkModeEnabled ? "#00bcd4" : "#f4f3f4"}
          />
        </View>
      </View>

      <Link href="/" style={styles.signOutButton}>
        <Text style={tw`text-white text-center`}>Sign Out</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00bcd4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signOutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});