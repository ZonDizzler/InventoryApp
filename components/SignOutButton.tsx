import { useClerk } from "@clerk/clerk-expo";
import { useTheme } from "@darkModeContext";
import { getDynamicStyles } from "@styles";
import * as Linking from "expo-linking";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export const SignOutButton = () => {
  const styles = getStyles();

  const { darkMode } = useTheme();

  //These styles change dynamically based off of dark mode
  const dynamicStyles = getDynamicStyles(darkMode);

  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity
      style={dynamicStyles.largeRedButtonStyle}
      onPress={handleSignOut}
    >
      <Text style={styles.signOutButtonText}>Sign out</Text>
    </TouchableOpacity>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    signOutButton: {
      backgroundColor: "#ff4d4d",
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 20,
    },
    signOutButtonText: {
      textAlign: "center",
      color: "white",
    },
  });
};
export default SignOutButton;
