import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium outline-none select-none disabled:pointer-events-none disabled:opacity-40 transition-[color,background-color,box-shadow,opacity,transform] duration-150 ease-out active:not-disabled:scale-[0.96] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent)_45%,transparent)]",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-fg hover:bg-accent/90",
        outline:
          "bg-transparent text-fg shadow-[0_0_0_1px_var(--color-line)] hover:bg-raised",
        ghost: "bg-transparent text-muted hover:text-fg hover:bg-raised",
        danger: "bg-danger/15 text-danger hover:bg-danger/25",
      },
      size: {
        default: "h-10 px-3.5",
        sm: "h-8 px-2.5 text-xs rounded-lg",
        lg: "h-11 px-4",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
