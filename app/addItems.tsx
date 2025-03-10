import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { db } from "@firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { addItem } from "@itemsService";

export default function AddItem() {
  const [hasVariants, setHasVariants] = useState<boolean>(false);

  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [minLevel, setMinLevel] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [totalValue, setTotalValue] = useState<string>("");

  function clearFields() {
    setItemName("");
    setQuantity("");
    setMinLevel("");
    setPrice("");
    setTotalValue("");
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-5`}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
            <Ionicons name="arrow-back" size={28} color="#00bcd4" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              const added = await addItem({
                name: itemName,
                category: "Uncategorized",
                quantity: quantity,
                minLevel: minLevel,
                price: price,
                totalValue: totalValue,
              });
              if (added) {
                clearFields(); // Only clear if item was successfully added
              }
            }}
          >
            <Text style={tw`text-blue-500`}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.photoContainer}>
          <Ionicons name="camera-outline" size={64} color="#00bcd4" />
          <Text>Add photos</Text>
        </View>

        <Text style={tw`text-lg font-bold mt-4`}>Enter Item Name</Text>
        <TextInput
          placeholder="Enter item name"
          value={itemName}
          onChangeText={setItemName}
          style={tw`border-b border-gray-300 mb-4`}
        />

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text>Quantity</Text>
            <TextInput
              placeholder="-"
              value={quantity}
              onChangeText={setQuantity}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Min Level</Text>
            <TextInput
              placeholder="-"
              value={minLevel}
              onChangeText={setMinLevel}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text>Price</Text>
            <TextInput
              placeholder="-"
              value={price}
              onChangeText={setPrice}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Total Value</Text>
            <TextInput
              placeholder="-"
              value={totalValue}
              onChangeText={setTotalValue}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.qrContainer}>
          <TouchableOpacity style={styles.qrButton}>
            <Text>Create Custom Label</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.qrButton}>
            <Text>Link QR / Barcode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <Text>This item has variants</Text>
          <Switch value={hasVariants} onValueChange={setHasVariants} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  photoContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputContainer: {
    width: "48%",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  qrContainer: {
    marginBottom: 20,
  },
  qrButton: {
    backgroundColor: "#e0f7fa",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
