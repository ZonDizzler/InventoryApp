import { useRouter } from "expo-router";
import React, { act, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useTheme } from "@darkModeContext";
import { isClerkAPIResponseError, useUser } from "@clerk/clerk-expo";
import { getDynamicStyles } from "@styles";

export default function UserProfile() {
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");

  const [email, setEmail] = useState(String(user?.primaryEmailAddress) ?? "");
  const [password, setPassword] = useState("");

  const activeChanges =
    firstName.trim() !== user?.firstName ||
    lastName.trim() !== user?.lastName ||
    password.trim() !== "";

  const allRequiredFieldsFilled = firstName.trim() && lastName.trim();

  const canSubmit = activeChanges && allRequiredFieldsFilled;

  const router = useRouter();
  const { darkMode } = useTheme();
  // These styles change dynamically based on dark mode
  const dynamicStyles = getDynamicStyles(darkMode);

  //End of hook section

  //Conditional rendering section
  if (!user) {
    return (
      <View style={dynamicStyles.containerStyle}>
        <Text style={dynamicStyles.textStyle}>You are not signed-in.</Text>
      </View>
    );
  }

  // Utility functions

  const handleSaveChanges = async () => {
    Keyboard.dismiss;
    try {
      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      if (password.trim()) {
        await user.updatePassword({ newPassword: password.trim() });
      }
      Alert.alert(
        "Profile Updated",
        "Your changes have been saved successfully."
      );
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        alert(error.message);
      }
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is irreversible. All data will be permanently lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await user.delete();
            } catch (error) {
              if (isClerkAPIResponseError(error)) {
                alert(error.message);
              }
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[
        tw`flex-1 p-5`,
        darkMode ? { backgroundColor: "#1F2937" } : tw`bg-white`,
      ]}
    >
      <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
        <Ionicons
          name="arrow-back"
          size={28}
          color={darkMode ? "#00bcd4" : "#00bcd4"}
        />
      </TouchableOpacity>

      <Text
        style={[
          tw`text-2xl text-center mb-6`,
          darkMode ? tw`text-blue-500` : tw`text-blue-500`,
        ]}
      >
        User Profile
      </Text>

      <View style={[tw`p-3 mb-5`, darkMode && { backgroundColor: "#1F2937" }]}>
        <TextInput
          placeholder="Email"
          editable={false}
          value={email}
          onChangeText={setEmail}
          style={[
            tw`border rounded-lg p-3 mb-3`,
            darkMode && { borderColor: "#9ca3af", backgroundColor: "#1F2937" },
            { borderColor: "#d1d5db" },
            darkMode && tw`text-white`,
          ]}
        />
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={[
            tw`border rounded-lg p-3 mb-3`,
            darkMode && { borderColor: "#9ca3af", backgroundColor: "#1F2937" },
            { borderColor: "#d1d5db" },
            darkMode && tw`text-white`,
          ]}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={[
            tw`border rounded-lg p-3 mb-3`,
            darkMode && { borderColor: "#9ca3af", backgroundColor: "#1F2937" },
            { borderColor: "#d1d5db" },
            darkMode && tw`text-white`,
          ]}
        />

        <TextInput
          placeholder="Change Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[
            tw`border rounded-lg p-3 mb-3`,
            darkMode && { borderColor: "#9ca3af", backgroundColor: "#1F2937" },
            { borderColor: "#d1d5db" },
            darkMode && tw`text-white`,
          ]}
        />
      </View>

      {canSubmit && (
        <TouchableOpacity
          onPress={handleSaveChanges}
          style={[
            tw`py-3 rounded-lg mb-5`,
            darkMode ? tw`bg-blue-600` : tw`bg-blue-500`,
          ]}
        >
          <Text style={tw`text-white text-center`}>Save Changes</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={handleDeleteAccount}
        style={[
          tw`py-3 rounded-lg`,
          darkMode ? tw`bg-red-600` : tw`bg-red-500`,
        ]}
      >
        <Text style={tw`text-white text-center`}>Delete Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
