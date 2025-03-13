import { StyleSheet } from 'react-native';
import tw from "twrnc";


//This component returns a different stylesheet, based on dark mode.
export const getDynamicStyles = (darkMode: boolean) => StyleSheet.create(
  {
    textStyle: tw`${darkMode ? "text-white" : "text-gray-700"}`,
    containerStyle: tw`${darkMode ? "bg-gray-800" : "bg-gray-200"} flex-1 p-5`,
    summaryCardStyle: tw`${darkMode ? "bg-gray-800" : "bg-white"} border border-cyan-500 rounded-2xl p-6 mb-4`,
    borderCardStyle: tw`${darkMode ? "bg-gray-800" : "bg-gray-200"} flex-1 mx-2 p-6 border border-gray-700 rounded-2xl items-center mb-4`,
    actionButton: tw`${darkMode ? "bg-gray-700" : "bg-gray-300"} flex-1 mx-2 py-3 p-4 rounded-lg items-center`,
  })