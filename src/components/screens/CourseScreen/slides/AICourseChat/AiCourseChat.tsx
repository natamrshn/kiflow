import { Icon } from '@/src/components/ui/icon';
import { useQuestionsStore } from '@/src/services/slidePrompt';
import { MessageCircle, Send } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { askGemini } from './askGemini';


interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface AICourseChatProps {
  title: string;
  isActive?: boolean;
  currentIndex?: number;
  totalSlides?: number;
  slideId: string
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AICourseChat: React.FC<AICourseChatProps> = ({ title , isActive, currentIndex, totalSlides, slideId}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const { questions, fetchQuestionBySlide, isLoading, error } = useQuestionsStore();

useEffect(() => {
  if (slideId) {
    fetchQuestionBySlide(slideId);
  }
    const question = questions[slideId]?.prompt;
    if (question) {
      setMessages([{ id: 'q1', role: 'ai', text: question }]);
    }

  
}, [slideId]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const aiResponse = await askGemini(input);

      const aiMsg: Message = {
        id: Date.now().toString(),
        role: 'ai',
        text: aiResponse,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  console.log('slideId',slideId)
  console.log('questions', questions)
  console.log('messages', messages)
  

  return (
    <View style={styles.screen}>
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

      {/* Footer з інпутом */}
      {/* <View style={styles.footer}>
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
      </View> */}
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
    </View>
  );
};

export default AICourseChat;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    flexShrink: 1,
  },
  headerCounter: {
    fontSize: 14,
    color: '#475569',
    alignSelf: 'center',
  },
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
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