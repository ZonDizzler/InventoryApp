import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Button, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.ibb.co/gFRF4tfn/invo-logo.png",
        }}
        style={{ width: 200, height: 200 }}
      ></Image>
      <Text>INVO</Text>
      <Text>Get Started!</Text>
      <Text>Start with Sign up or Login</Text>
      <Button title="Sign-up" />
      <Link href="/Login">
        <Button title="Login" />
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
  },
});
