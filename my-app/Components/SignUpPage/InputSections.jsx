import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have this package installed
import styles from '../Screens/signupPage/SignUpStyle';
import PhoneInput from 'react-native-phone-number-input';
const Allinputsection = ({ fullName, setFullName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,showPassword,showConfirmPassword ,setShowConfirmPassword,setShowPassword,phoneInput,phoneNumber,countryCode,setPhoneNumber}) => {


  return (
    <>
      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="#666" style={styles.inputIcon} />
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
        <MaterialIcons name="lock" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
          <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.phoneInputContainer}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode={countryCode}
                onChangeFormattedText={setPhoneNumber}
                withCountryPicker
                withCallingCode
              />
            </View>
    </>
  );
};

export default Allinputsection;
