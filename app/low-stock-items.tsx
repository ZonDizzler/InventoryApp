

import React, { useState, useEffect } from "react";
import { Pressable, View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { db } from '@firebaseConfig';  
import { collection, getDocs, query, where } from "firebase/firestore";  

interface Item {
  id: string;
  name: string;
  quantity: number;
  isLow: boolean;
  category: string;
  totalValue: number;
}

export default function LowStockItems() {
  const router = useRouter();
  const [lowStockItems, setLowStockItems] = useState<Item[]>([]); 

  useEffect(() => {
    const fetchLowStockItems = async () => {
      try {
        const itemsCollection = collection(db, "items");

        // it should only add an item if isLow is true, also need to implement this into the addItem and the editItem (when we make editItem)
        const lowStockQuery = query(itemsCollection, where("isLow", "==", true));
        
        const snapshot = await getDocs(lowStockQuery);
        const itemsList: Item[] = [];
        
        snapshot.forEach((doc) => {
          const itemData = doc.data() as Item;
          itemsList.push({ ...itemData, id: doc.id });
        });

        setLowStockItems(itemsList);  
      } catch (error) {
        console.error("Error fetching low stock items:", error);
      }
    };

    fetchLowStockItems(); // Call the function to fetch items when the component mounts
  }, []);

  // Render item function for FlatList
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>Category: {item.category}</Text>
      <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemDetails}>Total Value: ${item.totalValue.toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-5`}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#00bcd4" />
          </Pressable>
          <Text style={styles.headerText}>Low Stock Items</Text>
        </View>

        {/* If there are low stock items, display them, otherwise show a no items message */}
        {lowStockItems.length > 0 ? (
          <FlatList
            data={lowStockItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.box}>
            <Text style={tw`text-gray-500 text-lg`}>No low stock items</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    color: "#00bcd4",
  },
  box: {
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 20,
    alignItems: "center",
  },
  itemContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f7f7f7",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00bcd4",
  },
  itemDetails: {
    fontSize: 14,
    color: "#333",
  },
});
