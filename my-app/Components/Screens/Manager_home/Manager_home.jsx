import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Manager_home.styles";
import OpenAddMemberModal from "../../Modals/OpenAddMemberModal/OpenAddMemberModal";
import AddMemberModal from "../../Modals/AddMemberModal/AddMemberModal";
import ChangeManagerModal from "../../Modals/ChangeManagerModal/ChangeManagerModal";
export default function ManagerDashboard({userData}) {
  const [activeTab, setActiveTab] = useState("shopping");
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showChangeManagerModal, setShowChangeManagerModal] = useState(false);
  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);
  const [showAcceptMemberModal, setShowAcceptMemberModal] = useState(false);
  const shouldOpenInviteModal = useRef(false);
  const members = [
    { name: "Siyam", meals: 25, expense: 1200, paid: 1500 },
    { name: "Rafi", meals: 22, expense: 1100, paid: 1000 },
    { name: "Tareq", meals: 27, expense: 1350, paid: 1500 },
  ];

  const shoppingData = [
    { item: "Rice", cost: 800, date: "2025-11-05", doneBy: "Siyam" },
    { item: "Vegetables", cost: 450, date: "2025-11-06", doneBy: "Rafi" },
  ];

  const deposits = [
    { name: "Siyam", amount: 1500, date: "2025-11-01" },
    { name: "Rafi", amount: 1000, date: "2025-11-03" },
  ];
  // Handle modal transition: when OpenAddMemberModal closes, open AddMemberModal if needed
  useEffect(() => {
    if (!showAddMemberModal && shouldOpenInviteModal.current) {
      // Small delay to ensure first modal is fully closed
      const timer = setTimeout(() => {
        setShowInviteMemberModal(true);
        shouldOpenInviteModal.current = false;
        console.log("invite member modal open");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showAddMemberModal]);

  const handleAddMember = () => {
    setShowAddMemberModal(true);
    shouldOpenInviteModal.current = false;
  };
  
  const handleInviteMember = () => {
    shouldOpenInviteModal.current = true;
    setShowAddMemberModal(false);
  };
  
  const handleCloseAddMemberModal = () => {
    setShowAddMemberModal(false);
    shouldOpenInviteModal.current = false;
  };
  const handleChangeMangerModal = () => {
    setShowChangeManagerModal(true);
    
  };
  
  const handleAcceptMember = () => {
    setShowAddMemberModal(false);
    shouldOpenInviteModal.current = false;
  };
  
  const handleCloseInviteMemberModal = () => {
    setShowInviteMemberModal(false);
    shouldOpenInviteModal.current = false;
  };
  const handleCloseChangeManagerModal= ()=>{
    setShowChangeManagerModal(false);
  }
  
  const totalExpense = members.reduce((sum, m) => sum + m.expense, 0);
  const totalMeals = members.reduce((sum, m) => sum + m.meals, 0);
  const totalDeposits = deposits.reduce((sum, d) => sum + d.amount, 0);
  const mealRate = (totalExpense / totalMeals).toFixed(2);
  console.log(userData);
  const renderTable = (headers, rows, renderRow) => {
    return (
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          {headers.map((header, index) => (
            <Text key={index} style={styles.tableHeaderCell}>
              {header}
            </Text>
          ))}
        </View>
        {rows.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={[
              styles.tableRow,
              rowIndex === rows.length - 1 && styles.tableRowLast,
            ]}
          >
            {renderRow(row, rowIndex)}
          </View>
        ))}
      </View>
    );
  };

  return (
    <>
    <OpenAddMemberModal
      showAddModal={showAddMemberModal} 
      onClose={handleCloseAddMemberModal}
      onAcceptMember={handleAcceptMember}
      onInviteMember={handleInviteMember}
    />
    <AddMemberModal
     visible={showInviteMemberModal}
     onClose={handleCloseInviteMemberModal}
     userData={userData}
     onMemberAdded={(data) => {
       // Close the modal after member is added
       setShowInviteMemberModal(false);
       // You can add additional logic here if needed, like refreshing member list
       console.log("Member added successfully:", data);
     }}
    />
    <ChangeManagerModal 
    showChangeManagerModal={showChangeManagerModal}
    onClose={handleCloseChangeManagerModal}
    userData={userData}
    />
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{userData?.mess?.name}</Text>
            <Text style={styles.dashboardsub}>{userData?.name} (Manager)</Text>
          </View>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonChangeManager]}
            onPress={() => {
              // Handle Add/Accept Member action
              handleChangeMangerModal();
            }}
          >
            <Ionicons name="person-outline" size={16} color="#FFFFFF" />
            <Text style={[styles.actionButtonText, styles.actionButtonTextWhite]}>Change Manager</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryCards}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Total Expense</Text>
            </View>
            <Text style={styles.cardContentRed}>{totalExpense} ৳</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Meal Rate</Text>
            </View>
            <Text style={styles.cardContentBlue}>{mealRate} ৳</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Total Meals</Text>
            </View>
            <Text style={styles.cardContentGreen}>{totalMeals}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Total Deposits</Text>
            </View>
            <Text style={styles.cardContentYellow}>{totalDeposits} ৳</Text>
          </View>
        </View>

        {/* Main Section */}
        <View>
          {/* Left: Member Overview */}
          <View style={[styles.detailCard, { marginBottom: 16 }]}>
            <View style={styles.detailCardHeader}>
              <Text style={styles.detailCardTitle}>Member Overview</Text>
              <TouchableOpacity
                style={[styles.actionButton, styles.actionButtonAddMember]}
                onPress={() => {
                  // Handle Add/Accept Member action
                  handleAddMember();
                }}
              >
                <Ionicons name="person-add-outline" size={16} color="#FFFFFF" />
                <Text style={[styles.actionButtonText, styles.actionButtonTextWhite]}>
                  Add Member
                </Text>
              </TouchableOpacity>
            </View>
            {renderTable(
              ["Name", "Meals", "Expense", "Paid"],
              members,
              (member) => [
                <Text key="name" style={styles.tableCell}>
                  {member.name}
                </Text>,
                <Text key="meals" style={styles.tableCell}>
                  {member.meals}
                </Text>,
                <Text key="expense" style={styles.tableCell}>
                  {member.expense} ৳
                </Text>,
                <Text key="paid" style={styles.tableCell}>
                  {member.paid} ৳
                </Text>,
              ]
            )}
          </View>

          {/* Right: Tabs */}
          <View style={styles.detailCard}>
            <View style={styles.detailCardHeader}>
              <Text style={styles.detailCardTitle}>Details</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === "shopping" && styles.tabActive]}
                onPress={() => setActiveTab("shopping")}
              >
                <Ionicons
                  name="cart-outline"
                  size={16}
                  color={activeTab === "shopping" ? "#0F172A" : "#64748B"}
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "shopping" && styles.tabTextActive,
                  ]}
                >
                  Shopping
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, activeTab === "deposit" && styles.tabActive]}
                onPress={() => setActiveTab("deposit")}
              >
                <Ionicons
                  name="cash-outline"
                  size={16}
                  color={activeTab === "deposit" ? "#0F172A" : "#64748B"}
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "deposit" && styles.tabTextActive,
                  ]}
                >
                  Deposits
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "myexpense" && styles.tabActive,
                ]}
                onPress={() => setActiveTab("myexpense")}
              >
                <Ionicons
                  name="cafe-outline"
                  size={16}
                  color={activeTab === "myexpense" ? "#0F172A" : "#64748B"}
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "myexpense" && styles.tabTextActive,
                  ]}
                >
                  My Expense
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tab Content */}
            <View style={styles.tabContent}>
              {activeTab === "shopping" && (
                <>
                  {renderTable(
                    ["Item", "Cost", "Date", "By"],
                    shoppingData,
                    (item) => [
                      <Text key="item" style={styles.tableCell}>
                        {item.item}
                      </Text>,
                      <Text key="cost" style={styles.tableCell}>
                        {item.cost} ৳
                      </Text>,
                      <Text key="date" style={styles.tableCell}>
                        {item.date}
                      </Text>,
                      <Text key="by" style={styles.tableCell}>
                        {item.doneBy}
                      </Text>,
                    ]
                  )}
                </>
              )}

              {activeTab === "deposit" && (
                <>
                  {renderTable(
                    ["Name", "Amount", "Date"],
                    deposits,
                    (deposit) => [
                      <Text key="name" style={styles.tableCell}>
                        {deposit.name}
                      </Text>,
                      <Text key="amount" style={styles.tableCell}>
                        {deposit.amount} ৳
                      </Text>,
                      <Text key="date" style={styles.tableCell}>
                        {deposit.date}
                      </Text>,
                    ]
                  )}
                </>
              )}

              {activeTab === "myexpense" && (
                <View style={styles.expenseContent}>
                  <Text style={styles.expenseText}>
                    Total: <Text style={styles.expenseValue}>1200 ৳</Text>
                  </Text>
                  <Text style={styles.expenseDate}>Last update: 2025-11-06</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}
