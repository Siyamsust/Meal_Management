import { View, Modal, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getApiBase from "../../../utils/apiBase";
import styles from "./style";
import Constants from "expo-constants"
export default function AddMemberModal({ 
  visible, 
  onClose, 
  userData,
  onMemberAdded 
}) {
  const { API_URL } = Constants.expoConfig.extra;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [addingMember, setAddingMember] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]); // Now stores objects with id and name
  
  useEffect(() => {
    if (visible) {
      setSearchQuery("");
      setSearchResults([]);
      setSearching(false);
      setAddingMember(false);
      setSelectedMembers([]);
    }
  }, [visible]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      
      console.log('API Base:', API_URL);
      
      const response = await fetch(`http://${API_URL}?q=${encodeURIComponent(searchQuery.trim())}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
     
      let users = [];
      if (Array.isArray(data)) {
        users = data;
      } else if (data.users && Array.isArray(data.users)) {
        users = data.users;
      } else if (data.data && Array.isArray(data.data)) {
        users = data.data;
      }
      
      const usersWithoutMess = users.filter(user => 
        !user.mess || !user.mess.id || user.mess.id === null
      );
      
      console.log('Filtered Users Count:', usersWithoutMess.length);
      console.log('Filtered Users:', usersWithoutMess);
      setSearchResults(usersWithoutMess);
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, visible, handleSearch]);

  // Modified: Now stores both id and name
  const toggleMemberSelection = (memberId, memberName) => {
    console.log('Toggle selection for:', memberId, memberName);
    setSelectedMembers(prev => {
      // Check if member already selected
      const isAlreadySelected = prev.some(member => member.id === memberId);
      
      if (isAlreadySelected) {
        // Remove from selection
        const newSelection = prev.filter(member => member.id !== memberId);
        console.log('Selected members:', newSelection);
        return newSelection;
      } else {
        // Add to selection with both id and name
        const newSelection = [...prev, { id: memberId, name: memberName }];
        console.log('Selected members:', newSelection);
        return newSelection;
      }
    });
  };

  // Modified: Now accepts both memberId and memberName
  const handleAddMember = async (memberId, memberName) => {
    if (!userData?.mess?.id) {
      alert("No mess found");
      return { success: false, message: "No mess found" };
    }

    try {
      const token = await AsyncStorage.getItem('authToken');
      const apiBase = await getApiBase();
      
      const response = await fetch(`http://${API_URL}/api/mess/add/${userData.mess.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userid: memberId,
          username: memberName, // Now sending member name too
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSearchResults(prev => prev.filter(user => user._id !== memberId && user.id !== memberId));
        setSelectedMembers(prev => prev.filter(member => member.id !== memberId));
        
        if (onMemberAdded) {
          onMemberAdded(data);
        }
        
        return { success: true };
      } else {
        return { success: false, message: data.message || "Failed to add member" };
      }
    } catch (error) {
      console.error('Error adding member:', error);
      return { success: false, message: "An error occurred while adding member" };
    }
  };

  // Modified: Loop through objects instead of just IDs
  const handleAddSelectedMembers = async () => {
    if (selectedMembers.length === 0) {
      alert("Please select at least one member");
      return;
    }

    setAddingMember(true);
    let successCount = 0;
    let failCount = 0;

    // Loop through each selected member object
    for (const member of selectedMembers) {
      const result = await handleAddMember(member.id, member.name);
      if (result.success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    setAddingMember(false);

    if (successCount > 0) {
      alert(`Successfully added ${successCount} member${successCount !== 1 ? 's' : ''}${failCount > 0 ? `, ${failCount} failed` : ''}`);
    } else {
      alert("Failed to add members");
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedMembers([]);
    onClose();
  };

  const renderMemberItem = ({ item }) => {
    const memberId = item._id || item.id;
    const memberName = item.name;
    // Modified: Check if member object with this id exists in selectedMembers
    const isSelected = selectedMembers.some(member => member.id === memberId);

    console.log(`Rendering: ${item.name} (${memberId}), Selected: ${isSelected}`);

    return (
      <TouchableOpacity
        style={[
          styles.memberItem,
          isSelected && styles.memberItemSelected
        ]}
        onPress={() => {
          console.log('Member pressed:', item.name, memberId);
          toggleMemberSelection(memberId, memberName);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.memberInfo}>
          <View style={[
            styles.memberAvatar,
            isSelected && styles.memberAvatarSelected
          ]}>
            <Text style={[
              styles.memberAvatarText,
              isSelected && styles.memberAvatarTextSelected
            ]}>
              {item.name?.charAt(0)?.toUpperCase() || '?'}
            </Text>
          </View>
          <View style={styles.memberDetails}>
            <Text style={[
              styles.memberName,
              isSelected && styles.memberNameSelected
            ]}>
              {item.name || 'Unknown'}
            </Text>
            <Text style={[
              styles.memberEmail,
              isSelected && styles.memberEmailSelected
            ]}>
              {item.email || ''}
            </Text>
          </View>
        </View>
        <View style={[
          styles.selectionIndicator,
          isSelected && styles.selectionIndicatorSelected
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
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Fixed Header */}
          <View style={styles.headerSection}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Member</Text>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Search and select members to add to your mess
            </Text>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <Ionicons name="search" size={20} color="#64748B" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {searching && (
                  <ActivityIndicator size="small" color="#6366F1" style={styles.searchLoader} />
                )}
              </View>
              {searchQuery.trim().length > 0 && searchQuery.trim().length < 2 && (
                <Text style={styles.searchHint}>
                  Type at least 2 characters to search
                </Text>
              )}
            </View>

            {/* Selection Counter */}
            {selectedMembers.length > 0 && (
              <View style={styles.selectionCounter}>
                <Ionicons name="checkmark-circle" size={18} color="#6366F1" />
                <Text style={styles.selectionCounterText}>
                  {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
                </Text>
              </View>
            )}
          </View>

          {/* Results Section */}
          <View style={styles.resultsSection}>
            {searchResults.length > 0 ? (
              <>
                <Text style={styles.resultsTitle}>
                  {searchResults.length} member{searchResults.length !== 1 ? 's' : ''} found
                </Text>
                <FlatList
                  data={searchResults}
                  renderItem={renderMemberItem}
                  keyExtractor={(item, index) => item._id || item.id || index.toString()}
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={styles.flatListContent}
                  extraData={selectedMembers}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={5}
                />
              </>
            ) : searchQuery.trim().length >= 2 && !searching ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="people-outline" size={48} color="#CBD5E1" />
                <Text style={styles.emptyText}>No members found</Text>
                <Text style={styles.emptySubtext}>
                  Try a different search term
                </Text>
              </View>
            ) : !searchQuery.trim() ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color="#CBD5E1" />
                <Text style={styles.emptyText}>Start searching</Text>
                <Text style={styles.emptySubtext}>
                  Enter a name or email to find members
                </Text>
              </View>
            ) : null}
          </View>

          {/* Fixed Footer */}
          <View style={styles.footerSection}>
            {selectedMembers.length > 0 && (
              <TouchableOpacity
                style={[
                  styles.addSelectedButton,
                  addingMember && styles.addSelectedButtonDisabled
                ]}
                onPress={handleAddSelectedMembers}
                disabled={addingMember}
              >
                {addingMember ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="person-add" size={20} color="#FFF" />
                    <Text style={styles.addSelectedButtonText}>
                      Add {selectedMembers.length} Member{selectedMembers.length !== 1 ? 's' : ''}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}