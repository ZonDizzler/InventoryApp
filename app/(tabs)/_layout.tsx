import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useTheme } from "@darkModeContext";
import Header from "@/components/header";

export default function TabLayout() {
  const { darkMode } = useTheme();

  const tabBarBackgroundColor = darkMode ? "#121212" : "#ffffff";
  const tabBarInactiveTintColor = darkMode ? "#888" : "#999";
  const tabBarActiveTintColor = "#00bcd4";

  const onSave = async () => {
    console.log("Save action triggered");
  };

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
          href: null,
          header: () => (
            <Header
              title={"Edit Item"}
              showBackButton
              showSaveButton
              onSave={onSave}
            />
          ),
        }}
      />
    </Tabs>
  );
}
