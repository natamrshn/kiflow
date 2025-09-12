import { Icon } from '@/src/components/ui/icon';
import { Text } from '@/src/components/ui/text';
import { View } from '@/src/components/ui/view';
import { CheckCircle, XCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet } from 'react-native';

type QuizData = {
  question: string;
  options: string[];
  correctAnswer: number;
};

interface QuizProps {
  title: string;
  subtitle?: string;
  quiz: QuizData;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const QuizSlide: React.FC<QuizProps> = ({ title, subtitle, quiz }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const DEFAULT_OPTION_STYLE = styles.option;
  const CORRECT_OPTION_STYLE = [styles.option, styles.optionCorrect];
  const INCORRECT_OPTION_STYLE = [styles.option, styles.optionIncorrect];

  const CORRECT_MESSAGE = 'Правильно!';
  const INCORRECT_MESSAGE = 'Неправильно. Спробуйте ще раз!';

  const getOptionStyle = (index: number) => {
    const isSelected = selectedAnswer === index;
    const isCorrect = index === quiz.correctAnswer;

    if (selectedAnswer === null) return DEFAULT_OPTION_STYLE;
    if (isCorrect) return CORRECT_OPTION_STYLE;
    if (isSelected) return INCORRECT_OPTION_STYLE;

    return DEFAULT_OPTION_STYLE;
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.question}>{quiz.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {quiz.options.map((option, index) => (
            <Pressable
              key={index}
              style={getOptionStyle(index)}
              onPress={() => setSelectedAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          ))}
        </View>

        {selectedAnswer !== null && (
          <View style={styles.feedbackContainer}>
            <Icon
              as={selectedAnswer === quiz.correctAnswer ? CheckCircle : XCircle}
              size={24}
              color={selectedAnswer === quiz.correctAnswer ? '#22c55e' : '#ef4444'}
            />
            <Text
              style={[
                styles.feedbackText,
                {
                  color: selectedAnswer === quiz.correctAnswer ? '#22c55e' : '#ef4444',
                },
              ]}
            >
              {selectedAnswer === quiz.correctAnswer ? CORRECT_MESSAGE : INCORRECT_MESSAGE}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default QuizSlide;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7fafc',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
  questionContainer: {
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    width: SCREEN_WIDTH - 32,
    maxWidth: 760,
  },
  question: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111',
  },
  optionsContainer: {
    width: '100%',
    maxWidth: 760,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
    marginBottom: 12,
    alignItems: 'center',
  },
  optionCorrect: {
    backgroundColor: 'rgba(34,197,94,0.3)',
    borderColor: '#22c55e',
  },
  optionIncorrect: {
    backgroundColor: 'rgba(239,68,68,0.3)',
    borderColor: '#ef4444',
  },
  optionText: {
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
});
