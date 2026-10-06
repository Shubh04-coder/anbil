import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide",
  {
    variants: {
      tone: {
        mute: "bg-raised text-muted",
        live: "bg-live/15 text-live",
        warn: "bg-warn/15 text-warn",
        danger: "bg-danger/15 text-danger",
        fg: "bg-fg/10 text-fg",
      },
    },
    defaultVariants: { tone: "mute" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone, className }))} {...props} />;
}

export function StatusDot({ tone }: { tone: "live" | "warn" | "danger" | "mute" }) {
  const color = {
    live: "bg-live",
    warn: "bg-warn",
    danger: "bg-danger",
    mute: "bg-subtle",
  }[tone];
  return <span className={cn("size-1.5 rounded-full", color)} aria-hidden />;
}
