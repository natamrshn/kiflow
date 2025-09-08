// src/components/CustomHeader.tsx
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomHeader() {
  const router = useRouter();

  const defaultAvatarUrl =
    "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg";

  return (
    <View style={styles.headerContainer}>
      {/* Guest label */}
      <View style={styles.guestLabel}>
        <Text style={styles.guestText}>Guest</Text>
      </View>

  
      {/* User avatar + кнопка входу/виходу */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Image source={{ uri: defaultAvatarUrl }} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  guestLabel: {
    backgroundColor: "#f3f3f3",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  guestText: {
    color: "#666",
    fontWeight: "500",
  },
  logo: {
    width: 120,
    height: 40,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  loginText: {
    color: "#007bff",
    fontWeight: "600",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#000",
  },
});
