import { Text, type TextProps } from "react-native";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const themedTextVariants = cva("text-lg text-primary-foreground", {
  variants: {
    variant: {
      default: "text-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ThemedTextProps = TextProps & VariantProps<typeof themedTextVariants>;

export function ThemedText({ className, variant, ...rest }: ThemedTextProps) {
  return <Text className={cn(themedTextVariants({ variant }), className)} {...rest} />;
}
