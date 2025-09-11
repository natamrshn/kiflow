import { Stack, useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../ui/button";
import CustomHeader from "../../ui/CustomHeader";
import { SafeAreaView } from "../../ui/safe-area-view";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      {/* Хедер */}
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomHeader />,
        }}
      />

      {/* Контент по центру */}
      <View style={[styles.contentContainer, { paddingTop: insets.top > 0 ? 0 : 20 }]}>
        <View style={styles.logoSection}>
          <Image
            source={require("@/src/assets/images/kiflow-logo.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>створюємо онлайн освіту</Text>
        </View>

        <View style={styles.navSection}>
          <Button 
            title="COURSES" 
            variant="secondary" 
            size="lg"
            onPress={() => router.push("/courses/")}
            style={styles.navButton}
          />

          <Button 
            title="AI INSTRUCTIONS" 
            variant="secondary" 
            size="lg"
            onPress={() => router.push("/instractions")}
            style={styles.navButton}
          />

          <Button 
            title="REAL ESTATE SIMULATOR" 
            variant="secondary" 
            size="lg"
            onPress={() => {}}
            style={styles.navButton}
          />

          <Button 
            title="COMPANY DASHBOARD" 
            variant="secondary" 
            size="lg"
            onPress={() => {}}
            style={styles.navButton}
          />

          <Button 
            title="DESIGN SYSTEM" 
            variant="secondary" 
            size="lg"
            onPress={() => router.push("/design-system")}
            style={styles.navButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center", // центрування по вертикалі
    alignItems: "center", // центрування по горизонталі
    paddingHorizontal: 16,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 300,
    height: 120,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  navSection: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  navButton: {
    width: "80%",
  },
});
