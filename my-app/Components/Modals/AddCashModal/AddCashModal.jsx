import { View, Modal, Text, TouchableOpacity, FlatList, Alert, TextInput, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../ChangeManagerModal/Messmodal";
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
  const [selectedMemberData, setSelectedMemberData] = useState(null);
  const [amount, setAmount] = useState("");
  const [adding, setAdding] = useState(false);
  const [step, setStep] = useState("select"); // "select" or "amount"

  // Helper function to convert Decimal128 to number
  const toNumber = (value) => {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value);
    if (value.$numberDecimal) return parseFloat(value.$numberDecimal);
    return 0;
  };

  // Fetch mess members when modal opens
  useEffect(() => {
    if (showCashModal && userData?.mess?.id) {
      console.log('Fetching mess members...');
      fetchMessMembers();
    } else {
      resetModal();
    }
  }, [showCashModal]);

  const resetModal = () => {
    setMembers([]);
    setSelectedMember(null);
    setSelectedMemberData(null);
    setAmount("");
    setStep("select");
  };

  // Fetch all members from the mess
  const fetchMessMembers = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      
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
      setMembers(membersList);
      
      if (membersList.length === 0) {
        console.warn('No members found!');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      Alert.alert('Error', `Failed to load mess members: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle member selection
  const handleSelectMember = (member) => {
    console.log('Selected member:', member);
    setSelectedMember( member.id);
    setSelectedMemberData(member);
    setStep("amount");
  };

  // Handle adding cash
  const handleAddCash = async () => {
    if (!amount.trim()) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    if (isNaN(parseFloat(amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setAdding(true);

    try {
      const token = await AsyncStorage.getItem('authToken');
      
      const response = await fetch(
        `http://${API_URL}/api/mess/${userData?.mess?.id}/add-cash`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            memberId: selectedMember,
            amount: parseFloat(amount),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success', 
          `Added $${parseFloat(amount).toFixed(2)} to ${selectedMemberData?.name}'s account`,
          [
            {
              text: 'OK',
              onPress: () => {
                handleClose();
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', data.message || 'Failed to add cash');
      }
    } catch (error) {
      console.error('Error adding cash:', error);
      Alert.alert('Error', `An error occurred: ${error.message}`);
    } finally {
      setAdding(false);
    }
  };

  // Close modal handler
  const handleClose = () => {
    resetModal();
    onClose();
  };

  // Go back to member selection
  const handleBack = () => {
    setStep("select");
    setAmount("");
  };

  // Render each member item
  const renderMemberItem = ({ item }) => {
    const memberId = item._id || item.id;
    const isSelected = selectedMember === memberId;

    return (
      <TouchableOpacity
        style={[
          styles.managerMemberItem,
          isSelected && styles.managerMemberItemSelected,
        ]}
        onPress={() => handleSelectMember(item)}
        activeOpacity={0.7}
      >
        <View style={styles.memberInfo}>
          <View style={[
            styles.memberAvatar,
            isSelected && styles.memberAvatarSelected,
          ]}>
            <Text style={[
              styles.memberAvatarText,
              isSelected && styles.memberAvatarTextSelected,
            ]}>
              {item.name?.charAt(0)?.toUpperCase() || '?'}
            </Text>
          </View>

          <View style={styles.memberDetails}>
            <Text style={[
              styles.memberName,
              isSelected && styles.memberNameSelected,
            ]}>
              {item.name || 'Unknown'}
            </Text>
            <Text style={[
              styles.memberEmail,
              isSelected && styles.memberEmailSelected,
            ]}>
              Remaining: ${toNumber(item.remmoney).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={[
          styles.selectionIndicator,
          isSelected && styles.selectionIndicatorSelected,
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
                <Text style={styles.modalTitle}>
                  {step === "select" ? "Add Cash to Member" : `Add Cash to\n${selectedMemberData?.name}`}
                </Text>
                <Text style={styles.managerSubtitle}>
                  Manager: {userData?.name || 'You'}
                </Text>
              </View>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Content Section */}
          <ScrollView style={styles.resultsSection}>
            {step === "select" ? (
              // Member Selection Step
              <>
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6366F1" />
                    <Text style={styles.loadingText}>Loading members...</Text>
                  </View>
                ) : members.length > 0 ? (
                  <>
                    <Text style={styles.resultsTitle}>
                      Select member ({members.length})
                    </Text>
                    <FlatList
                      data={members}
                      renderItem={renderMemberItem}
                      keyExtractor={(item, index) => item._id || item.id || index.toString()}
                      scrollEnabled={false}
                      contentContainerStyle={styles.flatListContent}
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
              </>
            ) : (
              // Amount Input Step
              <View style={{ padding: 16 }}>
                <View style={{ marginBottom: 20 }}>
                  {/*<--<Text style={styles.resultsTitle}>Enter Amount</Text>-->*/}
                  <Text style={{ color: '#64748B', marginTop: 8 }}>
                    Current balance: ${toNumber(selectedMemberData?.remmoney).toFixed(2)}
                  </Text>
                </View>

                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.resultsTitle}>Amount to Add</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 8 }}>$</Text>
                    <TextInput
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: '#E2E8F0',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 16,
                      }}
                      placeholder="0.00"
                      value={amount}
                      onChangeText={setAmount}
                      keyboardType="decimal-pad"
                      placeholderTextColor="#94A3B8"
                      editable={!adding}
                    />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            {step === "amount" && (
              <TouchableOpacity
                style={[
                  styles.changeManagerButton,
                  (!amount.trim() || adding) && styles.changeManagerButtonDisabled,
                ]}
                onPress={handleAddCash}
                disabled={!amount.trim() || adding}
              >
                {adding ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="add-circle" size={20} color="#FFF" />
                    <Text style={styles.changeManagerButtonText}>
                      Add ${parseFloat(amount || 0).toFixed(2)}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}
            
            {step === "amount" && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleBack}
                disabled={adding}
              >
                <Text style={styles.cancelButtonText}>Back</Text>
              </TouchableOpacity>
            )}

            {step === "select" && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
