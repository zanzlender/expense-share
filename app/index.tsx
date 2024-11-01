import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { Image } from "react-native";
import { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-red-500" style={{ flex: 1 }} edges={["top"]}>
        <ThemedView
          exiting={FadeOutDown.duration(500)}
          className="bg-background flex flex-col flex-1 p-4 items-center gap-2 justify-center"
        >
          <Image
            source={require("@/assets/images/red-panda-samurai.png")}
            className="w-[200px] h-[200px]"
          />

          <ThemedText className="text-primary text-3xl font-bold mb-4">
            Budget expense{" "}
            <ThemedText className="text-orange-500 text-4xl underline">Panda</ThemedText>
          </ThemedText>

          <ThemedText className="text-lg font-bold">
            ~ Always fighting to keet things fair ~
          </ThemedText>

          {/** // TODO Add login logic and redirect from this page if logged in */}
          <Link href="/(tabs)" asChild>
            <Button className="bg-destructive w-full px-2 py-4 mt-12">
              <ThemedText className="text-destructive-foreground">Login</ThemedText>
            </Button>
          </Link>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
