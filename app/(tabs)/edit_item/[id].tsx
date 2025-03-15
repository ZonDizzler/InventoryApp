import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@darkModeContext";
import { getDynamicStyles } from "@styles";
import { Item, getItem } from "@itemsService";
import { useEffect, useState } from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo for icons

export default function EditItem() {
  const { id } = useLocalSearchParams();

  const { darkMode } = useTheme();
  //These styles change dynamically based off of dark mode
  const dynamicStyles = getDynamicStyles(darkMode);

  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  // Ensure `id` is a string
  const itemId = Array.isArray(id) ? id[0] : id;

  const navigation = useNavigation();

  useEffect(() => {
    const fetchItem = async () => {
      if (itemId) {
        const item = await getItem(itemId);
        setCurrentItem(item);
      }
    };

    fetchItem();
  }, [itemId]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log("Saving")} style={tw`p-2`}>
          <Ionicons name="save" size={28} color="#00bcd4" />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={dynamicStyles.containerStyle}>
      <Text style={dynamicStyles.textStyle}>
        {currentItem
          ? `Item Name: ${currentItem.name}`
          : `No item found for ID: ${itemId}`}
      </Text>
    </View>
  );
}
