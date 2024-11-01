import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { Button } from "@/components/Button";
import { CreateCollection, GetCollectionsLive } from "@/lib/db/entities/collections";

export default function HomeScreen() {
  const { data, error, updatedAt } = GetCollectionsLive();
  console.log("DATA", data);
  console.log("ERROR", error);
  console.log("UPDATED AT", updatedAt);

  const handleAddCollection = async () => {
    const result = await CreateCollection({ name: "New Collection" + Math.random() });
    console.log("RESULT", result);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText>Welcome to me!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText>app/(tabs)/index.tsx</ThemedText> to see changes. Press{" "}
          <ThemedText>{Platform.select({ ios: "cmd + d", android: "cmd + m" })}</ThemedText> to open
          developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run <ThemedText>npm run reset-project</ThemedText> to get a fresh{" "}
          <ThemedText>app</ThemedText> directory. This will move the current{" "}
          <ThemedText>app</ThemedText> to <ThemedText>app-example</ThemedText>.
        </ThemedText>

        <Link href={"/"}>
          <ThemedText>Go to Details</ThemedText>
        </Link>
        <Link href={"/(settings)"}>
          <ThemedText>Go to Settings</ThemedText>
        </Link>

        <ThemedView className="flex flex-1 flex-col gap-4">
          {data.map((collection) => {
            return <ThemedText key={collection.id}> {collection.name}</ThemedText>;
          })}
        </ThemedView>

        <Button onPress={handleAddCollection}>
          <ThemedText>Create</ThemedText>
        </Button>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
