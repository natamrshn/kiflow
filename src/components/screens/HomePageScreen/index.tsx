import { Stack, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/courses")} >
            <Text style={styles.navText}>COURSES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/instractions")}>
            <Text style={styles.navText}>AI INSTRUCTIONS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>REAL ESTATE SIMULATOR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>COMPANY DASHBOARD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  navText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
