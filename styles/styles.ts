import { StyleSheet } from 'react-native';
import tw from "twrnc";

  /**
   * 
   * This component returns a different stylesheet, based on dark mode.
   * 
  * Format:
  * 
  * StyleSheet.create({
  *   componentName: darkMode ? darkModeStyles : lightModeStyles,
  * })
  */
 // TODO: Rewrite all styles with tailwindcss
  export const getDynamicStyles = (darkMode : boolean) => StyleSheet.create(
    {
    textStyle: darkMode ? tw`text-white` : tw`text-gray-700`,

    containerStyle: darkMode ? {
      flex: 1,
      backgroundColor: "#121212",
      padding: 20,
    } : {
      flex: 1,
      backgroundColor: "#f0f0f0",
      padding: 20,
    },

    summaryCardStyle: darkMode ? {
      borderWidth: 1,
      borderColor: "#00bcd4",
      borderRadius: 15,
      padding: 25,
      backgroundColor: "#333333",
      marginBottom: 15,
    } : {
      borderWidth: 1,
      borderColor: "#00bcd4",
      borderRadius: 15,
      padding: 25,
      backgroundColor: "#ffffff",
      marginBottom: 15,
    },

    borderCardStyle: darkMode ? {
      borderWidth: 1,
      borderColor: "#383737",
      borderRadius: 15,
      padding: 25,
      width: "48%",
      alignItems: "center",
      backgroundColor: "#444444",
      marginBottom: 15,
    } : {
      borderWidth: 1,
      borderColor: "#383737",
      borderRadius: 15,
      padding: 25,
      width: "48%",
      alignItems: "center",
      backgroundColor: "#f7f7f7",
      marginBottom: 15,
    },
    actionButton: 
      tw`${darkMode ? "bg-gray-700" : "bg-gray-300"} flex-1 mx-2 py-3 p-4 rounded-lg items-center`,
    
  })