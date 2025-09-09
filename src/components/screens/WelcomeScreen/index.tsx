import { useIsGuestUser } from '@/src/hooks/auth/useIsGuestUser';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Text as RNText, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const isGuestValue = useIsGuestUser();
  const isGuest = isGuestValue === null ? true : isGuestValue;

  useEffect(()=>{
    if(!isGuest){
      router.push('/home');
    }
  },[isGuest])

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  const handleSignUp = () => {
    router.push('/auth/registration');
  };


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f8fafc', '#e2e8f0']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.logoSection}>
            <Image
              source={require("@/src/assets/images/kiflow-logo.jpeg")}
              style={styles.logo}
              resizeMode="contain"
            />
            <RNText style={styles.welcomeText}>
              Welcome to Kiflow
            </RNText>
            <RNText style={styles.subtitleText}>
              Your gateway to online education
            </RNText>
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.navButton} onPress={handleSignIn}>
              <RNText style={styles.navText}>Sign In</RNText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={handleSignUp}>
              <RNText style={styles.navText}>Sign Up</RNText>
            </TouchableOpacity>
          </View>
        </View>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 300,
    height: 120,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 24,
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
  buttonSection: {
    width: '100%',
    alignItems: 'center',
    gap: 24,
    marginTop: 128,
  },
  navButton: {
    backgroundColor: '#d1d5db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
});
