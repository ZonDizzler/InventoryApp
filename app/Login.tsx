import { Text, View, Button } from "react-native";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View>
      <Link href="/">
        <Button title="Go back" />
      </Link>
      <Text>Login page!</Text>
    </View>
  );
}
