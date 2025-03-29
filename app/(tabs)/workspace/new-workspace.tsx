import { Link } from "expo-router";
import React, { FormEventHandler, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import { useTheme } from "@darkModeContext";
import {
  useUser,
  useOrganizationList,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";

export default function NewWorkspace() {
  const { darkMode } = useTheme();

  const backgroundColor = darkMode ? "#1F2937" : "#ffffff";
  const textColor = darkMode ? "#ffffff" : "#000000";
  const inputBorderColor = darkMode ? "#444444" : "#ccc";
  const inputTextColor = darkMode ? "#ffffff" : "#000000";
  const placeholderTextColor = darkMode ? "#bbbbbb" : "#666666";

  const [organizationName, setOrganizationName] = useState("");
  const { isLoaded, createOrganization } = useOrganizationList();
  const { user } = useUser();

  if (!isLoaded) return null;

  const handleSubmit = async () => {
    try {
      const createdBy = user?.emailAddresses[0].emailAddress;

      const res = await createOrganization({
        name: organizationName,
      });

      console.log(res);
      setOrganizationName("");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor }]}>
      <View style={styles.container}>
        <SignedIn>
          <Text>
            You are signed in as {user?.emailAddresses[0].emailAddress}
          </Text>
          <View style={styles.header}>
            <Text style={[styles.headerText, { color: textColor }]}>
              New Organization
            </Text>
            <TouchableOpacity
              onPress={handleSubmit}
              style={tw`bg-blue-500 text-white py-2 px-6 rounded-lg mb-4`}
            >
              <Text style={tw`text-white text-sm text-center`}>Next</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Business Name"
            placeholderTextColor={placeholderTextColor}
            value={organizationName}
            onChangeText={setOrganizationName}
            style={[
              styles.input,
              { borderColor: inputBorderColor, color: inputTextColor },
            ]}
            maxLength={40}
          />
        </SignedIn>
        <SignedOut>
          <Text>You are signed out</Text>
        </SignedOut>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
