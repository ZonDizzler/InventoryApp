import React from "react";
import { Pressable, View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { useTheme } from "./context/DarkModeContext";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

export default function ItemAnalytics() {
  const router = useRouter();
  const { darkMode } = useTheme();

  // Dummy Data
  const dates = ["Jan", "Feb", "Mar", "Apr", "May"];
  const inventoryTrends = [50, 80, 45, 60, 90];
  const totalValueTrends = [1000, 2000, 1500, 1800, 2200];

  // Pie Chart dummy Data
  const pieData = [
    { name: "Electronics", population: 400, color: "#3498db", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Clothing", population: 300, color: "#e74c3c", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Furniture", population: 200, color: "#2ecc71", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Misc", population: 100, color: "#f39c12", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  ];

  const chartWidth = Dimensions.get("window").width - 20;

  return (
    <SafeAreaView style={[tw`flex-1 p-5`, darkMode ? tw`bg-black` : tw`bg-white`]}>
      <View style={[styles.container, darkMode && { backgroundColor: "#1F2937" }]}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#00bcd4" />
          </Pressable>
          <Text style={[styles.headerText, darkMode && { color: "#00bcd4" }]}>Item Analytics</Text>
        </View>
        <ScrollView>
         
          <Text style={[styles.chartTitle, darkMode && { color: "white" }]}>Inventory Trend</Text>
          <LineChart
            data={{ labels: dates, datasets: [{ data: inventoryTrends }] }}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundGradientFrom: darkMode ? "#1e293b" : "#ffffff",
              backgroundGradientTo: darkMode ? "#0f172a" : "#f4f4f4",
              color: (opacity = 1) => `rgba(6, 182, 212, ${opacity})`,
              labelColor: (opacity = 1) =>
                darkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
            }}
            bezier
            style={{ marginVertical: 10, borderRadius: 10 }}
          />

         
          <Text style={[styles.chartTitle, darkMode && { color: "white" }]}>Total Inventory Value</Text>
          <BarChart
            data={{ labels: dates, datasets: [{ data: totalValueTrends }] }}
            width={350}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="" 
            chartConfig={{
              backgroundGradientFrom: darkMode ? "#1F2937" : "#fff",
              backgroundGradientTo: darkMode ? "#1F2937" : "#fff",
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: (opacity = 1) =>
                darkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
            }}
            verticalLabelRotation={30}
            style={{ marginVertical: 10, borderRadius: 10 }}
          />

        
          <Text style={[styles.chartTitle, darkMode && { color: "white" }]}>Category Distribution</Text>
          <PieChart
            data={pieData}
            width={chartWidth}
            height={220}
            chartConfig={{ color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` }}
            accessor="population"
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
