import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './Memberhome.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
export default function Memberhome() {
  const navigate = useNavigation();

  const summaryData = {
    currentBalance: 250.00,
    totalMeals: 12,
    totalExpense: 200.00,
    shoppingCost: 150.00,
  };

  const mealTrends = [
    { day: 'M', count: 6 },
    { day: 'T', count: 2 },
    { day: 'W', count: 5 },
    { day: 'T', count: 8 },
    { day: 'F', count: 4 },
    { day: 'S', count: 8 },
    { day: 'S', count: 3 },
  ];

  const expenseBreakdown = [
    { category: 'Meal', amount: 120, color: '#4A90E2', percentage: 60 },
    { category: 'Shopping', amount: 50, color: '#2E5C8A', percentage: 25 },
    { category: 'Others', amount: 30, color: '#7BB3F0', percentage: 15 },
  ];

  const recentActivity = [
    { date: 'Apr 24', type: 'Deposited', amount: 100.00 },
    { date: 'Apr 23', type: 'Meal', amount: 15.00 },
    { date: 'Apr 22', type: 'Shopping', amount: 35.00 },
  ];

  const maxMealCount = Math.max(...mealTrends.map(m => m.count));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.quickStatsContainer}>
          <Text style={styles.dashboardTitle}>Dashboard</Text>

          {/* Summary Cards */}
          <View style={styles.summaryCards}>
            <View style={styles.card}>
              <Text style={styles.cardValue}>${summaryData.currentBalance.toFixed(2)}</Text>
              <Text style={styles.cardLabel}>Current Balance</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardValue}>{summaryData.totalMeals}</Text>
              <Text style={styles.cardLabel}>Total Meals</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardValue}>${summaryData.totalExpense.toFixed(2)}</Text>
              <Text style={styles.cardLabel}>Total Expense</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardValue}>${summaryData.shoppingCost.toFixed(2)}</Text>
              <Text style={styles.cardLabel}>Shopping Cost</Text>
            </View>
          </View>
        </View>

        {/* Charts Section */}
        <View style={styles.chartsSection}>
          {/* Meal Trends Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Meal Trends</Text>
            <View style={styles.barChartContainer}>
              <View style={styles.barChartYAxis}>
                <Text style={styles.axisLabel}>12</Text>
                <Text style={styles.axisLabel}>8</Text>
                <Text style={styles.axisLabel}>4</Text>
                <Text style={styles.axisLabel}>0</Text>
              </View>
              <View style={styles.barChartBars}>
                {mealTrends.map((item, index) => (
                  <View key={index} style={styles.barChartItem}>
                    <View style={styles.barChartColumn}>
                      <View
                        style={[
                          styles.barChartBar,
                          {
                            height: `${(item.count / maxMealCount) * 100}%`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.barChartLabel}>{item.day}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Expense Breakdown Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Expense Breakdown</Text>
            <View style={styles.donutChartContainer}>
              <View style={styles.progressCirclesContainer}>
                {expenseBreakdown.map((item, index) => (
                  <View key={index} style={styles.progressCircleWrapper}>
                    <View style={[styles.progressCircle, { borderWidth: 4, borderColor: item.color }]}>
                      <Text style={styles.progressPercentage}>{item.percentage}%</Text>
                    </View>
                    <Text style={styles.progressLabel}>{item.category}</Text>
                    <Text style={styles.progressAmount}>${item.amount}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.chartTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityLeft}>
                  <View>
                    <Text style={styles.activityType}>{activity.type}</Text>
                    <Text style={styles.activityDate}>{activity.date}</Text>
                  </View>
                </View>
                <Text style={styles.activityAmount}>
                  ${activity.amount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

