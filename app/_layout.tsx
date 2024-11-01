import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "./global.css";
import { verifyInstallation } from "nativewind";
import { InitializeDatabaseHook } from "@/lib/db/database";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";
import { View } from "react-native";

const db = SQLite.openDatabaseSync("db");

export default function RootLayout() {
  const { error: migrationError, success: migrationSuccess } = InitializeDatabaseHook();
  useDrizzleStudio(db);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded && migrationSuccess) {
      SplashScreen.hideAsync();
    }
  }, [loaded, migrationError, migrationSuccess]);

  if (!loaded || !migrationSuccess) {
    return null;
  }

  // Nativewind verification
  verifyInstallation();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
