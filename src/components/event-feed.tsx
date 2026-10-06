import { PESTS } from "@/lib/catalog";
import { useSim } from "@/lib/store";
import { formatHour } from "@/lib/utils";

export function EventFeed() {
  const events = useSim((s) => s.events);
  const nodes = useSim((s) => s.nodes);
  const selectNode = useSim((s) => s.selectNode);

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-line)]">
      <header className="flex items-center justify-between px-4 py-3">
        <h2 className="text-sm font-medium text-fg">Event tape</h2>
        <span className="font-mono text-[11px] text-muted tabular-nums">{events.length}</span>
      </header>
      <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2 pb-3">
        {events.length === 0 ? (
          <li className="px-2 py-6 text-center text-sm text-muted">Field is quiet. Listening.</li>
        ) : (
          events.map((evt) => {
            const node = nodes.find((n) => n.id === evt.nodeId);
            return (
              <li key={evt.id}>
                <button
                  type="button"
                  onClick={() => selectNode(evt.nodeId)}
                  className="flex w-full items-start gap-3 rounded-[12px] px-2 py-2 text-left transition-[background-color] duration-150 hover:bg-raised"
                >
                  <span
                    className={
                      evt.action === "pulsed"
                        ? "mt-1.5 size-1.5 shrink-0 rounded-full bg-live"
                        : evt.action === "cleared"
                          ? "mt-1.5 size-1.5 shrink-0 rounded-full bg-muted"
                          : "mt-1.5 size-1.5 shrink-0 rounded-full bg-warn"
                    }
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm text-fg">{PESTS[evt.kind].label}</span>
                      <span className="font-mono text-[10px] text-subtle tabular-nums">
                        {formatHour(evt.hour)}
                      </span>
                    </span>
                    <span className="block truncate text-xs text-muted">
                      {node?.code} · {evt.action} · {Math.round(evt.confidence * 100)}% · {evt.khz} kHz
                    </span>
                  </span>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
