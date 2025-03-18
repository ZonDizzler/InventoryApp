import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from "twrnc";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <Image
        source={require("../assets/Logo3.png")}
        style={tw`w-60 h-30 mb-5`}
      />
      <Text style={tw`text-blue-500 font-bold text-3xl mb-4`}>Get Started!</Text>
      <Text style={tw`text-blue-500 font-bold text-xl mb-8`}>
        Start with Sign up or Login
      </Text>

      {/* Sign Up Button */}
      <TouchableOpacity onPress={() => router.push("/signUp")} style={tw`mb-4`}>
        <Text style={tw`text-green-500 text-lg font-bold`}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={tw`text-green-500 text-lg font-bold`}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
