import React, { useContext, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import Memberhome from "../member_home/Memberhome";
import { View, Text } from "react-native";
import Settings from "../Settings/Settings";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../../../Context/Authcontext";
import Modali from "./Modal";
import AddCash from "../../Modals/AddCashModal/AddCashModal";
import CreateMessModal from "../../CreateMessModal/CreateMessModal";
import ManagerDashboard from "../Manager_home/Manager_home";
import AddMeal from "../../Modals/AddMealModal/AddMeadlModal";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();

const PlusButtonScreen = () => null;
const CashbuttonClicked = () => null;
const AddmealClicked = () => null;

export default function TabNavigator() {
  // ✅ AuthContext থেকে সরাসরি userData নাও
  const { isLoggedIn, userData, updateUserData } = useContext(AuthContext);

  // ✅ শুধু modal states
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showCreateMessModal, setShowCreateMessModal] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);
  const [showAddmealModal, setshowAddmealModal] = useState(false);

  console.log("=== TabNavigator Render ===");
  console.log("userData:", userData);
  console.log("isManager:", userData?.isManager);
  console.log("========================");
  useEffect (()=>{
    
  },[userData]);
  const handleCashClick = () => {
    setShowCashModal(true);
  };

  // ✅ updateUserData ব্যবহার
  const handleMessCreated = async (updatedUser) => {
    await updateUserData(updatedUser);
    setShowCreateMessModal(false);
  };

  const handlePlusClick = () => {
    setShowOptionsModal(true);
  };

  const handleAddMealClick = () => {
    setshowAddmealModal(true);
  };

  const handleCloseOptionsModal = () => {
    setShowOptionsModal(false);
  };

  const handleJoinMess = () => {
    setShowOptionsModal(false);
    console.log("Join Mess clicked");
  };

  const handleCreateMessModal = () => {
    setShowOptionsModal(false);
    setShowCreateMessModal(true);
  };

  // ✅ userData না থাকলে loading
  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  return (
    <>
      {/* ✅ key prop দিলে isManager বদলালে Navigator নতুন করে তৈরি হবে */}
      <Tab.Navigator
        key={userData?.isManager ? "manager" : "member"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home-outline";
            else if (route.name === "Chat") iconName = "chatbubbles-outline";
            else if (route.name === "Cash") iconName = "cash-outline";
            else if (route.name === "settings") iconName = "settings-outline";
            else if (route.name === "Activity") iconName = "list-outline";
            else if (route.name === "AddMess") iconName = "add-circle-outline";
            else if (route.name === "AddMeal") iconName = "add-circle-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#FF6600",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        {userData?.isManager ? (
          <Tab.Screen
            name="Home"
            children={() => <ManagerDashboard userData={userData} />}
          />
        ) : (
          <Tab.Screen
            name="Home"
            children={() => <Memberhome userData={userData} />}
          />
        )}

        {userData?.isManager && (
          <Tab.Screen
            name="Cash"
            component={CashbuttonClicked}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                handleCashClick();
              },
            }}
            options={{
              tabBarLabel: "Cash",
            }}
          />
        )}

        {userData?.isManager && (
          <Tab.Screen
            name="AddMeal"
            component={AddmealClicked}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                handleAddMealClick();
              },
            }}
            options={{
              tabBarLabel: "AddMeal",
            }}
          />
        )}

        {userData?.mess ? (
          <Tab.Screen
            name="Activity"
            children={() => <Memberhome userData={userData} />}
          />
        ) : (
          <Tab.Screen
            name="AddMess"
            component={PlusButtonScreen}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                handlePlusClick();
              },
            }}
            options={{
              tabBarLabel: "Add Mess",
            }}
          />
        )}

        <Tab.Screen
          name="Chat"
          children={() => <Memberhome userData={userData} />}
        />
        <Tab.Screen name="settings" component={Settings} />
      </Tab.Navigator>

      <Modali
        showOptionsModal={showOptionsModal}
        onClose={handleCloseOptionsModal}
        onJoinMess={handleJoinMess}
        onCreateMess={handleCreateMessModal}
      />
      <AddCash
        showCashModal={showCashModal}
        onClose={() => setShowCashModal(false)}
        userData={userData}
      />
      <AddMeal
        showMealModal={showAddmealModal}
        onClose={() => setshowAddmealModal(false)}
        userData={userData}
      />
      <CreateMessModal
        visible={showCreateMessModal}
        onClose={() => setShowCreateMessModal(false)}
        userData={userData}
        onMessCreated={handleMessCreated}
      />
    </>
  );
}