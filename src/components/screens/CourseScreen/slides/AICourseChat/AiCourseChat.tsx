import { Icon } from '@/src/components/ui/icon';
import { saveUserRating } from '@/src/services/main_rating';
import { usePromptsStore } from '@/src/services/slidePrompt';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSlidesStore } from '@/src/stores'; // Пока не используется
import { MessageCircle, Send } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { askGemini } from './askGemini';
import { formatAIResponseForChat } from './formatAIResponseForChat';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface AICourseChatProps {
  title: string;
  slideId: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AICourseChat: React.FC<AICourseChatProps> = ({ title, slideId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const { prompt, fetchPromptBySlide } = usePromptsStore();
  // const { user } = useAuthStore(); // Пока не используется




  useEffect(() => {
    if (slideId) {
      fetchPromptBySlide(slideId);
    }
  }, [slideId, fetchPromptBySlide]);

  useEffect(() => {
    const loadInitialPrompt = async () => {
      const slidePrompt = prompt[slideId]?.question;
      if (!slidePrompt) return;

      const aiMsg: Message = {
        id: Date.now().toString(),
        role: 'ai',
        text: slidePrompt,
      };

      setMessages([aiMsg]);
    };

    loadInitialPrompt();
  }, [slideId, prompt]);

  

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]); // оновлюємо стан
    setInput('');
    setLoading(true);
  
    try {
      const slidePrompt = prompt[slideId]?.prompt || "";
  
      const aiResponse = await askGemini([...messages, userMsg], slidePrompt, messages.length === 0);
      // const currentSlideId = useSlidesStore.getState().getCurrentSlideId(); // Пока не используется

      console.log('aiResponse',aiResponse.rating.overall_score)

      if(currentSlideId){
        if(user){
          if (aiResponse.rating.overall_score){
            await saveUserRating(currentSlideId, user.id, aiResponse.rating.overall_score);
          }
        }
      }

      const chatText = formatAIResponseForChat(aiResponse);

  
      const aiMsg: Message = {
        id: Date.now().toString(),
        role: 'ai',
        text: chatText,
      };
  
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.chatBox}>
        <ScrollView
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.role === 'ai' ? styles.aiBubble : styles.userBubble,
              ]}
            >
              {msg.role === 'ai' && (
                <Icon as={MessageCircle} size={20} color="#0f172a" style={styles.messageIcon} />
              )}
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
          {loading && (
            <View style={[styles.messageBubble, styles.aiBubble]}>
              <Text style={styles.messageText}>AI думає...</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Введіть відповідь..."
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity onPress={handleSend} disabled={loading}>
          <Icon as={Send} size={24} color={loading ? '#94a3b8' : '#0f172a'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AICourseChat;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a', flexShrink: 1 },
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
  chatContent: { paddingVertical: 8 },
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
  userBubble: { backgroundColor: '#f1f5f9', alignSelf: 'flex-end' },
  messageIcon: { marginRight: 6 },
  messageText: { fontSize: 16, color: '#0f172a', lineHeight: 22 },
  footer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    paddingTop: 8,
    paddingBottom: Platform.OS === 'web' ? 60 : 8,
    marginBottom: Platform.OS === 'web' ? 20 : 0,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    marginRight: 8,
  },
});
