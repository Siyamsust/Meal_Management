import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import Memberhome from "../member_home/Memberhome";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Settings from "../Settings/Settings";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../../../Context/Authcontext";
import Modali from "./Modal";
import CreateMessModal from "../../CreateMessModal/CreateMessModal";
const Tab = createBottomTabNavigator();

// Dummy component for Plus button
const PlusButtonScreen = () => null;

export default function TabNavigator() {
  const { isLoggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showCreateMessModal, setShowCreateMessModal] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem('userId');
      if (userString) {
        const user = JSON.parse(userString);
        setUserData(user);
        console.log('User Data:', user);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log("TabNavigator isLoggedIn:", isLoggedIn);
  console.log("User Data:", userData);
  console.log("User Mess:",userData.mess.managerId);
  const handleMessCreated = (updatedUser) => {
    setUserData(updatedUser);
    setShowCreateMessModal(false);
  };
  // Handler: When Plus icon is clicked
  const handlePlusClick = () => {
    setShowOptionsModal(true);
  };

  // Handler: Close options modal
  const handleCloseOptionsModal = () => {
    setShowOptionsModal(false);
  };

  // Handler: When "Join Mess" is clicked
  const handleJoinMess = () => {
    setShowOptionsModal(false);
    console.log("Join Mess clicked");
    // TODO: Navigate to Join Mess screen or show Join Mess modal
    // navigation.navigate('JoinMessScreen');
  };

  // Handler: When "Create Mess" is clicked
  const handleCreateMessModal = () => {
    setShowOptionsModal(false);
    setShowCreateMessModal(true);
  };

  // Show loading indicator while fetching user data
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  return (
    <>
      <Tab.Navigator
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
        <Tab.Screen name="Home" component={Memberhome} />
      { userData.mess.managerId===userData._id&&<Tab.Screen name="Cash" component={Memberhome} />

}
{ userData.mess.managerId===userData._id&&<Tab.Screen name="AddMeal" component={Memberhome} />
}
        {userData?.mess ? (
          <Tab.Screen name="Activity" component={Memberhome} />
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
        
        <Tab.Screen name="Chat" component={Memberhome} />
        <Tab.Screen name="settings" component={Settings} />
      </Tab.Navigator>

      {/* Options Modal */}
      <Modali
        showOptionsModal={showOptionsModal}
        onClose={handleCloseOptionsModal}
        onJoinMess={handleJoinMess}
        onCreateMess={handleCreateMessModal}
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