import 'react-native-reanimated'; // ⚡️ цей імпорт має бути найпершим

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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