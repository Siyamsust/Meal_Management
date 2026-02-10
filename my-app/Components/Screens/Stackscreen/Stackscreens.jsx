
import React,{useContext,useState,useEffect} from "react";
import { ActivityIndicator } from "react-native-paper";
import Memberhome from "../member_home/Memberhome";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from "../loginPage/loginPage";
import SignUpPage from "../signupPage/signupPage"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Settings from "../Settings/Settings"
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../../../Context/Authcontext";
import TabNavigator from "./Tabnavigator";
import ManagerDashboard from "../Manager_home/Manager_home";


const Stack = createStackNavigator();

export const StackScreens = () => {
  let {isLoggedIn}=useContext(AuthContext);
  return(
  <Stack.Navigator screenOptions={{ headerShown: false }}>

  {!isLoggedIn && (
   <>
      <Stack.Screen name="Login" component={LoginPage} />
     <Stack.Screen name="SignUp" component={SignUpPage} />
   </>
 )}
     
     <Stack.Screen name="MainTabs">
          {(props) => <TabNavigator {...props}  />}
        </Stack.Screen>
</Stack.Navigator>
  );
};