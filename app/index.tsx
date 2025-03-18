import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from "twrnc";
import { useRouter } from "expo-router";
import { useTheme } from './context/DarkModeContext'; // Import your DarkModeContext hook

export default function HomeScreen() {
  const router = useRouter();
  const { darkMode } = useTheme(); // Get the darkMode value

  return (
    <SafeAreaView
      style={[
        tw`flex-1 items-center justify-center`, 
        darkMode && { backgroundColor: '#1F2937' } // Set background color based on dark mode
      ]}
    >
      <Image
        source={require("../assets/Logo3.png")}
        style={tw`w-60 h-30 mb-5`}
      />
      <Text
        style={[
          tw`font-bold text-3xl mb-4 text-blue-500`, 
          darkMode && { color: "#60a5fa" } // Adjust text color for dark mode
        ]}
      >
        Get Started!
      </Text>
      <Text
        style={[
          tw`font-bold text-xl mb-8 text-blue-500`, 
          darkMode && { color: "#60a5fa" } // Adjust text color for dark mode
        ]}
      >
        Start with Sign up or Login
      </Text>

      {/* Sign Up Button */}
      <TouchableOpacity 
        onPress={() => router.push("/signUp")} 
        style={tw`mb-4`}
      >
        <Text
          style={[
            tw`text-green-500 text-lg font-bold`, 
            darkMode && { color: "#34d399" } // Adjust button color for dark mode
          ]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text
          style={[
            tw`text-green-500 text-lg font-bold`, 
            darkMode && { color: "#34d399" } // Adjust button color for dark mode
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
