import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Item } from "@/types/types"; // Import the Item type
import tw from "twrnc"; // Assuming Tailwind styling
import { useRouter } from "expo-router";
import { useTheme } from "@darkModeContext";
import { getDynamicStyles } from "@styles";

interface ItemCardProps {
  item: Item;
  removeItem: (id: string) => Promise<boolean>;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, removeItem }) => {
  const { darkMode } = useTheme();

  //These styles change dynamically based off of dark mode
  const dynamicStyles = getDynamicStyles(darkMode);

  const router = useRouter();

  return (
    <View style={dynamicStyles.itemStyle}>
      <Text>
        <Text style={[tw`font-bold`, dynamicStyles.textStyle]}>
          {item.name}
        </Text>
        {"\n"}
        <Text style={[tw`font-bold`, dynamicStyles.textStyle]}>
          Stock:
        </Text>{" "}
        {item.quantity}/ {item.minLevel}
        {"\n"}
        <Text style={[tw`font-bold`, dynamicStyles.textStyle]}>
          Price:
        </Text>{" "}
        {item.price}
        {"\n"}
        <Text style={[tw`font-bold`, dynamicStyles.textStyle]}>
          Total Value:
        </Text>
        {item.totalValue}
      </Text>
      <View style={dynamicStyles.row}>
        <TouchableOpacity
          style={dynamicStyles.redButtonStyle}
          onPress={async () => {
            const removed = await removeItem(item.id); //remove the item based on the item id
            //only reload the page if items are actually removed
            if (removed) {
              //success!
            }
          }}
        >
          <Text style={dynamicStyles.redTextStyle}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={dynamicStyles.blueButtonStyle}
          onPress={() => {
            router.push(`/edit_item/${item.id}`);
          }}
        >
          <Text style={dynamicStyles.blueTextStyle}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ItemCard;
