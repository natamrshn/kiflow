import 'react-native-reanimated'; // ⚡️ цей імпорт має бути найпершим

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

import { useColorScheme } from '../hooks/useColorScheme.web';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
            headerShown: true
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
      </Stack>
      {/* <StatusBar style="auto" /> */}
    </ThemeProvider>
  );
}
