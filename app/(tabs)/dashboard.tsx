import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={tw`text-blue-500 text-2xl mb-4`}>Dashboard</Text>

      <Pressable
        style={styles.notificationIcon}
        onPress={() => router.push("/notifications")}
      >
        <Ionicons name="notifications-outline" size={24} color="black" />
      </Pressable>

      {/* Inventory Summary Box */}
      <Pressable
        style={tw`border border-blue-400 rounded-lg p-4 bg-white mb-4`}
        onPress={() => router.push("/inventory-summary")}
      >
        <Text style={tw`text-blue-500 text-lg font-semibold mb-3`}>
          Inventory Summary
        </Text>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`items-center`}>
            <Text style={tw`font-semibold text-black`}>Items</Text>
            <Text style={tw`text-green-500 text-lg`}>0</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`font-semibold text-black`}>Categories</Text>
            <Text style={tw`text-green-500 text-lg`}>0</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`font-semibold text-black`}>Total Quantity</Text>
            <Text style={tw`text-green-500 text-lg`}>0 Units</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`font-semibold text-black`}>Total Value</Text>
            <Text style={tw`text-green-500 text-lg`}>$0</Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.row}>
        {/* Low Stock Items */}
        <Pressable
          style={styles.blueBorderCard}
          onPress={() => router.push("/low-stock-items")}
        >
          <Text style={tw`text-blue-500 font-bold mb-2`}>Low Stock Items</Text>
          <Text style={tw`text-green-500`}>View all items low in stock</Text>
        </Pressable>

        {/* High Stock Items */}
        <Pressable
          style={styles.blueBorderCard}
          onPress={() => router.push("/high-stock-items")}
        >
          <Text style={tw`text-blue-500 font-bold mb-2`}>High Stock Items</Text>
          <Text style={tw`text-green-500`}>View all items high in stock</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        {/* Transactions */}
        <Pressable
          style={styles.blueBorderCard}
          onPress={() => router.push("/transactions")}
        >
          <Text style={tw`text-blue-500 font-bold mb-2`}>Transactions</Text>
          <Text style={tw`text-green-500`}>
            View item movements and quantity updates
          </Text>
        </Pressable>

        {/* Item Analytics */}
        <Pressable
          style={styles.blueBorderCard}
          onPress={() => router.push("/item-analytics")}
        >
          <Text style={tw`text-blue-500 font-bold mb-2`}>Item Analytics</Text>
          <Text style={tw`text-green-500`}>
            View trends in inventory and cost
          </Text>
        </Pressable>
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
  blueBorderCard: {
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 10,
    padding: 20,
    width: 150,
    height: 120,
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  notificationIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

