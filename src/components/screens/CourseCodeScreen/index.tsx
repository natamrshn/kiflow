import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function CourseCodeScreen() {
  const [courseCode, setCourseCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    if (!courseCode.trim()) {
      Alert.alert('Error', 'Please enter a course code');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement course code validation logic here
      // For now, just simulate a successful validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert('Success', 'Course code accepted!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to homepage
            router.push('/home');
          }
        }
      ]);
    } catch {
      Alert.alert('Error', 'Invalid course code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f8fafc', '#e2e8f0']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <View style={styles.contentContainer}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>Enter Code</Text>
                <Text style={styles.subtitle}>
                  Please enter the course code to join
                </Text>
              </View>

              <View style={styles.formSection}>
                <TextInput
                  style={styles.input}
                  placeholder="Course code"
                  placeholderTextColor="#64748b"
                  value={courseCode}
                  onChangeText={setCourseCode}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleConfirm}
                />

                <TouchableOpacity
                  style={[
                    styles.button,
                    (loading || !courseCode.trim()) && styles.buttonDisabled
                  ]}
                  onPress={handleConfirm}
                  disabled={loading || !courseCode.trim()}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Confirming...' : 'Confirm'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundGradient: {
    flex: 1,
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
});
