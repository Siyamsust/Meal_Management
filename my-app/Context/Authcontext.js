import React, { createContext, useState, useEffect, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Alert } from 'react-native';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {API_URL}=Constants.expoConfig.extra;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);
  useEffect(() => {
   
    checkToken();
  }, []);
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const id = await AsyncStorage.getItem('userId');
      
      if (token) {
        console.log('token', token);
        console.log('gmail', id);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking token:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };
  const login=async({email,password})=>{
    setIsLoading(true);
    setLoginError(null);

    try {
      console.log("how",API_URL)
      const response = await fetch(`http://192.168.0.101:3000/api/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      console.log('Server response:', data);

      // Backend returns { token, user } on success (no `success` flag)
      if (response.ok && data?.token) {
        // Make sure token exists in response
        if (!data.token) {
          throw new Error('Token not received from server');
        }

        // Store auth data
        await AsyncStorage.multiSet([
          ["authToken", data.token],
          ["userId", JSON.stringify(data.user)]
        ]);
        
        // Verify stored data
        const storedToken = await AsyncStorage.getItem("authToken");
        let storedId = await AsyncStorage.getItem("userId");
          
        setIsLoggedIn(true);
        console.log('Stored auth data:', {
          token: storedToken,
          userId: storedId
        });

        Alert.alert('Signed in successfully'+storedId);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      } else {
        console.log("Login failed:", data?.message);
        Alert.alert(data?.message || 'Login failed');
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error during sign-in", error.toString());
    } finally {
      setIsLoading(false);
    }
  }
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      setIsLoggedIn(false);
      console.log("is logged in"+isLoggedIn);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout, isLoading,login }}>
      {children}
    </AuthContext.Provider>
  );
};
