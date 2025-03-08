import React from 'react';
import { router, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function InventorySummary() {
  const data = [
    { id: '1', code: 'SIK7T0002', name: 'Papers', category: 'All Items', quantity: '13 units' },
    { id: '2', code: 'SIK7T0001', name: 'Jacket', category: 'Clothing', quantity: '1 unit' },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-5`}>
    <View style={styles.container}>
      <View style={styles.header}>
        
      <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
        <Ionicons name="arrow-back" size={28} color="#22c55e" />
      </TouchableOpacity>
        <Text style={styles.headerText}>INVENTORY SUMMARY</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Quantity</Text>
        <Text style={styles.summaryValue}>14 units</Text>
        <Text style={styles.summaryText}>Total Value</Text>
        <Text style={styles.summaryValue}>$0</Text>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Last Updated</Text>
        <Ionicons name="filter" size={20} color="white" />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemCode}>{item.code}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="share-social" size={24} color="white" />
      </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryText: {
    color: '#888',
  },
  summaryValue: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listHeaderText: {
    color: 'black',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  itemCode: {
    color: '#888',
  },
  itemName: {
    color: 'black',
    fontWeight: 'bold',
  },
  itemCategory: {
    color: '#888',
  },
  itemQuantity: {
    color: 'black',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00bcd4',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});