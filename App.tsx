import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>INVO</Text>
      <Text>Get Started!</Text>
      <Text>Start with Sign up or Login</Text>
      <Button title="Sign-up" />
      <Button title="Login" />

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
exsudo xcodebuild -license
},
});
