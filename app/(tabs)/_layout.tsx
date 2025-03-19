import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, router } from "expo-router";
import { useTheme } from "@darkModeContext";
import { getDynamicStyles } from "@styles";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo for icons
import { Text } from "react-native";

export default function TabLayout() {
  const { darkMode } = useTheme();

  //These styles change dynamically based off of dark mode
  const dynamicStyles = getDynamicStyles(darkMode);

  const tabBarBackgroundColor = darkMode ? "#1F2937" : "#ffffff";
  const tabBarInactiveTintColor = darkMode ? "#888" : "#999";
  const tabBarActiveTintColor = "#00bcd4";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarStyle: {
          backgroundColor: tabBarBackgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="th-list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          title: "Items",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="file" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Locate",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="navicon" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addItems"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="edit_item/[id]"
        options={{
          href: null, //Don't include as a tab
          headerTitle: "Edit Item",
          headerTitleStyle: [
            dynamicStyles.headerTextStyle,
            dynamicStyles.blueTextStyle,
          ],
          headerTitleAlign: "center",

          headerStyle: dynamicStyles.dynamicHeaderStyle,
          headerLeft: () => (
            //Back Button
            <TouchableOpacity
              style={tw`p-2`}
              onPress={() => router.push("/items")}
            >
              <Ionicons name="arrow-back" size={28} color="#00bcd4" />
            </TouchableOpacity>
          ),

          headerRight: () => <Text>Loading...</Text>,
        }}
      />
    </Tabs>
  );
}
