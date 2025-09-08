import { Button, ButtonText } from '@/src/components/ui/button';
import { Image } from '@/src/components/ui/image';
import { Input, InputField } from '@/src/components/ui/input';
import { SafeAreaView } from '@/src/components/ui/safe-area-view';
import { Text } from '@/src/components/ui/text';
import { VStack } from '@/src/components/ui/vstack';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // TODO: Implement sign up logic
    console.log('Sign up with:', { email, password });
  };

  const handleBackToWelcome = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundGradient}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <VStack 
            className="flex-1 justify-center items-center px-8"
            space="2xl"
          >
            {/* Логотип */}
            <VStack className="items-center" space="lg">
              <View style={styles.logoContainer}>
                <Image
                  source={require('@/src/assets/images/kiflow-logo.jpeg')}
                  size="lg"
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.titleText} size="xl">
                Create Account
              </Text>
              <Text style={styles.subtitleText} size="sm">
                Join Kiflow and start your learning journey
              </Text>
            </VStack>

            {/* Форма регистрации */}
            <View style={styles.formContainer}>
              <VStack className="w-full" space="lg">
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <Input
                    variant="outline"
                    size="lg"
                    style={styles.input}
                  >
                    <InputField
                      placeholder="Enter your email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </Input>
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <Input
                    variant="outline"
                    size="lg"
                    style={styles.input}
                  >
                    <InputField
                      placeholder="Create a password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </Input>
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <Input
                    variant="outline"
                    size="lg"
                    style={styles.input}
                  >
                    <InputField
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                    />
                  </Input>
                </View>

                <Button
                  action="primary"
                  variant="solid"
                  size="xl"
                  onPress={handleSignUp}
                  style={styles.signUpButton}
                >
                  <ButtonText style={styles.buttonText}>Create Account</ButtonText>
                </Button>

                <Button
                  action="secondary"
                  variant="link"
                  size="md"
                  onPress={handleBackToWelcome}
                  style={styles.backButton}
                >
                  <ButtonText style={styles.backButtonText}>← Back to Welcome</ButtonText>
                </Button>
              </VStack>
            </View>
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundGradient: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  logo: {
    width: 200,
    height: 80,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '400',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 4,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#64748b',
    borderRadius: 12,
    shadowColor: '#64748b',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 8,
    minHeight: 56,
  },
  backButton: {
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
});
