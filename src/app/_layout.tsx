import 'react-native-reanimated'; // ⚡️ цей імпорт має бути найпершим

import { useAuthStore } from '@/src/stores/authStore';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const checkSession = useAuthStore(state => state.checkSession);

  useEffect(() => {
    // Initialize auth state when app starts
    checkSession();
    
    // Disable Google Cast SDK on web to prevent console errors
    if (Platform.OS === 'web') {
      // Set global variable to disable Cast SDK
      (window as any).cast = undefined;
      (window as any).chrome = (window as any).chrome || {};
      (window as any).chrome.cast = undefined;
      
      // Disable cast sender script loading
      const originalCreateElement = document.createElement;
      document.createElement = function(tagName: string) {
        const element = originalCreateElement.call(this, tagName);
        if (tagName.toLowerCase() === 'script' && element.src && element.src.includes('cast_sender')) {
          console.log('Blocked cast_sender script loading');
          return element; // Return element but don't append it
        }
        return element;
      };
    }
  }, [checkSession]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="course-code" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="home" 
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="courses/index" 
        options={{ 
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="courses/[id]" 
        options={{ 
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="instractions" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="auth/login" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="auth/registration" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen name="+not-found" />
      {/* <StatusBar style="auto" /> */}
    </Stack>
  );
}