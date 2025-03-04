import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>
          Enter text in search bar to{"\n"}find an item or category
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 28,
    color: "#007AFF", // No bold style applied
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    height: 40,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
  },
  searchIcon: {
    padding: 5,
  },
  placeholderContainer: {
    flex: 1, // Takes up remaining space to center content
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#007AFF",
    textAlign: "center",
  },
});
