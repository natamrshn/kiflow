import React, { useRef } from "react";
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text
} from "react-native";

// Імпорт UI-компонентів
import { Box } from "@/src/components/ui/box";
import { SafeAreaView } from "@/src/components/ui/safe-area-view";
import { ScrollView } from "@/src/components/ui/scroll-view";
import Dropdown from "../components/ui/dropdown/Dropdown";
import InstructionField from "../components/ui/instruction-field/InstructionField";
// import { Header, InstructionField } from "./components";

const MockAIInstructionsScreen = () => {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  // Анімація кнопок (залишаємо для візуального ефекту)
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <ScrollView
        contentContainerStyle={{
          width: SCREEN_WIDTH,
          alignSelf: "center",
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Box className="flex-1">
          {/* Header */}
          {/* <Header /> */}

          {/* Content */}
          <ScrollView style={styles.container}>
            {/* Company */}
            <Text style={styles.sectionTitle}>Company</Text>
            <Dropdown
              label="Select Company"
              items={[
                { id: "1", name: "Company 1" },
                { id: "2", name: "Company 2" },
              ]}
              selected={null}
              onSelect={() => {}}
            />

            <InstructionField
              title="1. Скрипти"
              value=""
              onChangeText={() => {}}
              placeholder="Введіть скрипти..."
              editable={true}
            />

            <InstructionField
              title="2. Стандарти сервісу"
              value=""
              onChangeText={() => {}}
              placeholder="Введіть стандарти сервісу..."
              editable={true}
            />

            <InstructionField
              title="3. Правила надання відгуку менеджерам з продажу"
              value=""
              onChangeText={() => {}}
              placeholder="Введіть правила..."
              editable={true}
            />

            {/* Save button */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={({ pressed }) => [
                  styles.saveButton,
                  { backgroundColor: pressed ? "#45a049" : "#4CAF50" },
                ]}
              >
                <Text style={styles.saveText}>Save Company</Text>
              </Pressable>
            </Animated.View>

            {/* Course */}
            <Text style={styles.sectionTitle}>Course</Text>
            <Dropdown
              label="Dropdown - Course"
              items={[
                { id: "1", name: "Course 1" },
                { id: "2", name: "Course 2" },
              ]}
              selected={null}
              onSelect={() => {}}
            />

            <InstructionField
              title="4. Скрипти Курсу"
              value=""
              onChangeText={() => {}}
              placeholder="Введіть скрипти..."
              editable={true}
            />

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={({ pressed }) => [
                  styles.saveButton,
                  { backgroundColor: pressed ? "#45a049" : "#4CAF50" },
                ]}
              >
                <Text style={styles.saveText}>Save Course</Text>
              </Pressable>
            </Animated.View>
          </ScrollView>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  saveButton: {
    width: "50%",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MockAIInstructionsScreen;
