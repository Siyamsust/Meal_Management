import React, { useState,useContext } from 'react';
import Constants from 'expo-constants';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper'; // Import the progress bar
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Loginstyle';
import AllInputSection from '../../LoginPage/AllInputs';
import { AuthContext } from '../../../Context/Authcontext';
//import SocialLoginOption from '../../LoginPage/SocialLoginOption';
//import BASE_URL from '../../Constants/Base URL/BaseURL';
const LoginPage = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [loginError, setLoginError] = useState(null); // For error messages
  // const BASE_URL = process.env.BASE_URL || 'http://192.168.0.111:5000';
  const navigation = useNavigation();
  const{login} =useContext(AuthContext);
  const handleLogin = async () => {
    console.log('waiting');
   await login({email,password});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        {/* Background gradient */}
        <View style={styles.gradientBackground} />

        {/* Logo and welcome text */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(1000).springify()} 
          style={styles.header}
        >
          <Image 
            source={{ uri: 'https://img.icons8.com/ios/452/uber.png' }} 
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subText}>Sign in to continue</Text>
        </Animated.View>

        {/* Login form */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(1000).springify()}
          style={styles.formContainer}
        >
        

        <AllInputSection 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />

         

          {isLoading ? (
            // Show the progress bar while loading
            <ProgressBar indeterminate color="#2563eb" style={styles.progressBar} />
          ) : (
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          )}

          {/* Social login options */}
         {/* <SocialLoginOption></SocialLoginOption> */}

          {/* Sign up link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;


