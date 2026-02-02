
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
      height: Dimensions.get('window').height * 0.4,
      backgroundColor: '#2563eb',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    header: {
      alignItems: 'center',
      marginTop: 45,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
    },
    subText: {
      fontSize: 16,
      color: '#fff',
      opacity: 0.8,
    },
    formContainer: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 40,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 24,
      paddingTop: 30,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      borderRadius: 12,
      marginBottom: 16,
      paddingHorizontal: 16,
      height: 55,
    },
    inputIcon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    eyeIcon: {
      padding: 4,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 24,
    },
    forgotPasswordText: {
      color: '#2563eb',
      fontSize: 14,
    },
    loginButton: {
      backgroundColor: '#2563eb',
      borderRadius: 12,
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      shadowColor: '#2563eb',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    socialLogin: {
      alignItems: 'center',
      marginTop: 20,
    },
    orText: {
      color: '#666',
      marginBottom: 16,
    },
    socialButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
    },
    socialButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#f3f4f6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 30,
    },
    signupText: {
      color: '#666',
    },
    signupLink: {
      color: '#2563eb',
      fontWeight: 'bold',
    },
  });

  export default styles