import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import styles from './settings.style';
import React,{useContext} from 'react'
import { AuthContext } from '../../Context/Authcontext';
const Settings= () => {
    const navigation = useNavigation();
    const{logout}=useContext(AuthContext);
    // Handle Logout Function
    const handleLogout = async () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Log Out", 
                            onPress: async () => {
                        try{
                            await logout();
                            console.log("user logged out");
                        }
                        catch (e)
                        {
                          console.log("logout error", e);
                        }
                    } 
                }
            ]
        );
    };

    const menuItems = [
        {
            icon: "log-out-outline",
            title: "Log Out",
            subtitle: "Sign out of your account",
            onPress: handleLogout, // Handle logout confirmation
            iconBg: "#FFEBEE",
            iconColor: "#D32F2F"
        }
    ];

    return (
        <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
                <TouchableOpacity 
                    key={index}
                    style={styles.menuItem}
                    onPress={item.onPress }
                >
                    <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                        <Ionicons name={item.icon} size={24} color={item.iconColor} />
                    </View>
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.menuText}>{item.title}</Text>
                        <Text style={styles.subText}>{item.subtitle}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Settings;
