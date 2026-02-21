import React, { useState, useRef, useEffect } from 'react';
import Constants from 'expo-constants';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  Image, 
  Alert, 
  ScrollView, 
  Animated, 
  ActivityIndicator 
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SignUpStyle';
import Allinputsection from '../../SignUpPage/InputSections';
import { isValidEmail, isValidPassword, isValidPhoneNumber } from '../../../function/checkSignUpValidity';
//import BASE_URL from '../../Constants/Base URL/BaseURL';
const SignUpPage = ({ navigation }) => {
  const phoneInput = useRef();
   const {API_URL}=Constants.expoConfig.extra;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  //const [countryCode, setCountryCode] = useState('US');
  //const [callingCode, setCallingCode] = useState('+1');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 🔹 Loading state added

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  {/*const onSelectCountry = (country) => {
    setCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setPhoneNumber('');
  };*/}

  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Error', 'Password should be at least 8 characters long and contain at least one number.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const phoneNumberWithCountryCode =  phoneNumber;
    if (!isValidPhoneNumber(phoneInput, phoneNumberWithCountryCode)) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }

    setIsLoading(true); // 🔹 Start showing progress bar

    const userData = { fullName, email, password, confirmPassword, phoneNumber};

    try {
      console.log(API_URL);
      const response = await fetch(`http://${API_URL}/api/users/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.multiSet([
          ["authToken", data.token],
          ["userId", data.user],
        ]);

        Alert.alert(data.message);
        
        setIsLoading(false); // 🔹 Hide progress bar

        // Reset navigation to MainTabs (Home Screen)
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      } else {
        const data = await response.json();
        Alert.alert(data.message);
        setIsLoading(false); // 🔹 Hide progress bar
      }
    } catch (error) {
      Alert.alert('Error during signup:', error.message);
      console.log('Error during signup:', error.message);
      setIsLoading(false); // 🔹 Hide progress bar
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Animated.View style={[styles.gradientBackground, { opacity: fadeAnim }]} />
          <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
            <Image source={{ uri: 'https://img.icons8.com/ios/452/uber.png' }} style={styles.logo} />
            <Text style={styles.welcomeText}>Create Account</Text>
          </Animated.View>

          <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
            <Allinputsection 
              fullName={fullName} setFullName={setFullName} 
              email={email} setEmail={setEmail} 
              password={password} setPassword={setPassword} 
              confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} 
              showConfirmPassword={showConfirmPassword} showPassword={showPassword} 
              setShowPassword={setShowPassword} setShowConfirmPassword={setShowConfirmPassword} 
              phoneInput={phoneInput} 
              phoneNumber={phoneNumber} 
               
              setPhoneNumber={setPhoneNumber} 
            />

            <TouchableOpacity 
              style={styles.signupButton} 
              onPress={handleSignup} 
              disabled={isLoading} // 🔹 Disable button while loading
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFF" /> // 🔹 Show loading spinner
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>  
  );
};

export default SignUpPage;
