import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, ImageBackground } from "react-native";
import { Link } from "expo-router";
import tw from "twrnc";

export default function Index(): JSX.Element {
  return (
    <ImageBackground 
      source={require("../assets/gradientbg.png")} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/Logo3.png")}
          style={tw`absolute top-5 w-60 h-30`}
        />
        <Text style={tw`font-bold text-3xl absolute top-60`}>Get Started!</Text>
        <Text style={tw`font-bold text-xl absolute top-80`}>
          Start with Sign up or Login
        </Text>
        <Link
          href="/signUp"
          style={tw`bg-blue-500 text-white text-lg py-2 px-20 rounded-xl mt-60 mb-10`}
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          style={tw`bg-blue-500 text-white text-lg py-2 px-22 rounded-xl mb-10`}
        >
          Login
        </Link>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
