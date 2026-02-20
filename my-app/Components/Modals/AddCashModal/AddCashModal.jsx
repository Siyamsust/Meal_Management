import { View, Modal, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useState, useEffect,useContext } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getApiBase from "../../../utils/apiBase";
import styles from "../ChangeManagerModal/Messmodal";
import { AuthContext } from "../../../Context/Authcontext";
import Constants from 'expo-constants';
export default function AddCash({ 
  showCashModal, 
  onClose, 
  userData 
}) {
  const { API_URL } = Constants.expoConfig.extra;
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [changing, setChanging] = useState(false);
  const {setUserData}=useContext(AuthContext);
  // Fetch mess members when modal opens
  useEffect(() => {
  //  console.log('Modal visibility changed:', showChangeManagerModal);
    console.log('UserData:', userData);
    
    if (showCashModal && userData?.mess?.id) {
      console.log('Fetching mess members...');
      fetchMessMembers();
    } else {
      // Reset when modal closes
      console.log('Resetting modal state');
      setMembers([]);
      setSelectedMember(null);
    }
  }, [showCashModal]);

  // Fetch all members from the mess
  const fetchMessMembers = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      const apiBase = await getApiBase();
      
      console.log('Fetching from:', `http://${API_URL}/api/mess/${userData.mess.id}/members`);
      
      const response = await fetch(
        `http://${API_URL}/api/mess/${userData.mess.id}/members`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Raw API Response:', data);
  
      // Handle different response formats
      let membersList = [];
      if (Array.isArray(data)) {
        membersList = data;
      } else if (data.members && Array.isArray(data.members)) {
        membersList = data.members;
      } else if (data.data && Array.isArray(data.data)) {
        membersList = data.data;
      }
  
      console.log('Parsed Members List:', membersList);
  
      // ✅ Filter out current manager (only show non-managers)
      const filteredMembers = membersList;
  
      console.log('Filtered Members (Non-managers):', filteredMembers); // ✅ Fixed typo: fileteredMember → filteredMembers
      
      setMembers(filteredMembers);
      
      if (filteredMembers.length === 0) {
        console.warn('No non-manager members found!');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      Alert.alert('Error', `Failed to load mess members: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle member selection
  const handleSelectMember = (memberId, memberName) => {
    console.log('Selected member ID:', memberId);
    console.log('Selected member name:', memberName);
    setSelectedMember(memberId);
  };

  // Handle changing manager
  const handleChangeManager = async () => {
    if (!selectedMember) {
      Alert.alert('Selection Required', 'Please select a member to make manager');
      return;
    }

    // Find selected member's name
    const selectedMemberData = members.find(m => (m._id || m.id) === selectedMember);
    const selectedMemberName = selectedMemberData?.name || 'this member';

    Alert.alert(
      'Confirm Change',
      `Are you sure you want to make ${selectedMemberName} the new manager? You will lose manager privileges.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            await executeChangeManager();
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Close modal handler
  const handleClose = () => {
    setSelectedMember(null);
    onClose();
  };

  // Render each member item
  const renderMemberItem = ({ item }) => {
    const memberId =  item.id;
    const memberName = item.name;
    const isSelected = selectedMember === memberId;
    const isCurrentUser = memberId === userData.id || memberId === userData._id;

    console.log(`Rendering member: ${memberName}, ID: ${memberId}, Selected: ${isSelected}, CurrentUser: ${isCurrentUser}`);

    return (
      <TouchableOpacity
        style={[
          styles.managerMemberItem,
          isSelected && styles.managerMemberItemSelected,
          isCurrentUser && styles.managerMemberItemDisabled,
        ]}
        onPress={() => {
          console.log(`Member clicked: ${memberName} (${memberId})`);
          if (!isCurrentUser) {
            handleSelectMember(memberId, memberName);
          }
        }}
        activeOpacity={isCurrentUser ? 1 : 0.7}
        disabled={isCurrentUser}
      >
        <View style={styles.memberInfo}>
          <View style={[
            styles.memberAvatar,
            isSelected && styles.memberAvatarSelected,
            isCurrentUser && styles.memberAvatarDisabled,
          ]}>
            <Text style={[
              styles.memberAvatarText,
              isSelected && styles.memberAvatarTextSelected,
              isCurrentUser && styles.memberAvatarTextDisabled,
            ]}>
              {item.name?.charAt(0)?.toUpperCase() || '?'}
            </Text>
          </View>

          <View style={styles.memberDetails}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[
                styles.memberName,
                isSelected && styles.memberNameSelected,
                isCurrentUser && styles.memberNameDisabled,
              ]}>
                {item.name || 'Unknown'}
              </Text>
              {isCurrentUser && (
                <View style={styles.currentUserBadge}>
                  <Text style={styles.currentUserBadgeText}>You</Text>
                </View>
              )}
            </View>
            <Text style={[
              styles.memberEmail,
              isSelected && styles.memberEmailSelected,
              isCurrentUser && styles.memberEmailDisabled,
            ]}>
              {item.email || ''}
            </Text>
          </View>
        </View>

        <View style={[
          styles.selectionIndicator,
          isSelected && styles.selectionIndicatorSelected,
          isCurrentUser && styles.selectionIndicatorDisabled,
        ]}>
          {isSelected && (
            <Ionicons name="checkmark" size={16} color="#FFF" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={showCashModal}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Change Manager</Text>
                <Text style={styles.managerSubtitle}>
                  Current Manager: {userData?.name || 'You'}
                </Text>
              </View>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.warningBox}>
              <Ionicons name="warning" size={20} color="#F59E0B" />
              <Text style={styles.warningText}>
                Warning: You will lose all manager privileges after changing the manager.
              </Text>
            </View>

            {selectedMember && (
              <View style={styles.selectionCounter}>
                <Ionicons name="person-circle" size={18} color="#6366F1" />
                <Text style={styles.selectionCounterText}>
                  New manager selected
                </Text>
              </View>
            )}
          </View>

          {/* Members List Section */}
          <View style={styles.resultsSection}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6366F1" />
                <Text style={styles.loadingText}>Loading members...</Text>
              </View>
            ) : members.length > 0 ? (
              <>
                <Text style={styles.resultsTitle}>
                  Select new manager ({members.length} member{members.length !== 1 ? 's' : ''})
                </Text>
                <FlatList
                  data={members}
                  renderItem={renderMemberItem}
                  keyExtractor={(item, index) => item._id || item.id || index.toString()}
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={styles.flatListContent}
                  extraData={selectedMember}
                />
              </>
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="people-outline" size={48} color="#CBD5E1" />
                <Text style={styles.emptyText}>No members found</Text>
                <Text style={styles.emptySubtext}>
                  Add members to your mess first
                </Text>
              </View>
            )}
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            {selectedMember && (
              <TouchableOpacity
                style={[
                  styles.changeManagerButton,
                  changing && styles.changeManagerButtonDisabled,
                ]}
                onPress={handleChangeManager}
                disabled={changing}
              >
                {changing ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="swap-horizontal" size={20} color="#FFF" />
                    <Text style={styles.changeManagerButtonText}>
                      Change Manager
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}