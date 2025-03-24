import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { subscribeToItemHistory } from "@/services/itemChanges"; // adjust path
import { ItemHistoryEntry } from "@/types/types"; // adjust path

const ItemHistoryScreen = () => {
  const { id } = useLocalSearchParams(); // id = itemId
  const [history, setHistory] = useState<ItemHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id === "string") {
      // Start subscribing to real-time updates
      const unsubscribe = subscribeToItemHistory(id, (entries) => {
        setHistory(entries);
        setLoading(false);
      });

      // Cleanup on component unmount to stop listening for updates
      return () => unsubscribe();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      {history.map((entry, index) => (
        <View key={index} style={{ marginBottom: 16 }}>
          <Text>Description: {entry.description}</Text>
          <Text>Timestamp: {entry.timestamp.toDate().toString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ItemHistoryScreen;
