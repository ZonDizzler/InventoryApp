import { useEffect, useLayoutEffect, useState } from "react";
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
import Tags from "react-native-tags";

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
  const [itemTags, setItemTags] = useState<string[]>([]);

  function clearFields() {
    setItemName("");
    setCategory("");
    setQuantity("");
    setMinLevel("");
    setPrice("");
    setTotalValue("");
    setItemTags([]);
  }

  const navigation = useNavigation();

  //Put a save button on the right side of the header
  //useLayoutEffect ensures the navigation bar updates before the UI is drawn
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //Save Button
        <TouchableOpacity
          onPress={async () => {
            const addSuccess = await addItem({
              name: itemName,
              category,
              quantity: Number(quantity),
              minLevel: Number(minLevel),
              price: Number(price),
              totalValue: Number(totalValue),
              tags: itemTags,
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
  }, [
    navigation,
    itemName,
    category,
    quantity,
    minLevel,
    price,
    totalValue,
    itemTags,
  ]);

  return (
    <SafeAreaView style={[dynamicStyles.containerStyle]}>
      <View style={tw`gap-2`}>
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

        {/* https://github.com/peterp/react-native-tags#readme */}
        <Tags
          key={itemTags.toString()}
          initialText=""
          textInputProps={{
            placeholder: "Enter tag",
          }}
          initialTags={itemTags}
          onChangeTags={(tags) => setItemTags(tags)}
          onTagPress={(index, tagLabel, event, deleted) =>
            console.log(
              index,
              tagLabel,
              event,
              deleted ? "deleted" : "not deleted"
            )
          }
          containerStyle={tw`justify-center gap-1`}
          inputStyle={{ backgroundColor: "white" }}
          renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
            <TouchableOpacity
              style={tw`bg-red-500`}
              key={`${tag}-${index}`}
              onPress={onPress}
            >
              <Text>{tag}</Text>
            </TouchableOpacity>
          )}
        />

        {/*Customization Buttons*/}
        <TouchableOpacity style={dynamicStyles.blueButtonStyle}>
          <Text style={dynamicStyles.blueTextStyle}>Create Custom Label</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.blueButtonStyle}>
          <Text style={dynamicStyles.blueTextStyle}>Link QR / Barcode</Text>
        </TouchableOpacity>

        {/*Row for switches*/}
        <View style={dynamicStyles.row}>
          <Text style={darkMode ? { color: "white" } : {}}>
            This item has variants
          </Text>
          <Switch value={hasVariants} onValueChange={setHasVariants} />
        </View>
      </View>
    </SafeAreaView>
  );
}
