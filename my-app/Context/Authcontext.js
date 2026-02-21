import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Alert } from 'react-native';
import { navigationRef } from '../utils/NavigationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { API_URL } = Constants.expoConfig.extra;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const updateUserData = async (newData) => {
    try {
      console.log("=== updateUserData CALLED ===");
      console.log("newData received:", newData);
      console.log("newData.isManager:", newData.isManager);

      await AsyncStorage.setItem('userId', JSON.stringify(newData));
      setUserData(newData);

      console.log("=== setUserData DONE ===");
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const id = await AsyncStorage.getItem('userId');

      if (token) {
        console.log('token', token);
        console.log('gmail', id);
        try {
          const parsed = id ? JSON.parse(id) : null;
          setUserData(parsed);
        } catch (e) {
          console.warn('Failed to parse stored userId', e);
        }
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

  const login = async ({ email, password }, navigation) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      console.log("how", API_URL);
      const response = await fetch(`http://${API_URL}/api/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok && data?.token) {
        if (!data.token) {
          throw new Error('Token not received from server');
        }

        await AsyncStorage.multiSet([
          ["authToken", data.token],
          ["userId", JSON.stringify(data.user)]
        ]);

        const storedToken = await AsyncStorage.getItem("authToken");
        let storedId = await AsyncStorage.getItem("userId");
        setIsLoggedIn(true);

        try {
          setUserData(JSON.parse(storedId));
        } catch (e) {
          console.warn('Unable to set userData in context', e);
        }

        console.log('Stored auth data:', {
          token: storedToken,
          userId: storedId
        });

        setTimeout(() => {
          if (navigationRef.current) {
            navigationRef.current.reset({
              index: 0,
              routes: [{ name: 'MainTabs' }],
            });
          }
        }, 50);
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
  };

  const logout = async (navigation) => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      setUserData(null);
      setIsLoggedIn(false);
      console.log('User logged out, isLoggedIn set to', false);

      setTimeout(() => {
        if (navigationRef.current) {
          navigationRef.current.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      }, 50);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      updateUserData,
      setIsLoggedIn,
      userData,
      setUserData,
      logout,
      isLoading,
      login
    }}>
      {children}
    </AuthContext.Provider>
  );
};