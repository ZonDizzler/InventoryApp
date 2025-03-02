import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

export default function ResetPassword() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={tw`absolute top-12 left-5`}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#22c55e" />
        </Pressable>
      </View>

      <Text style={tw`text-3xl font-bold mb-6 text-blue-500`}>Reset Password</Text>
      <TextInput
        placeholder="Your Email"
        style={tw`border border-gray-300 rounded-lg p-2 mb-4 w-80`}
      />
      <Text style={tw`font-bold text-center mb-4 text-blue-500`}>
        An email will be sent with a reset password link. Please check your
        spam/junk folder.
      </Text>
      <TouchableOpacity
        style={tw`bg-blue-500 text-white py-2 px-6 rounded-lg mb-4 w-80`}
      >
        <Text style={tw`text-white text-sm text-center`}>Send Email</Text>
      </TouchableOpacity>

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
    padding: 20,
  },
});
