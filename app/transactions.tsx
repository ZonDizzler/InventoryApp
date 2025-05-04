import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import { useOrganization } from "@clerk/clerk-expo";
import { useItemStats } from "@itemStatsContext";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { useTheme } from "@darkModeContext";

const ItemHistoryScreen = () => {
  const { recentlyEditedItems } = useItemStats();

  // https://clerk.com/docs/hooks/use-organization
  const { organization } = useOrganization();
  const { darkMode } = useTheme();
  const router = useRouter();

  if (!organization) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[tw`flex-1 p-5`, darkMode ? tw`bg-black` : tw`bg-white`]}
    >
      <View
        style={[styles.container, darkMode && { backgroundColor: "#1F2937" }]}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={28}
              color={darkMode ? "#00bcd4" : "#00bcd4"}
            />
          </Pressable>
          <Text
            style={[
              styles.headerText,
              darkMode && { color: "white" },
              { color: "#06b6d4" },
            ]}
          >
            Transactions
          </Text>
        </View>

        <ScrollView style={styles.container}>
          <Text style={styles.title}>Transactions</Text>

          {recentlyEditedItems.length === 0 ? (
            <Text style={styles.emptyText}>
              No transactions have been recorded.
            </Text>
          ) : (
            recentlyEditedItems.map((entry, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.description}>{entry.name}</Text>
                <Text style={styles.timestamp}>
                  {entry.editedAt?.toDate().toLocaleString()}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 32,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 13,
    color: "#888",
  },
});

export default ItemHistoryScreen;
