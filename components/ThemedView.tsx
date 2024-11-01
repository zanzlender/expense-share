import { type ViewProps } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useColorScheme } from "nativewind";
import { themes } from "@/constants/themes";

const viewVariants = cva("bg-background", {
  variants: {
    variant: {
      default: "bg-background",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ThemedViewProps = AnimatedProps<ViewProps> & VariantProps<typeof viewVariants>;

export function ThemedView({
  style,
  className,
  variant,
  children,
  ...otherProps
}: ThemedViewProps) {
  const colorScheme = useColorScheme().colorScheme ?? "light";

  return (
    <Animated.View
      className={cn(viewVariants({ variant, className }))}
      sharedTransitionTag="shared-transition"
      {...otherProps}
    >
      {children}
    </Animated.View>
  );
}
