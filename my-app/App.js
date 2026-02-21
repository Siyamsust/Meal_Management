import { StackScreens } from "./Components/Screens/Stackscreen/Stackscreens";
import React, { useContext, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, AuthContext } from "./Context/Authcontext";
import { navigationRef } from "./utils/NavigationService";

const Appcontent=()=>{
  const {isLoggedIn}=useContext(AuthContext);
  const onReady = () => {
    const currentRoute = navigationRef.current?.getCurrentRoute();
    console.log('Current Route:', currentRoute?.name);
    
    // Get navigation state
    const state = navigationRef.current?.getRootState();
    console.log('Full Navigation State:', JSON.stringify(state, null, 2));
    
    // Function to get all route names recursively
    const getAllRouteNames = (state) => {
      const names = [];
      if (state.routes) {
        state.routes.forEach(route => {
          names.push(route.name);
          if (route.state) {
            names.push(...getAllRouteNames(route.state));
          }
        });
      }
      return names;
    };
    
    const allRoutes = getAllRouteNames(state);
    console.log('All Screen Names:', allRoutes);
  };
  return (
    <NavigationContainer ref={navigationRef}>
            <StackScreens  />
          </NavigationContainer>
  );
}

export default function App() {
return(
  <GestureHandlerRootView style={{ flex: 1 }}>
  <AuthProvider>
    <Appcontent />
  </AuthProvider>
</GestureHandlerRootView>
);
  
  }
  


  


