import React from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { useTheme } from "@darkModeContext";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { useItemStats } from "@itemStatsContext";

export default function ItemAnalytics() {
  const router = useRouter();
  const { darkMode } = useTheme();
  // Dummy Data
  const dates = ["Jan", "Feb", "Mar", "Apr", "May"];
  const inventoryTrends = [50, 80, 45, 60, 90];
  const totalValueTrends = [1000, 2000, 1500, 1800, 2200];

  const { categoryStats } = useItemStats();

  const colors = [
    "#3498db",
    "#e74c3c",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
    "#e67e22",
    "#34495e",
  ];

  const pieData = Object.entries(categoryStats).map(
    ([name, { totalQuantity, totalValue }], index) => ({
      name,
      totalQuantity,
      totalValue,
      color: colors[index % colors.length], // cycle through colors if not enough
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    })
  );

  const chartWidth = Dimensions.get("window").width - 20;

  return (
    <SafeAreaView
      style={[tw`flex-1 p-5`, darkMode ? tw`bg-black` : tw`bg-white`]}
    >
      <View
        style={[styles.container, darkMode && { backgroundColor: "#1F2937" }]}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#00bcd4" />
          </Pressable>
          <Text style={[styles.headerText, darkMode && { color: "#00bcd4" }]}>
            Item Analytics
          </Text>
        </View>
        <ScrollView>
          {/* Quantities by Category Pie Chart */}
          <Text style={[styles.chartTitle, darkMode && { color: "white" }]}>
            Quantities by Category
          </Text>
          <PieChart
            data={pieData}
            width={chartWidth}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="totalQuantity"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />

          {/* Total Value by Category Pie Chart */}
          <Text style={[styles.chartTitle, darkMode && { color: "white" }]}>
            Total Value by Category
          </Text>
          <PieChart
            data={pieData}
            width={chartWidth}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="totalValue"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    color: "#00bcd4",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
