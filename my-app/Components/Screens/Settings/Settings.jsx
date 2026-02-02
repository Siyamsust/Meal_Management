import { ScrollView, StyleSheet, Text } from 'react-native';
import Setting from '../../Settings/Settings';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings= ({ navigationRef }) => {
  return (
    <SafeAreaView style={styles.SafeContainer}>
      <ScrollView style={styles.container}>
        <Setting />
        <Text style={styles.version}>v4.561.10000</Text>
      </ScrollView>
    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
},
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  version: {
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Settings;