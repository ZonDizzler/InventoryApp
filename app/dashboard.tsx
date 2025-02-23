// Dashboard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import tw from 'twrnc';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={tw`text-blue-500 text-2xl mb-4`}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={tw`text-blue-500 font-bold mb-2`}>Inventory Summary</Text>
        <Text>Items: 0</Text>
        <Text>Categories: 0</Text>
        <Text>Total Quantity: 0 Units</Text>
        <Text>Total Value: $0</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={tw`text-blue-500 font-bold mb-2`}>Low Stock Items</Text>
          <Text>View all items low in stock</Text>
        </View>
        <View style={styles.card}>
          <Text style={tw`text-blue-500 font-bold mb-2`}>High Stock Items</Text>
          <Text>View all items high in stock</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={tw`text-blue-500 font-bold mb-2`}>Transactions</Text>
          <Text>View item movements and quantity updates</Text>
        </View>
        <View style={styles.card}>
          <Text style={tw`text-blue-500 font-bold mb-2`}>Item Analytics</Text>
          <Text>View trends in inventory and cost</Text>
        </View>
      </View>

      <View style={styles.navbar}>
        <Link href="/dashboard" style={styles.navItem}>
          <Text style={tw`text-center`}>Dashboard</Text>
        </Link>
        <Link href="/items" style={styles.navItem}>
          <Text style={tw`text-center`}>Items</Text>
        </Link>
        <Link href="/search" style={styles.navItem}>
          <Text style={tw`text-center`}>Search</Text>
        </Link>
        <Link href="/menu" style={styles.navItem}>
          <Text style={tw`text-center`}>Menu</Text>
        </Link>
      </View>
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
  },
});