import { useEffect, useRef } from "react";
import { LISTEN_RADIUS, PESTS, PROFILES } from "@/lib/catalog";
import { cn, dist } from "@/lib/utils";
import { useSim } from "@/lib/store";

const BINS = 64;
const MAX_KHZ = 80;

export function Spectrogram({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedNodeId = useSim((s) => s.selectedNodeId);
  const nodes = useSim((s) => s.nodes);
  const node = nodes.find((n) => n.id === selectedNodeId) ?? nodes[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    let raf = 0;
    let primed = false;

    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w < 8 || h < 8) {
        raf = requestAnimationFrame(draw);
        return;
      }
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (primed) ctx.drawImage(canvas, -Math.round(2 * dpr), 0);

      const col = new Array<number>(BINS).fill(0);
      const state = useSim.getState();
      const night = state.hour >= 19 || state.hour < 6 ? 0.28 : 0.16;
      for (let i = 0; i < BINS; i += 1) {
        col[i] = 0.14 + night * Math.random() * (0.45 + i / BINS);
      }

      const n = state.nodes.find((nd) => nd.id === state.selectedNodeId) ?? state.nodes[0];
      if (n) {
        for (const pest of state.pests) {
          const d = dist(pest.x, pest.y, n.x, n.y);
          if (d > LISTEN_RADIUS * 1.15) continue;
          const gain = (1 - d / (LISTEN_RADIUS * 1.15)) * PESTS[pest.kind].loudness;
          const profile = PROFILES[PESTS[pest.kind].profileId];
          for (const khz of profile.bins) {
            const bin = Math.round((khz / MAX_KHZ) * (BINS - 1));
            for (let k = -2; k <= 2; k += 1) {
              const b = bin + k;
              if (b < 0 || b >= BINS) continue;
              col[b] += gain * (1 - Math.abs(k) / 3) * (1.2 + Math.random() * 0.5);
            }
          }
        }
        if (state.simTime < n.pulseUntil && n.pulseProfile) {
          const profile = PROFILES[n.pulseProfile];
          for (const khz of profile.bins) {
            const bin = Math.round((khz / MAX_KHZ) * (BINS - 1));
            col[bin] = Math.max(col[bin], 1.4);
            if (bin + 1 < BINS) col[bin + 1] = Math.max(col[bin + 1], 0.9);
          }
        }
      }

      const colW = Math.max(2, Math.round(2 * dpr));
      const paintCol = (xPos: number) => {
        for (let i = 0; i < BINS; i += 1) {
          const v = Math.min(1.5, col[i] ?? 0) / 1.5;
          const y0 = canvas.height - ((i + 1) / BINS) * canvas.height;
          const bh = canvas.height / BINS + 1;
          const r = Math.floor(22 + v * 190);
          const g = Math.floor(34 + v * 200);
          const b = Math.floor(24 + v * 130);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(xPos, y0, colW + 1, bh);
        }
      };
      if (!primed) {
        for (let xPos = 0; xPos < canvas.width; xPos += colW) paintCol(xPos);
        primed = true;
      } else {
        paintCol(canvas.width - colW);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "rgba(13,17,15,0.55)";
      ctx.fillRect(0, 0, 8, h);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full rounded-[14px]"
        aria-label={`Live spectrogram for ${node?.code ?? "selected node"}`}
      />
      <div className="pointer-events-none absolute inset-y-2 left-2 flex flex-col justify-between font-mono text-[9px] text-muted">
        <span>80</span>
        <span>40</span>
        <span>20</span>
        <span>kHz</span>
      </div>
    </div>
  );
}
