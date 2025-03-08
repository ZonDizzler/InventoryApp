import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import tw from "twrnc";

export default function Dashboard() {
  const router = useRouter();
  const { organizationName = "Organization" } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <Text style={tw`text-xl font-bold mb-4 text-[#00bcd4]`}>Dashboard</Text>
        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.organizationHeader}>
        <Text style={tw`text-xl font-bold text-gray-700`}>{organizationName}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={tw`text-lg text-gray-700`}>▼</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => router.push("/addItems")} 
        style={styles.actionButton}>
          
          <Text style={tw`text-gray-700`}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={tw`text-gray-700`}>Search via QR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.summaryCard}
        onPress={() => router.push("/inventory-summary")}
      >
        <Text style={tw`text-[#00bcd4] text-lg font-semibold mb-3`}>
          Inventory Summary
        </Text>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`items-center`}>
            <Text style={tw`font-semibold text-gray-700`}>Items</Text>
            <Text style={tw`text-gray-500 text-lg`}>0</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`font-semibold text-gray-700`}>Categories</Text>
            <Text style={tw`text-gray-500 text-lg`}>0</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`font-semibold text-gray-700`}>Total Quantity</Text>
            <Text style={tw`text-gray-500 text-lg`}>0 Units</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`font-semibold text-gray-700`}>Total Value</Text>
            <Text style={tw`text-gray-500 text-lg`}>$0</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.blueBorderCard}
          onPress={() => router.push("/low-stock-items")}
        >
          <Text style={tw`text-[#00bcd4] font-bold mb-2`}>Low Stock Items</Text>
          <Text style={tw`text-gray-500`}>View all items low in stock</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.blueBorderCard}
          onPress={() => router.push("/locations")}
        >
          <Text style={tw`text-[#00bcd4] font-bold mb-2`}>Locations</Text>
          <Text style={tw`text-gray-500`}>View and add items to Locations</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.blueBorderCard}
          onPress={() => router.push("/transactions")}
        >
          <Text style={tw`text-[#00bcd4] font-bold mb-2`}>Transactions</Text>
          <Text style={tw`text-gray-500`}>
            View item movements and quantity updates
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.blueBorderCard}
          onPress={() => router.push("/item-analytics")}
        >
          <Text style={tw`text-[#00bcd4] font-bold mb-2`}>Item Analytics</Text>
          <Text style={tw`text-gray-500`}>
            View trends in inventory and cost
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.qrCard}
        onPress={() => router.push("/qr-code")}
      >
        <Text style={tw`text-[#00bcd4] font-bold mb-2`}>Import</Text>
      </TouchableOpacity>

      <View style={styles.recentItems}>
        <Text style={tw`text-lg font-bold text-gray-700 mb-2`}>Recent Items</Text>
        <Text style={tw`text-gray-500`}>No recent items yet.</Text>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={tw`text-lg font-bold mb-4`}>Manage Organization</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={tw`text-gray-700`}>{organizationName}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={tw`text-gray-700`}>Join New Organization</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={tw`text-gray-700`}>Add New Organization</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={tw`mt-4 text-gray-700`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  organizationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  summaryCard: {
    borderWidth: 1,
    borderColor: "#00bcd4",
    borderRadius: 15,
    padding: 25,
    backgroundColor: "#ffffff",
    marginBottom: 15,
  },
  blueBorderCard: {
    borderWidth: 1,
    borderColor: "#383737",
    borderRadius: 15,
    padding: 25,
    width: "48%",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  qrCard: {
    borderWidth: 1,
    borderColor: "#00bcd4",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: 15,
  },
  recentItems: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});