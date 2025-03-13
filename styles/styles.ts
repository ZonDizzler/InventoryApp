import { StyleSheet } from 'react-native';
import tw from "twrnc";


//This component returns a different stylesheet, based on dark mode.
export const getDynamicStyles = (darkMode: boolean) => StyleSheet.create(
  {
    textStyle: tw`${darkMode ? "text-white" : "text-gray-700"}`,
    containerStyle: tw`${darkMode ? "bg-gray-800" : "bg-gray-200"} flex-1 p-5`,
    summaryCardStyle: tw`${darkMode ? "bg-gray-800" : "bg-white"} border border-cyan-500 rounded-2xl p-6 mb-4`,
    borderCardStyle: tw`${darkMode ? "bg-gray-800" : "bg-gray-200"} flex-1 mx-2 p-6 border border-gray-700 rounded-2xl items-center mb-4`,
    actionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    actionButton: tw`${darkMode ? "bg-gray-700" : "bg-gray-300"} flex-1 mx-2 py-3 p-4 rounded-lg items-center`,
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    organizationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    qrCard: {
      borderWidth: 1,
      borderColor: "#00bcd4",
      borderRadius: 15,
      padding: 25,
      alignItems: "center",
      backgroundColor: darkMode ? "#333333" : "#ffffff",
      marginBottom: 15,
    },
    recentItems: {
      backgroundColor: darkMode ? "#444444" : "#ffffff",
      padding: 20,
      borderRadius: 15,
      marginBottom: 15,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "#ffffff",
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      margin: 10,
      elevation: 5,
    },
    modalButton: {
      backgroundColor: "#f7f7f7",
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: "center",
    }
  })