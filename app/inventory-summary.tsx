import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function InventorySummary() {
  const router = useRouter();

  return (
    <View style={styles.container}>
     
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#22c55e" />
      </Pressable>
      <Text style={styles.headerText}>Inventory Summary</Text>
      <View style={styles.summaryBox}>
        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.label}>Total Quantity</Text>
            <Text style={styles.value}>0 Units</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Total Value</Text>
            <Text style={styles.value}>$0</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    color: "#2563eb",
    marginTop: 20,
  },
  summaryBox: {
    flex: 1, 
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 15, 
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#2563eb",
  },
  value: {
    fontSize: 18,
    color: "#000",
    marginTop: 2, 
  },
});
