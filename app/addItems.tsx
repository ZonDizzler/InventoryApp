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
import { useTheme } from "@darkModeContext";
import { getDynamicStyles } from "@styles";

export default function AddItem() {
  const { darkMode } = useTheme();

  //These styles change dynamically based off of dark mode
  const dynamicStyles = getDynamicStyles(darkMode);

  const [hasVariants, setHasVariants] = useState<boolean>(false);

  const [itemName, setItemName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [minLevel, setMinLevel] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [totalValue, setTotalValue] = useState<string>("");

  function clearFields() {
    setItemName("");
    setCategory("");
    setQuantity("");
    setMinLevel("");
    setPrice("");
    setTotalValue("");
  }

  return (
    <SafeAreaView style={[dynamicStyles.containerStyle]}>
      <View style={dynamicStyles.header}>
        <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
          <Ionicons name="arrow-back" size={28} color="#00bcd4" />
        </TouchableOpacity>
        <Text style={[dynamicStyles.headerTextStyle, dynamicStyles.textStyle]}>
          Add Item
        </Text>
        <TouchableOpacity
          onPress={async () => {
            const added = await addItem({
              name: itemName,
              category,
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

      <View style={[dynamicStyles.photoContainer]}>
        <Ionicons name="camera-outline" size={64} color="#00bcd4" />
        <Text style={dynamicStyles.textStyle}>Add photos</Text>
      </View>
      <View style={dynamicStyles.row}>
        <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
          <Text style={[tw`font-bold`, dynamicStyles.textStyle]}>
            Item Name
          </Text>

          <TextInput
            placeholder="Enter item name"
            value={itemName}
            onChangeText={setItemName}
            style={[dynamicStyles.textInputStyle]}
          />
        </View>
        <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
          <Text style={[dynamicStyles.textStyle]}>Category</Text>
          <TextInput
            placeholder="-"
            value={category}
            onChangeText={setCategory}
            style={[dynamicStyles.textInputStyle]}
          />
        </View>
      </View>

      <View style={dynamicStyles.row}>
        <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
          <Text style={[dynamicStyles.textStyle]}>Quantity</Text>
          <TextInput
            placeholder="-"
            value={quantity}
            onChangeText={setQuantity}
            style={[dynamicStyles.textInputStyle]}
            keyboardType="numeric"
          />
        </View>
        <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
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
      <View style={dynamicStyles.row}>
        <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
          <Text style={[dynamicStyles.textStyle]}>Price</Text>
          <TextInput
            placeholder="-"
            value={price}
            onChangeText={setPrice}
            style={[dynamicStyles.textInputStyle]}
            keyboardType="numeric"
          />
        </View>
        <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
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
      <View>
        <TouchableOpacity style={dynamicStyles.blueButtonStyle}>
          <Text style={dynamicStyles.blueTextStyle}>Create Custom Label</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.blueButtonStyle}>
          <Text style={dynamicStyles.blueTextStyle}>Link QR / Barcode</Text>
        </TouchableOpacity>
      </View>
      <View style={dynamicStyles.row}>
        <Text style={darkMode ? { color: "white" } : {}}>
          This item has variants
        </Text>
        <Switch value={hasVariants} onValueChange={setHasVariants} />
      </View>
    </SafeAreaView>
  );
}
