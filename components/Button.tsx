import { Pressable, View, type PressableProps } from "react-native";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-primary-foreground hover:bg-primary/90 ",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ThemedButtonProps = PressableProps & { asChild?: boolean } & VariantProps<
    typeof buttonVariants
  >;

/* export default function Button({
  className,
  variant,
  size,
  children,
  ...otherProps
}: ThemedButtonProps) {
  console.log(cn(buttonVariants({ variant, size, className })));

  return (
    <Pressable className={cn(buttonVariants({ variant, size, className }))} {...otherProps}>
      {children}
    </Pressable>
  );
} */

const Button = forwardRef<View, ThemedButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    console.log(cn(buttonVariants({ variant, size, className })));
    return (
      <Pressable
        className={`${cn(buttonVariants({ variant, size, className }))}`}
        ref={ref}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
