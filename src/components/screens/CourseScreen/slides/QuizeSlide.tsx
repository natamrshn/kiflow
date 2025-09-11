import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type QuizData = {
  question: string;
  options: string[];
  // correctAnswer intentionally unused here — presentational only
  correctAnswer?: number;
};

interface QuizSlideProps {
  title: string;
  subtitle?: string;
  quiz: QuizData;
}

const QuizSlide: React.FC<QuizSlideProps> = ({ title, subtitle, quiz }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.inner}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{quiz.question}</Text>
        </View>

        <View style={styles.options}>
          {quiz.options.map((option, idx) => (
            <Pressable key={idx} style={styles.option} onPress={() => { /* presentational only */ }} disabled>
              <View style={styles.radio} />
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.note}>(Тут показано лише інтерфейс — логіка вибору прибрана)</Text>
      </View>
    </View>
  );
};

export default QuizSlide;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fffaf6', padding: 20, justifyContent: 'center' },
  inner: { maxWidth: 760, alignSelf: 'center', width: '100%' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a', marginBottom: 6 },
  subtitle: { fontSize: 16, color: '#475569', marginBottom: 12 },
  questionBox: {
    backgroundColor: '#fff7ed',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  questionText: { fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#0f172a' },
  options: { gap: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
  },
  optionText: { fontSize: 16, color: '#0f172a' },
  note: { marginTop: 12, fontSize: 12, color: '#64748b', textAlign: 'center' },
});
