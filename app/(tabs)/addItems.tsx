import { useEffect, useState } from "react";
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
import { useNavigation } from "expo-router";

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

  const navigation = useNavigation();

  //Put a save button on the right side of the header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //Save Button
        <TouchableOpacity
          onPress={async () => {
            const addSuccess = await addItem({
              name: itemName,
              category,
              quantity,
              minLevel,
              price,
              totalValue,
            });
            if (addSuccess) {
              clearFields();
              router.push("/items");
            }
          }}
        >
          {/* Save Icon */}
          <Ionicons name="save" size={28} color="#00bcd4" style={tw`mx-2`} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, itemName, category, quantity, minLevel, price, totalValue]);

  return (
    <SafeAreaView style={[dynamicStyles.containerStyle]}>
      {/*Photo Container*/}
      <View style={[dynamicStyles.photoContainer]}>
        <Ionicons name="camera-outline" size={64} color="#00bcd4" />
        <Text style={dynamicStyles.textStyle}>Add photos</Text>
      </View>
      {/*Row 1 of text inputs*/}
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
      {/*Row 2 of text inputs*/}
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
      {/*Row 3 of text inputs*/}
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
      {/*Customization Buttons*/}
      <View>
        <TouchableOpacity style={dynamicStyles.blueButtonStyle}>
          <Text style={dynamicStyles.blueTextStyle}>Create Custom Label</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.blueButtonStyle}>
          <Text style={dynamicStyles.blueTextStyle}>Link QR / Barcode</Text>
        </TouchableOpacity>
      </View>
      {/*Row for switches*/}
      <View style={dynamicStyles.row}>
        <Text style={darkMode ? { color: "white" } : {}}>
          This item has variants
        </Text>
        <Switch value={hasVariants} onValueChange={setHasVariants} />
      </View>
    </SafeAreaView>
  );
}
