import { Icon } from '@/src/components/ui/icon';
import { MessageCircle } from 'lucide-react-native';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

interface AICourseChatPlaceholderProps {
  title: string;
  currentIndex?: number;
  totalSlides?: number;
  isActive?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerCounter}>
          {currentIndex + 1} / {totalSlides || '-'}
        </Text>
      </View>

      {/* Chat Box */}
      <View style={styles.chatBox}>
        <ScrollView
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Example messages */}
          <View style={[styles.messageBubble, styles.aiBubble]}>
            <Icon as={MessageCircle} size={20} color="#0f172a" style={styles.messageIcon} />
            <Text style={styles.messageText}>Привіт! Тут буде AI чат.</Text>
          </View>

          <View style={[styles.messageBubble, styles.userBubble]}>
            <Text style={styles.messageText}>А користувач пише своє повідомлення...</Text>
          </View>

          <View style={[styles.messageBubble, styles.aiBubble]}>
            <Text style={styles.messageText}>Відповідь AI або підказка для користувача.</Text>
          </View>
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Тут будуть кнопки та стан чату (presentational)</Text>
      </View>
    </View>
  );
};

export default AICourseChatPlaceholder;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  inactiveText: { color: '#64748b', fontSize: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a', flexShrink: 1 },
  headerCounter: { fontSize: 14, color: '#475569', alignSelf: 'center' },
  chatBox: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    marginVertical: 8,
  },
  chatContent: {
    paddingVertical: 8,
  },
  messageBubble: {
    maxWidth: SCREEN_WIDTH * 0.75,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginVertical: 6,
  },
  aiBubble: {
    backgroundColor: '#e0f2fe',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userBubble: {
    backgroundColor: '#f1f5f9',
    alignSelf: 'flex-end',
  },
  messageIcon: { marginRight: 6 },
  messageText: { fontSize: 16, color: '#0f172a', lineHeight: 22 },
  footer: { marginTop: 8, alignItems: 'center' },
  footerText: { fontSize: 12, color: '#94a3b8' },
});
