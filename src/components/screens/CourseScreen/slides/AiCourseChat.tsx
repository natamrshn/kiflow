import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AICourseChatPlaceholderProps {
  title: string;
  currentIndex?: number;
  totalSlides?: number;
  isActive?: boolean;
}

const AICourseChatPlaceholder: React.FC<AICourseChatPlaceholderProps> = ({
  title,
  currentIndex = 0,
  totalSlides = 0,
  isActive = true,
}) => {
  if (!isActive) {
    return (
      <View style={styles.center}>
        <Text style={styles.inactiveText}>Слайд ще не активний</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerCounter}>
          {currentIndex + 1} / {totalSlides || '-'}
        </Text>
      </View>

      <View style={styles.chatBox}>
        <Text style={styles.chatPlaceholder}>💬 Інтерфейс чату AI (placeholder)</Text>
        <Text style={styles.chatSub}>Тут буде візуальна частина чату — без логіки</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Кнопки та стан контакту — прибрані (presentational)</Text>
      </View>
    </View>
  );
};

export default AICourseChatPlaceholder;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f8fafc', padding: 18, justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  inactiveText: { color: '#64748b', fontSize: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  headerCounter: { fontSize: 14, color: '#475569', alignSelf: 'center' },
  chatBox: {
    flex: 1,
    borderRadius: 14,
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  chatPlaceholder: { fontSize: 18, marginBottom: 8 },
  chatSub: { fontSize: 13, color: '#64748b' },
  footer: { marginTop: 12, alignItems: 'center' },
  footerText: { fontSize: 12, color: '#94a3b8' },
});
