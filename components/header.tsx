import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@darkModeContext";
import { getDynamicStyles } from "@styles";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo for icons
import { router } from "expo-router";
import tw from "twrnc";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  showSaveButton?: boolean;
  onSave?: () => void; // Prop to handle save action
};

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showSaveButton = false,
  onSave,
}) => {
  const { darkMode } = useTheme();

  //These styles change dynamically based off of dark mode
  const dynamicStyles = getDynamicStyles(darkMode);

  return (
    <View style={dynamicStyles.editItemHeader}>
      {/* Back Button - Positioned Left */}
      {showBackButton && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`absolute left-4 p-2`}
        >
          <Ionicons name="arrow-back" size={28} color="#00bcd4" />
        </TouchableOpacity>
      )}
      {/* Title - Always Centered */}
      <Text style={[dynamicStyles.headerTextStyle, dynamicStyles.textStyle]}>
        {title}
      </Text>
      {showSaveButton && (
        <TouchableOpacity onPress={onSave} style={tw`absolute right-4 p-2`}>
          <Text style={[dynamicStyles.blueTextStyle]}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
