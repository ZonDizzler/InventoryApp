import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import tw from 'twrnc';

export default function Login() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/invo_bg.png")}
        style={tw`absolute top-0 w-50 h-50`}
      />
      <Text style={tw`font-bold text-xl absolute top-40`}>Welcome Back!</Text>
      <Text style={tw`font-bold text-sm absolute top-50`}>Login to your account</Text>
      <View style={tw`w-full px-10 mb-30`}>
        <TextInput
          placeholder="Login"
          style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});