import { createFileRoute } from "@tanstack/react-router";
import { EventFeed } from "@/components/event-feed";
import { FieldMap } from "@/components/field-map";
import { KpiStrip } from "@/components/kpi-strip";
import { NodeInspector } from "@/components/node-inspector";
import { Spectrogram } from "@/components/spectrogram";
import { useSim } from "@/lib/store";

export const Route = createFileRoute("/")({ component: FieldPage });

function FieldPage() {
  const selected = useSim((s) => s.selectedNodeId);
  const node = useSim((s) => s.nodes.find((n) => n.id === selected));

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-3 p-3 md:p-5">
      <KpiStrip className="hidden grid-cols-4 gap-2 xl:grid" />
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.6fr)_320px]">
        <div className="order-1 flex min-h-0 flex-col gap-3">
          <FieldMap />
          <KpiStrip className="grid grid-cols-2 gap-2 xl:hidden" />
          <section className="relative h-36 overflow-hidden rounded-xl bg-field shadow-[0_0_0_1px_var(--color-line)] md:h-44">
            <Spectrogram className="absolute inset-0" />
            <div className="pointer-events-none absolute top-2 left-3">
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                Node spectrogram
              </p>
              <p className="text-xs text-fg">{node?.code ?? "ACS"} · 0–80 kHz</p>
            </div>
          </section>
        </div>
        <div className="order-2 flex min-h-0 flex-col gap-3">
          <NodeInspector />
          <div className="flex min-h-[240px] flex-1 flex-col">
            <EventFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
