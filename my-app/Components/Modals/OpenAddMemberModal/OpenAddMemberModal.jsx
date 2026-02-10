import { View, Modal, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Add this import
import styles from "./style";

export default function OpenAddMemberModal({ 
  showAddModal, 
  onClose, 
  onAcceptMember, 
  onInviteMember 
}) {
  return (
    <Modal
      visible={showAddModal}
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
            Choose an option to add a member
          </Text>

          <TouchableOpacity 
            style={styles.optionButton}
            onPress={onAcceptMember}
          >
            <Ionicons name="people-outline" size={24} color="#6366F1" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Accept Member Request</Text>
              <Text style={styles.optionDescription}>
                Accept a member request to join the mess
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionButton}
            onPress={onInviteMember}
          >
            <Ionicons name="add-circle-outline" size={24} color="#8B5CF6" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Add Member</Text>
              <Text style={styles.optionDescription}>
                Add a new member to the mess
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}