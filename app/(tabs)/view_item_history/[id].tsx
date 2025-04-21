import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { subscribeToItemHistory } from "@/services/itemChanges"; // adjust path
import { Item, ItemHistoryEntry } from "@/types/types"; // adjust path
import { useOrganization } from "@clerk/clerk-expo";

const ItemHistoryScreen = () => {
  const { id } = useLocalSearchParams(); // id = itemId
  const [history, setHistory] = useState<ItemHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // https://clerk.com/docs/hooks/use-organization
  const { organization } = useOrganization();

  useEffect(() => {
    if (!organization?.id) {
      return;
    }
    if (typeof id === "string") {
      // Start subscribing to real-time updates
      const unsubscribe = subscribeToItemHistory(
        organization.id,
        id,
        (entries: ItemHistoryEntry[]) => {
          setHistory(entries);
          setLoading(false);
        }
      );

      // Cleanup on component unmount to stop listening for updates
      return () => unsubscribe();
    }
  }, [organization?.id, id]);

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
