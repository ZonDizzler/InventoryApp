import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useTheme } from "@darkModeContext";
import { getDynamicStyles } from "@styles";
import { getItem } from "@itemsService";
import { useEffect, useState } from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo for icons
import { editItem } from "@itemsService";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import ItemAnalytics from "@/app/item-analytics";
import { Item } from "@/types/types";

export default function EditItem() {
  const { darkMode } = useTheme();

  // These styles change dynamically based on dark mode
  const dynamicStyles = getDynamicStyles(darkMode);

  const [currentItem, setCurrentItem] = useState<Item | null>();

  const [itemName, setItemName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [minLevel, setMinLevel] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [totalValue, setTotalValue] = useState<string>("");

  function updateFields(newItem: Item) {
    setItemName(newItem?.name ?? "");
    setCategory(newItem?.category ?? "");
    setQuantity(String(newItem?.quantity ?? ""));
    setMinLevel(String(newItem?.minLevel ?? ""));
    setPrice(String(newItem?.price ?? ""));
    setTotalValue(String(newItem?.totalValue ?? ""));
  }

  const { id } = useLocalSearchParams();

  // Ensure `id` is a valid string
  const itemId = Array.isArray(id) ? id[0] : id;

  const navigation = useNavigation();

  //Each time itemId changes, get the the new item from firebase
  useEffect(() => {
    const fetchItem = async () => {
      if (itemId) {
        try {
          const item = await getItem(itemId);

          if (item) {
            //Update the fields based on the new item
            setCurrentItem(item);
            updateFields(item);
          } else {
            setCurrentItem(null); // Handle the case when no item is found
          }
        } catch (error) {
          console.error("Error fetching item:", error);
          setCurrentItem(null); // Handle error case
        }
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  //Put a save button on the right side of the header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //Save Button
        <TouchableOpacity
          style={tw`p-2`}
          onPress={async () => {
            const newItem: Item = {
              id: itemId,
              name: itemName,
              category,
              quantity: Number(quantity),
              minLevel: Number(minLevel),
              price: Number(price),
              totalValue: Number(totalValue),
            };

            const editSuccess = await editItem(itemId, newItem);
            if (editSuccess) {
              //Update the item and fields when item is sucessfully edited
              setCurrentItem(newItem);
              updateFields(newItem);
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
    <SafeAreaView style={dynamicStyles.containerStyle}>
      {/* Label for item being edited */}
      <View style={dynamicStyles.header}>
        <Text style={[dynamicStyles.textStyle, dynamicStyles.headerTextStyle]}>
          {currentItem
            ? `Item Name: ${currentItem.name}`
            : `No item found for ID: ${itemId}`}
        </Text>
      </View>
      {/* Display text inputs only if currentItem exists */}
      {currentItem && (
        <View style={tw`gap-3`}>
          {/*Row 1 of text inputs*/}
          <View style={dynamicStyles.row}>
            {/* Item Name */}
            <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
              <Text style={[tw`font-semibold`, dynamicStyles.textStyle]}>
                Item Name
              </Text>
              <TextInput
                placeholder="Enter item name"
                value={itemName}
                onChangeText={setItemName}
                style={[dynamicStyles.textInputStyle]}
              />
            </View>
            {/* Category */}
            <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
              <Text style={[tw`font-semibold`, dynamicStyles.textStyle]}>
                Category
              </Text>
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
            {/* Quantity */}
            <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
              <Text style={[tw`font-semibold`, dynamicStyles.textStyle]}>
                Quantity
              </Text>
              <TextInput
                placeholder="-"
                value={quantity}
                onChangeText={setQuantity}
                style={[dynamicStyles.textInputStyle]}
                keyboardType="numeric"
              />
            </View>
            {/* Min Level */}
            <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
              <Text style={[tw`font-semibold`, dynamicStyles.textStyle]}>
                Min Level
              </Text>
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
            {/* Price */}
            <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
              <Text style={[tw`font-semibold`, dynamicStyles.textStyle]}>
                Price
              </Text>
              <TextInput
                placeholder="-"
                value={price}
                onChangeText={setPrice}
                style={[dynamicStyles.textInputStyle]}
                keyboardType="numeric"
              />
            </View>
            <View style={[dynamicStyles.inputContainer, tw`flex-1`]}>
              {/* Total Value */}
              <Text style={[tw`font-semibold`, dynamicStyles.textStyle]}>
                Total Value
              </Text>
              <TextInput
                placeholder="-"
                value={totalValue}
                onChangeText={setTotalValue}
                style={[dynamicStyles.textInputStyle]}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
