import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useTheme } from "@darkModeContext";
import { getDynamicStyles } from "@styles";
import { Item, getItem } from "@itemsService";
import { useEffect, useState } from "react";

export default function EditItem() {
  const { id } = useLocalSearchParams();

  const { darkMode } = useTheme();
  //These styles change dynamically based off of dark mode
  const dynamicStyles = getDynamicStyles(darkMode);

  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  // Ensure `id` is a string
  const itemId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const fetchItem = async () => {
      if (itemId) {
        const item = await getItem(itemId);
        setCurrentItem(item);
      }
    };

    fetchItem();
  }, [itemId]);

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
