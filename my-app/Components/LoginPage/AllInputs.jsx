import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';  // Importing MaterialCommunityIcons
import styles from '../Screens/loginPage/Loginstyle'
const AllInputSection = ({ email, setEmail, password, setPassword, showPassword, setShowPassword }) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <MaterialCommunityIcons 
            name={showPassword ? "eye-outline" : "eye-off-outline"} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default AllInputSection;
