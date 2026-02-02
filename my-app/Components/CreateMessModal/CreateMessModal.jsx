import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../Screens/Stackscreen/style";

export default function CreateMessModal({ 
  visible, 
  onClose, 
  userData,
  onMessCreated 
}) {
  const [messName, setMessName] = useState("");
  const [creatingMess, setCreatingMess] = useState(false);

  const handleCreateMess = async () => {
    if (!messName.trim()) {
      alert("Please enter a mess name");
      return;
    }

    setCreatingMess(true);

    try {
      const token = await AsyncStorage.getItem('authToken');
      
      const response = await fetch('http://192.168.0.110:3000/api/mess/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: messName.trim(),
          member: userData.id || userData._id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update user data with new messId
        const updatedUser = { ...userData, mess: data.mess };
        await AsyncStorage.setItem('userId', JSON.stringify(updatedUser));
        
        // Reset and close
        setMessName("");
        
        // Notify parent component
        if (onMessCreated) {
          onMessCreated(updatedUser);
        }
        
        onClose();
        alert("Mess created successfully!");
      } else {
        alert(data.message || "Failed to create mess");
      }
    } catch (error) {
      console.error('Error creating mess:', error);
      alert("An error occurred while creating mess");
    } finally {
      setCreatingMess(false);
    }
  };

  const handleClose = () => {
    setMessName("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create New Mess</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubtitle}>
            Enter a name for your mess
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mess Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Sunrise Hostel Mess"
              value={messName}
              onChangeText={setMessName}
              maxLength={50}
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.inputHint}>
              Choose a unique name that describes your mess
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.createButton,
              (!messName.trim() || creatingMess) && styles.createButtonDisabled
            ]}
            onPress={handleCreateMess}
            disabled={!messName.trim() || creatingMess}
          >
            {creatingMess ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                <Text style={styles.createButtonText}>Create Mess</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleClose}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}