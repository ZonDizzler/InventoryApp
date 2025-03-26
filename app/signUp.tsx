import { StatusBar } from "expo-status-bar";
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, useRouter } from "expo-router";
import tw from "twrnc";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@firebaseConfig";
import { useTheme } from "@darkModeContext";

export default function SignUp() {
  const { darkMode } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      Alert.alert("Check your email!");
      router.push("/(tabs)/dashboard");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", "Sign Up Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      style={tw`flex-1`}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            tw`flex-1 items-center justify-center`,
            darkMode && { backgroundColor: "#1F2937" },
          ]}
        >
          <Image
            source={require("../assets/Logo3.png")}
            style={tw`w-40 h-20 mb-4`}
          />

          <Text
            style={[
              tw`font-bold text-xl mb-2 text-blue-500`,
              darkMode && { color: "#60a5fa" },
            ]}
          >
            Welcome!
          </Text>
          <Text
            style={[
              tw`font-bold text-sm mb-4 text-blue-500`,
              darkMode && { color: "#60a5fa" },
            ]}
          >
            Create your account
          </Text>

          <View style={tw`w-full px-12 mb-4`}>
            <TextInput
              placeholder="Full name"
              style={[
                tw`border border-gray-300 rounded-lg p-2 mb-2`,
                darkMode && {
                  backgroundColor: "#374151",
                  borderColor: "#9ca3af",
                  color: "#e5e7eb",
                },
              ]}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              style={[
                tw`border border-gray-300 rounded-lg p-2 mb-2`,
                darkMode && {
                  backgroundColor: "#374151",
                  borderColor: "#9ca3af",
                  color: "#e5e7eb",
                },
              ]}
            />
            <View style={tw`relative mb-2`}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                style={[
                  tw`border border-gray-300 rounded-lg p-2 pr-10`,
                  darkMode && {
                    backgroundColor: "#374151",
                    borderColor: "#9ca3af",
                    color: "#e5e7eb",
                  },
                ]}
                value={password}
                autoCapitalize="none"
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={tw`absolute right-2 top-2`}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Icon
                  name={passwordVisible ? "visibility" : "visibility-off"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            <View style={tw`relative mb-2`}>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={!confirmPasswordVisible}
                style={[
                  tw`border border-gray-300 rounded-lg p-2 pr-10`,
                  darkMode && {
                    backgroundColor: "#374151",
                    borderColor: "#9ca3af",
                    color: "#e5e7eb",
                  },
                ]}
                value={confirmPassword}
                autoCapitalize="none"
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={tw`absolute right-2 top-2`}
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                <Icon
                  name={
                    confirmPasswordVisible ? "visibility" : "visibility-off"
                  }
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={handleSignUp} disabled={loading}>
            <View
              style={[
                tw`bg-blue-500 text-white py-2 px-6 rounded-lg mb-4`,
                darkMode && { backgroundColor: "#3b82f6" },
              ]}
            >
              <Text
                style={[
                  tw`text-white text-sm text-center`,
                  darkMode && { color: "#f3f4f6" },
                ]}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={tw`flex-row items-center my-4`}>
            <View style={tw`flex-1 h-px bg-gray-300`} />
            <Text
              style={[tw`mx-4 text-gray-500`, darkMode && { color: "#d1d5db" }]}
            >
              Or
            </Text>
            <View style={tw`flex-1 h-px bg-gray-300`} />
          </View>

          <TouchableOpacity
            style={[
              tw`bg-black text-white py-2 px-4 rounded-lg mb-4`,
              darkMode && { backgroundColor: "#111827" },
            ]}
          >
            <Text style={tw`text-white text-center`}>Sign up with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              tw`bg-red-500 text-white py-2 px-4 rounded-lg`,
              darkMode && { backgroundColor: "#ef4444" },
            ]}
          >
            <Text style={tw`text-white text-center`}>Sign up with Google</Text>
          </TouchableOpacity>

          <Text style={[tw`text-sm mt-4`, darkMode && { color: "#d1d5db" }]}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={[
                tw`font-bold text-green-500`,
                darkMode && { color: "#34d399" },
              ]}
            >
              Log in
            </Link>
          </Text>

          <StatusBar style={darkMode ? "light" : "auto"} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
