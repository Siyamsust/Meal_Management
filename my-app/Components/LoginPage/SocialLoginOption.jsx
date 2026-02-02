import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import styles from '../Screens/loginPage/Loginstyle'

const SocialLoginOption = () => {
    return (
        <View>
             {/* Social login options */}
          <View style={styles.socialLogin}>
            <Text style={styles.orText}>Or continue with</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="apple" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
}
export default SocialLoginOption;
