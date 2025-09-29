import "react-native-reanimated"; // ⚡️ цей імпорт має бути найпершим


import { useAuthStore } from '@/src/stores/authStore';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    // Initialize auth state when app starts
    checkSession();
  }, [checkSession]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (

    <SafeAreaProvider>
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
          name="statistics" 
          options={{ 
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="courses/index" 
          options={{ 
            headerShown: false 
          }} 
        />
         <Stack.Screen 
          name="module/[id]" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="courses/[id]" 
          options={{ 
            headerShown: false 
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
    </SafeAreaProvider>
  );
}
