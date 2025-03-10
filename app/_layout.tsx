import React from 'react';
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../app/context/auth";
import { View, ActivityIndicator } from "react-native";
import { ThemeProvider } from "./context/DarkModeContext"; 

export default function Layout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AuthGate />
      </ThemeProvider>
    </AuthProvider>
  );
}

function AuthGate() {
  const { user, loading } = useAuth();

  if (loading) {
    console.log("Loading user data...");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("User is not signed in");
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signUp" />
          <Stack.Screen name="login" />
        </>
      )}
    </Stack>
  );
}
