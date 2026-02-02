import { View, Modal, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Add this import
import styles from "./style";

export default function Modali({ 
  showOptionsModal, 
  onClose, 
  onJoinMess, 
  onCreateMess 
}) {
  return (
    <Modal
      visible={showOptionsModal}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Mess Options</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubtitle}>
            Choose an option to get started
          </Text>

          <TouchableOpacity 
            style={styles.optionButton}
            onPress={onJoinMess}
          >
            <Ionicons name="people-outline" size={24} color="#6366F1" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Join a Mess</Text>
              <Text style={styles.optionDescription}>
                Join an existing mess with an invite code
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionButton}
            onPress={onCreateMess}
          >
            <Ionicons name="add-circle-outline" size={24} color="#8B5CF6" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Create a Mess</Text>
              <Text style={styles.optionDescription}>
                Start a new mess and invite others
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}