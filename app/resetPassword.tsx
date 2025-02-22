import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import tw from "twrnc";

export default function ResetPassword() {
  return (
    <View style={styles.container}>
      <Text style={tw`text-3xl font-bold mb-6`}>Reset Password</Text>
      <TextInput
        placeholder="Your Email"
        style={tw`border border-gray-300 rounded-lg p-2 mb-4 w-80`}
      />
      <Text style={tw`font-bold text-center mb-4`}>
        An email will be sent with a reset password link. Please check your
        spam/junk folder.
      </Text>
      <TouchableOpacity
        style={tw`bg-blue-500 text-white py-2 px-6 rounded-lg mb-4 w-80`}
      >
        <Text style={tw`text-white text-sm text-center`}>Send Email</Text>
      </TouchableOpacity>
      <Link href="/login" style={tw`font-bold text-blue-500`}>
        Back to Login
      </Link>
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
