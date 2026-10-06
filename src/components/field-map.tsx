import { useEffect, useRef } from "react";
import { LISTEN_RADIUS, PESTS, type PestKind } from "@/lib/catalog";
import { coverageOf, nodeStatus, useSim } from "@/lib/store";
import { formatHour } from "@/lib/utils";

const KIND_HEX: Record<PestKind, string> = {
  moth: "#c4786a",
  hopper: "#7eaa78",
  rodent: "#c4a574",
  parakeet: "#eef2ea",
  locust: "#c5d4b8",
};

const PULSE_VIS = 0.32;

function css(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function FieldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aerialRef = useRef<HTMLImageElement | null>(null);
  const nodes = useSim((s) => s.nodes);
  const hour = useSim((s) => s.hour);
  const dropKind = useSim((s) => s.dropKind);
  const selectNode = useSim((s) => s.selectNode);
  const spawnAt = useSim((s) => s.spawnAt);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/field-aerial.jpg";
    img.onload = () => {
      aerialRef.current = img;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const draw = () => {
      const { nodes: liveNodes, pests, pulses, selectedNodeId, hour: clock, simTime } =
        useSim.getState();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w < 8 || h < 8) return;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pad = 18;
      const fw = w - pad * 2;
      const fh = h - pad * 2;
      const toX = (x: number) => pad + x * fw;
      const toY = (y: number) => pad + y * fh;

      const bg = css("--color-field") || "#121810";
      const fg = css("--color-fg") || "#eef2ea";
      const live = css("--color-live") || "#7eaa78";
      const muted = css("--color-muted") || "#8b9588";
      const line = css("--color-line") || "#2a332c";

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      roundRect(ctx, pad - 4, pad - 4, fw + 8, fh + 8, 16);
      ctx.clip();

      const aerial = aerialRef.current;
      if (aerial && aerial.complete) {
        ctx.globalAlpha = 0.62;
        ctx.drawImage(aerial, pad - 4, pad - 4, fw + 8, fh + 8);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(13,17,15,0.28)";
        ctx.fillRect(pad - 4, pad - 4, fw + 8, fh + 8);
      }

      const night = clock >= 19.5 || clock < 5.5 ? 0.38 : clock >= 18 || clock < 6.8 ? 0.2 : 0.04;
      ctx.fillStyle = `rgba(8,12,10,${night})`;
      ctx.fillRect(pad - 4, pad - 4, fw + 8, fh + 8);

      ctx.strokeStyle = "rgba(197,212,184,0.09)";
      ctx.lineWidth = 1;
      const rows = 18;
      for (let i = 0; i <= rows; i += 1) {
        const y = pad + (i / rows) * fh;
        ctx.beginPath();
        ctx.moveTo(pad, y);
        ctx.lineTo(pad + fw, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(197,212,184,0.05)";
      for (let i = 0; i <= 10; i += 1) {
        const x = pad + (i / 10) * fw;
        ctx.beginPath();
        ctx.moveTo(x, pad);
        ctx.lineTo(x, pad + fh);
        ctx.stroke();
      }

      for (const node of liveNodes) {
        if (!node.armed || node.battery < 0.08) continue;
        const x = toX(node.x);
        const y = toY(node.y);
        ctx.beginPath();
        ctx.ellipse(x, y, LISTEN_RADIUS * fw, LISTEN_RADIUS * fh, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(126,170,120,0.06)";
        ctx.fill();
        ctx.strokeStyle = "rgba(126,170,120,0.22)";
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      for (const pulse of pulses) {
        const age = (simTime - pulse.born) / pulse.life;
        const x = toX(pulse.x);
        const y = toY(pulse.y);
        ctx.beginPath();
        ctx.ellipse(x, y, age * PULSE_VIS * fw, age * PULSE_VIS * fh, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(197,212,184,${0.55 * (1 - age)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      for (const pest of pests) {
        const x = toX(pest.x);
        const y = toY(pest.y);
        ctx.fillStyle = KIND_HEX[pest.kind];
        ctx.globalAlpha = pest.fleeing ? 0.45 : 0.95;
        ctx.beginPath();
        if (pest.kind === "parakeet") {
          ctx.moveTo(x, y - 6);
          ctx.lineTo(x + 6, y + 4);
          ctx.lineTo(x - 6, y + 4);
          ctx.closePath();
        } else if (pest.kind === "moth") {
          ctx.ellipse(x, y, 6.5, 3, pest.vx, 0, Math.PI * 2);
        } else if (pest.kind === "rodent") {
          roundRect(ctx, x - 5, y - 3.5, 10, 7, 2);
        } else if (pest.kind === "locust") {
          ctx.moveTo(x, y - 6);
          ctx.lineTo(x + 5, y);
          ctx.lineTo(x, y + 6);
          ctx.lineTo(x - 5, y);
          ctx.closePath();
        } else {
          ctx.ellipse(x, y, 4, 5.5, 0, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.restore();

      for (const node of liveNodes) {
        const x = toX(node.x);
        const y = toY(node.y);
        const status = nodeStatus(node, simTime);
        const fill =
          status === "offline"
            ? "#5e675c"
            : status === "low"
              ? "#c4a574"
              : status === "pulsing"
                ? live
                : status === "standby"
                  ? muted
                  : live;

        if (node.id === selectedNodeId) {
          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);
          ctx.strokeStyle = fg;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = bg;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = "500 10px Outfit, sans-serif";
        ctx.fillStyle = fg;
        ctx.textAlign = "center";
        ctx.fillText(node.code, x, y + 18);
      }

      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      roundRect(ctx, pad - 4, pad - 4, fw + 8, fh + 8, 16);
      ctx.stroke();

      ctx.font = "500 10px IBM Plex Mono, monospace";
      ctx.fillStyle = muted;
      ctx.textAlign = "left";
      ctx.fillText("N", w - 28, pad + 8);
      ctx.beginPath();
      ctx.moveTo(w - 24, pad + 14);
      ctx.lineTo(w - 24, pad + 28);
      ctx.lineTo(w - 27, pad + 24);
      ctx.moveTo(w - 24, pad + 28);
      ctx.lineTo(w - 21, pad + 24);
      ctx.strokeStyle = muted;
      ctx.stroke();

      ctx.fillText("40 m", pad + 8, h - 10);
      ctx.beginPath();
      ctx.moveTo(pad + 8, h - 16);
      ctx.lineTo(pad + 56, h - 16);
      ctx.stroke();
    };

    let raf = 0;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => draw());
    ro.observe(parent);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  function onPointer(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pad = 18;
    const fw = rect.width - pad * 2;
    const fh = rect.height - pad * 2;
    const x = (e.clientX - rect.left - pad) / fw;
    const y = (e.clientY - rect.top - pad) / fh;
    const hit = nodes.find((n) => Math.hypot(n.x - x, n.y - y) < 0.045);
    if (hit) {
      selectNode(hit.id);
      return;
    }
    if (x >= 0 && x <= 1 && y >= 0 && y <= 1) spawnAt(dropKind, x, y);
  }

  const cover = Math.round(coverageOf(nodes) * 100);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-field shadow-[0_0_0_1px_var(--color-line)]">
      <canvas
        ref={canvasRef}
        className="h-full min-h-[360px] w-full cursor-crosshair touch-none lg:min-h-[440px]"
        onPointerDown={onPointer}
        aria-label="Listening field map. Click a node to inspect, or click the paddy to introduce pest pressure."
      />
      <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-3">
        <div className="rounded-[14px] bg-bg/80 px-3 py-2 shadow-[0_0_0_1px_var(--color-line)] backdrop-blur-sm">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            Listening field
          </p>
          <p className="font-display text-lg leading-tight text-fg">Kolar Bend</p>
          <p className="text-xs text-muted">Block C · 4.6 ha flooded rice</p>
        </div>
        <div className="rounded-[14px] bg-bg/80 px-3 py-2 text-right shadow-[0_0_0_1px_var(--color-line)] backdrop-blur-sm">
          <p className="font-mono text-[11px] tabular-nums text-fg">{formatHour(hour)}</p>
          <p className="text-xs text-muted">{cover}% covered</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden flex-wrap gap-2 sm:flex">
        {(Object.keys(PESTS) as PestKind[]).map((k) => (
          <span
            key={k}
            className="inline-flex items-center gap-1.5 rounded-full bg-bg/80 px-2 py-1 text-[11px] text-muted shadow-[0_0_0_1px_var(--color-line)]"
          >
            <span
              className={
                k === "moth"
                  ? "size-1.5 rounded-full bg-danger"
                  : k === "hopper"
                    ? "size-1.5 rounded-full bg-live"
                    : k === "rodent"
                      ? "size-1.5 rounded-full bg-warn"
                      : k === "parakeet"
                        ? "size-1.5 rounded-full bg-fg"
                        : "size-1.5 rounded-full bg-accent"
              }
            />
            {PESTS[k].label}
          </span>
        ))}
      </div>
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}
