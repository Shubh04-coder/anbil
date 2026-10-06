import { coverageOf, useSim } from "@/lib/store";

export function KpiStrip({ className }: { className?: string }) {
  const detections = useSim((s) => s.detectionsToday);
  const pulses = useSim((s) => s.pulsesToday);
  const pests = useSim((s) => s.pests);
  const nodes = useSim((s) => s.nodes);
  const online = nodes.filter((n) => n.battery >= 0.08).length;
  const cover = Math.round(coverageOf(nodes) * 100);
  const pressure = pests.filter((p) => !p.fleeing).length;

  const items = [
    { k: "Detections", v: detections.toString(), d: "since 00:00" },
    { k: "Pulses fired", v: pulses.toString(), d: "matched library" },
    { k: "Active pressure", v: pressure.toString(), d: "signatures in plot" },
    { k: "Nodes", v: `${online}/8`, d: `${cover}% listen cover` },
  ];

  return (
    <section className={className ?? "grid grid-cols-2 gap-2 lg:grid-cols-4"}>
      {items.map((item) => (
        <article
          key={item.k}
          className="rounded-xl bg-surface px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]"
        >
          <p className="text-[11px] tracking-wide text-muted uppercase">{item.k}</p>
          <p className="font-display mt-1 text-xl leading-none text-fg tabular-nums md:text-2xl">{item.v}</p>
          <p className="mt-1 text-xs text-subtle">{item.d}</p>
        </article>
      ))}
    </section>
  );
}
