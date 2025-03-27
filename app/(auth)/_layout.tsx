import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    //redirect to homepage if signed in
    return <Redirect href={"/(tabs)/dashboard"} />;
  }

  return <Stack />;
}
