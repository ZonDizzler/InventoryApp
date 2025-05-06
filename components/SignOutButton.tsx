import { useClerk } from "@clerk/clerk-expo";
import { useTheme } from "@darkModeContext";
import { getDynamicStyles } from "@styles";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export const SignOutButton = () => {
  const { darkMode, setDarkMode } = useTheme();

  //These styles change dynamically based off of dark mode
  const dynamicStyles = getDynamicStyles(darkMode);

  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      setDarkMode(false);
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
      <Text style={dynamicStyles.whiteTextStyle}>Sign out</Text>
    </TouchableOpacity>
  );
};

export default SignOutButton;
