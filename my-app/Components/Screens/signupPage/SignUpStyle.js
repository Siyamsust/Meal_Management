import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    gradientBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: Dimensions.get('window').height * 0.35, // Reduced height for better fit
      backgroundColor: '#2563eb',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    header: {
      alignItems: 'center',
      marginTop: 20, // Reduced top margin
    },
    logo: {
      width: 80, // Adjusted size
      height: 80,
      marginBottom: 10, // Reduced space below logo
    },
    welcomeText: {
      fontSize: 24, // Reduced font size slightly
      fontWeight: 'bold',
      color: '#fff',
    },
    formContainer: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 20, // Reduced margin to fit more on screen
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingHorizontal: 20, // Reduced padding
      paddingTop: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      borderRadius: 10,
      marginBottom: 12, // Reduced margin
      paddingHorizontal: 12,
      height: 50, // Adjusted height
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: '#333',
    },
    signupButton: {
      backgroundColor: '#2563eb',
      borderRadius: 10,
      height: 50, // Reduced height
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15, // Reduced margin
    },
    signupButtonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 'bold',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15, // Reduced spacing
    },
    loginText: {
      color: '#666',
      fontSize: 14, // Adjusted font size
    },
    loginLink: {
      color: '#2563eb',
      fontWeight: 'bold',
      fontSize: 14,
    },
});

export default styles;
