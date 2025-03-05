import { View, Text, Button, Image } from "react-native";
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
      <Text style={tw`font-bold text-3xl mb-4`}>Get Started!</Text>
      <Text style={tw`font-bold text-xl mb-8`}>
        Start with Sign up or Login
      </Text>
      <Button title="Sign Up" onPress={() => router.push("/signUp")} />
      <Button title="Login" onPress={() => router.push("/login")} />
    </SafeAreaView>
  );
}
