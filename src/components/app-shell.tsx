import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Cpu,
  Map,
  Pause,
  Play,
  Radio,
  Volume2,
  VolumeX,
  Waves,
} from "lucide-react";
import { Mark } from "@/components/mark";
import { SimTicker } from "@/components/sim-ticker";
import { Button } from "@/components/ui/button";
import { useSim } from "@/lib/store";
import { cn, formatHour } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Field", icon: Map },
  { to: "/acoustics", label: "Acoustics", icon: Waves },
  { to: "/fleet", label: "Fleet", icon: Radio },
  { to: "/hardware", label: "Hardware", icon: Cpu },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hour = useSim((s) => s.hour);
  const speed = useSim((s) => s.speed);
  const setSpeed = useSim((s) => s.setSpeed);
  const muted = useSim((s) => s.muted);
  const setMuted = useSim((s) => s.setMuted);
  const audioReady = useSim((s) => s.audioReady);
  const enableAudio = useSim((s) => s.enableAudio);
  const nodes = useSim((s) => s.nodes);
  const listening = nodes.filter((n) => n.armed && n.battery >= 0.08).length;

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <SimTicker />
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-bg/90 px-3 py-2.5 backdrop-blur-sm md:px-5">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <Mark className="size-8 text-accent" />
          <span className="min-w-0">
            <span className="block font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
              Acoustic
            </span>
            <span className="font-display block text-base leading-none text-fg">
              Crop Shield
            </span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-[10px] px-3 text-sm transition-[color,background-color] duration-150",
                  active ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg",
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] text-muted tabular-nums sm:flex">
            <Activity className="size-3.5 text-live" />
            {listening}/8
            <span className="mx-1 text-line">|</span>
            {formatHour(hour)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            aria-label={speed === 0 ? "Resume field" : "Pause field"}
            onClick={() => setSpeed(speed === 0 ? 1 : 0)}
          >
            {speed === 0 ? <Play className="size-4" /> : <Pause className="size-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => setSpeed(speed === 8 ? 1 : 8)}
          >
            {speed === 8 ? "1×" : "8×"}
          </Button>
          <Button
            variant={audioReady && !muted ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (!audioReady) void enableAudio();
              else setMuted(!muted);
            }}
          >
            {audioReady && !muted ? (
              <Volume2 className="size-4" />
            ) : (
              <VolumeX className="size-4" />
            )}
            <span className="hidden sm:inline">
              {!audioReady ? "Hear pulses" : muted ? "Muted" : "Live"}
            </span>
          </Button>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col pb-[4.25rem] md:pb-0">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-bg/95 md:hidden">
        {NAV.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]",
                active ? "text-fg" : "text-muted",
              )}
            >
              <Icon className="size-4" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
