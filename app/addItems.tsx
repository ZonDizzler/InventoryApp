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
import { addItem } from "@itemsService";
import { useTheme } from "./context/DarkModeContext";
import { getDynamicStyles } from "@styles";

export default function AddItem() {
  const { darkMode } = useTheme();

    //These styles change dynamically based off of dark mode
    const dynamicStyles = getDynamicStyles(darkMode);

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
    <SafeAreaView
      style={[dynamicStyles.containerStyle]}
    >

        <View style={dynamicStyles.header}>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
            <Ionicons name="arrow-back" size={28} color="#00bcd4" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              const added = await addItem({
                name: itemName,
                category: "Uncategorized",
                quantity,
                minLevel,
                price,
                totalValue,
              });
              if (added) clearFields();
            }}
          >
            <Text style={[tw`text-blue-500`, darkMode && { color: "white" }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.photoContainer,
            darkMode && { backgroundColor: "#555" },
          ]}
        >
          <Ionicons name="camera-outline" size={64} color="#00bcd4" />
          <Text style={darkMode ? { color: "white" } : {}}>Add photos</Text>
        </View>
        <Text
          style={[tw`text-lg font-bold mt-4`, darkMode && { color: "white" }]}
        >
          Enter Item Name
        </Text>
        <TextInput
          placeholder="Enter item name"
          value={itemName}
          onChangeText={setItemName}
          style={[dynamicStyles.textInputStyle]}
        />

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={[dynamicStyles.textStyle]}>Quantity</Text>
            <TextInput
              placeholder="-"
              value={quantity}
              onChangeText={setQuantity}
              style={[dynamicStyles.textInputStyle]}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[dynamicStyles.textStyle]}>Min Level</Text>
            <TextInput
              placeholder="-"
              value={minLevel}
              onChangeText={setMinLevel}
              style={[dynamicStyles.textInputStyle]}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={[dynamicStyles.textStyle]}>Price</Text>
            <TextInput
              placeholder="-"
              value={price}
              onChangeText={setPrice}
              style={[dynamicStyles.textInputStyle]}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[dynamicStyles.textStyle]}>Total Value</Text>
            <TextInput
              placeholder="-"
              value={totalValue}
              onChangeText={setTotalValue}
              style={[dynamicStyles.textInputStyle]}
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
          <Text style={darkMode ? { color: "white" } : {}}>
            This item has variants
          </Text>
          <Switch value={hasVariants} onValueChange={setHasVariants} />
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
