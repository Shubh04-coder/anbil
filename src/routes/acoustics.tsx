import { createFileRoute } from "@tanstack/react-router";
import { PROFILES, type ProfileId } from "@/lib/catalog";
import { Spectrogram } from "@/components/spectrogram";
import { Button } from "@/components/ui/button";
import { useSim } from "@/lib/store";
import { formatHour } from "@/lib/utils";

export const Route = createFileRoute("/acoustics")({ component: AcousticsPage });

function AcousticsPage() {
  const hourly = useSim((s) => s.hourly);
  const hour = useSim((s) => s.hour);
  const setHour = useSim((s) => s.setHour);
  const selectedNodeId = useSim((s) => s.selectedNodeId);
  const pulseNode = useSim((s) => s.pulseNode);
  const enableAudio = useSim((s) => s.enableAudio);
  const audioReady = useSim((s) => s.audioReady);
  const maxHourly = Math.max(1, ...hourly);

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-5 p-3 md:p-5">
      <header className="max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Library</p>
        <h1 className="font-display mt-1 text-3xl text-fg md:text-4xl">Frequency lab</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Each pest family has a matched acoustic recipe. Ultrasonic carriers are heard here as
          audible analogs so you can judge the pulse from the console.
        </p>
      </header>

      <section className="relative h-56 overflow-hidden rounded-xl bg-field shadow-[0_0_0_1px_var(--color-line)] md:h-72">
        <Spectrogram className="absolute inset-0" />
        <div className="pointer-events-none absolute top-3 left-4">
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Live listen</p>
          <p className="text-sm text-fg">Selected node waterfall · 0–80 kHz</p>
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Object.values(PROFILES)
          .filter((p) => p.id !== "adaptive")
          .map((profile) => (
            <article
              key={profile.id}
              className="flex flex-col rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]"
            >
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                {profile.band}
              </p>
              <h2 className="font-display mt-1 text-xl text-fg">{profile.name}</h2>
              <p className="text-xs text-live">{profile.target}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{profile.summary}</p>
              <div className="mt-3 h-10 overflow-hidden rounded-[10px] bg-field">
                <SpectrumMini bins={profile.bins} />
              </div>
              <Button
                className="mt-3"
                size="sm"
                variant="outline"
                onClick={() => {
                  if (!audioReady) void enableAudio();
                  pulseNode(selectedNodeId ?? "acs-05", profile.id as ProfileId);
                }}
              >
                Test pulse
              </Button>
            </article>
          ))}
      </div>

      <section className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-medium text-fg">Detections by hour</h2>
            <p className="text-xs text-muted">
              Moths and rats after dusk. Parakeets at the canal in the first and last light.
            </p>
          </div>
          <label className="flex items-center gap-3 text-sm text-muted">
            Clock
            <input
              type="range"
              min={0}
              max={23.9}
              step={0.1}
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="h-10 w-40 accent-accent"
              aria-label="Set field clock"
            />
            <span className="font-mono text-fg tabular-nums">{formatHour(hour)}</span>
          </label>
        </div>
        <div className="mt-4 flex h-28 items-end gap-1">
          {hourly.map((v, i) => (
            <div key={i} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-sm bg-accent/80"
                style={{ height: `${Math.max(6, (v / maxHourly) * 100)}%` }}
                title={`${i}:00 · ${v}`}
              />
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-subtle">
          <span>00</span>
          <span>06</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
      </section>
    </div>
  );
}

function SpectrumMini({ bins }: { bins: number[] }) {
  return (
    <svg viewBox="0 0 80 40" className="h-full w-full" aria-hidden>
      {Array.from({ length: 32 }, (_, i) => {
        const khz = (i / 31) * 80;
        const near = bins.some((b) => Math.abs(b - khz) < 6);
        const h = near ? 28 : 6 + (i % 5);
        return (
          <rect
            key={i}
            x={i * 2.5 + 1}
            y={36 - h}
            width="1.6"
            height={h}
            rx="0.6"
            fill={near ? "#c5d4b8" : "#2a332c"}
          />
        );
      })}
    </svg>
  );
}
