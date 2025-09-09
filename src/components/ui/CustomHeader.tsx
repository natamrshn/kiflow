// src/components/CustomHeader.tsx
import { useIsGuestUser } from "@/src/hooks/auth/useIsGuestUser";
import { signOut } from "@/src/services/auth";
import { Href, useRouter } from "expo-router";
import { LogIn, LogOut } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AppRoute } from "../screens/HomePageScreen/NavigationButton";
import { Button } from "./button";
import { HStack } from "./hstack";
import { Icon } from "./icon";

export default function CustomHeader() {
  const router = useRouter();

  const isGuestValue = useIsGuestUser();
  const isGuest = isGuestValue === null ? true : isGuestValue;

  const defaultAvatarUrl =
    "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg";

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        console.error("Logout error:", error);
        return;
      }
      console.log("Successfully logged out");
    } catch (error) {
      console.error("Unexpected logout error:", error);
    }
  };

  const navigateTo = (route: AppRoute) => {
    router.push(route as Href);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Left side: Guest label */}
      {isGuest ? (
        <HStack className="items-center justify-center rounded-md bg-gray-100 px-3 py-1">
          
          <Text style={styles.guestText}>Guest</Text>
        </HStack>
      ):
      <HStack className="items-center justify-center rounded-md bg-gray-100 px-3 py-1">
          
          <Text style={styles.guestText}>User</Text>
        </HStack>
      }

      {/* Right side: actions */}
      <View style={styles.actions}>
        {isGuest ? (
          <Button
            variant="solid"
            size="sm"
            action="primary"
            onPress={() => navigateTo("/")}
            className="rounded-md"
          >
            <Icon as={LogIn} className="mr-1 text-white" />
            {/* <ButtonText className="text-white">Login</ButtonText> */}
          </Button>
        ) : (
          <>
            <Image
              source={{ uri: defaultAvatarUrl }}
              style={styles.avatar}
            />
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              onPress={handleLogout}
              className="rounded-md"
            >
              <Icon as={LogOut} className="mr-1" />
              {/* <ButtonText>Logout</ButtonText> */}
            </Button>
          </>
        )}
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
  guestText: {
    color: "#666",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#000",
  },
});
