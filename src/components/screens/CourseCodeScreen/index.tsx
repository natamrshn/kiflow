import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Animated,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { joinCompanyByCode } from '../../../services/company';

export default function CourseCodeScreen() {
  const [courseCode, setCourseCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorAnimation] = useState(new Animated.Value(0));
  const router = useRouter();

  const showError = (message: string) => {
    setError(message);
    Animated.sequence([
      Animated.timing(errorAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideError = () => {
    Animated.timing(errorAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setError('');
    });
  };

  const handleConfirm = async () => {
    if (!courseCode.trim()) {
      showError('Будь ласка, введіть код курсу');
      return;
    }

    // Скрываем предыдущую ошибку
    hideError();
    setLoading(true);
    
    try {
      const result = await joinCompanyByCode(courseCode.trim());
      
      if (result.success) {
        const message = result.alreadyMember 
          ? `Ви вже є членом компанії "${result.company?.name}". Вам доступні курси цієї компанії.`
          : `Ви успішно приєдналися до компанії "${result.company?.name}". Тепер вам доступні курси цієї компанії.`;
          
        Alert.alert('Успіх!', message, [
          {
            text: 'OK',
              onPress: () => {
                // Переходимо на головну сторінку
                console.log('Navigating to /home');
                router.replace('/home');
              }
          }
        ]);
        
        // Автоматичне перенаправлення через 3 секунди
        setTimeout(() => {
          console.log('Auto-navigating to /home');
          router.replace('/home');
        }, 1000);
      } else {
        showError('Невірний код курсу. Перевірте правильність введення та спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Error joining company:', error);
      showError('Сталася помилка при приєднанні до компанії. Перевірте підключення до інтернету та спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (text: string) => {
    setCourseCode(text);
    // Очищаем ошибку при изменении текста
    if (error) {
      hideError();
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.contentContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Введіть код</Text>
              <Text style={styles.subtitle}>
                Введіть код компанії, щоб отримати доступ до її курсів
              </Text>
            </View>

            <View style={styles.formSection}>
              <TextInput
                style={[
                  styles.input,
                  error && styles.inputError
                ]}
                placeholder="Код компанії"
                placeholderTextColor="#64748b"
                value={courseCode}
                onChangeText={handleTextChange}
                autoCapitalize="characters"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleConfirm}
              />

              {/* Error Message */}
              {error && (
                <Animated.View
                  style={[
                    styles.errorContainer,
                    {
                      opacity: errorAnimation,
                      transform: [
                        {
                          translateY: errorAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-10, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <View style={styles.errorContent}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                </Animated.View>
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  (loading || !courseCode.trim()) && styles.buttonDisabled
                ]}
                onPress={handleConfirm}
                disabled={loading || !courseCode.trim()}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Підтвердження...' : 'Підтвердити'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '400',
  },
  formSection: {
    width: '100%',
    maxWidth: 400,
    gap: 24,
  },
  input: {
    height: 56,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#1f2937',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 2,
    backgroundColor: '#fef2f2',
  },
  button: {
    height: 56,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  errorContainer: {
    marginTop: 8,
  },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  errorIcon: {
    fontSize: 16,
    marginTop: 1,
  },
  errorText: {
    flex: 1,
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});
