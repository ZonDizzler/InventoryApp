import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard,} from "react-native";
import { Link } from "expo-router";
import tw from "twrnc";
import { FIREBASE_AUTH } from "..//FirebaseConfig"; // Adjust the path as necessary
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = FIREBASE_AUTH;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Login Successful");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <Image
  source={require("../assets/Logo3.png")}
  style={tw`absolute top-1 w-40 h-20`}
  resizeMode="contain"
/>

        <Text style={tw`font-bold text-xl mb-2 text-blue-500`}>Welcome Back!</Text>
        <Text style={tw`font-bold text-sm mb-4 text-blue-500`}>Login to your account</Text>
        <View style={tw`w-full px-12 mb-4`}>
          <TextInput
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={setEmail}
            style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
          />
          <View style={tw`relative mb-2`}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              style={tw`border border-gray-300 rounded-lg p-2 pr-10`}
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
        </View>
        <Link href="/resetPassword" style={tw`font-bold text-sm mb-4 text-green-500`}>
          Forgot Password?
        </Link>

        <TouchableOpacity>
          <Link
            onPress={signIn}
            href="/(tabs)/dashboard"
            style={tw`bg-blue-500 text-white py-2 px-6 rounded-lg mb-4`}
          >
            <Text style={tw`text-white text-sm text-center`}>Login</Text>
          </Link>
        </TouchableOpacity>

        <View style={tw`flex-row items-center my-4`}>
          <View style={tw`flex-1 h-px bg-gray-300`} />
          <Text style={tw`mx-4 text-gray-500`}>Or</Text>
          <View style={tw`flex-1 h-px bg-gray-300`} />
        </View>

        <TouchableOpacity
          style={tw`bg-black text-white py-2 px-4 rounded-lg mb-4`}
        >
          <Text style={tw`text-white text-center`}>Sign in with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-red-500 text-white py-2 px-4 rounded-lg`}
        >
          <Text style={tw`text-white text-center`}>Sign in with Google</Text>
        </TouchableOpacity>

        <Text style={tw`text-sm mt-4`}>
          Don't have an account?{" "}
          <Link href="/signUp" style={tw`font-bold text-green-500`}>
            Sign Up
          </Link>
        </Text>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
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
