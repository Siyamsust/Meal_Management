// components/Navigation/MessModals.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      modalContainer: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      },
      modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
      },
      modalSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 24,
      },
      optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
      },
      optionTextContainer: {
        flex: 1,
        marginLeft: 12,
      },
      optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 4,
      },
      optionDescription: {
        fontSize: 13,
        color: '#64748B',
      },
      inputContainer: {
        marginBottom: 24,
      },
      inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 8,
      },
      input: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#0F172A',
      },
      inputHint: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 8,
      },
      createButton: {
        flexDirection: 'row',
        backgroundColor: '#6366F1',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 12,
      },
      createButtonDisabled: {
        backgroundColor: '#CBD5E1',
      },
      createButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
      },
      cancelButton: {
        paddingVertical: 12,
        alignItems: 'center',
      },
      cancelButtonText: {
        color: '#64748B',
        fontSize: 15,
        fontWeight: '600',
      },
});

export default styles;