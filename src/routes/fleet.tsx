import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { PROFILES } from "@/lib/catalog";
import { Badge, StatusDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { nodeStatus, useSim } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fleet")({ component: FleetPage });

const TONE: Record<ReturnType<typeof nodeStatus>, "live" | "warn" | "danger" | "mute"> = {
  listening: "live",
  pulsing: "live",
  standby: "mute",
  low: "warn",
  offline: "danger",
};

function FleetPage() {
  const nodes = useSim((s) => s.nodes);
  const simTime = useSim((s) => s.simTime);
  const selectedNodeId = useSim((s) => s.selectedNodeId);
  const selectNode = useSim((s) => s.selectNode);
  const toggleArm = useSim((s) => s.toggleArm);
  const pulseNode = useSim((s) => s.pulseNode);
  const armAll = useSim((s) => s.armAll);
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-5 p-3 md:p-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Plot nodes</p>
          <h1 className="font-display mt-1 text-3xl text-fg md:text-4xl">Fleet</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Eight solar stakes on LoRaWAN. ACS-07 is on the SW corner with a tired pack — disarm
            keeps it as a listen-only spare until the next sun.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => armAll(true)}>
            Arm all
          </Button>
          <Button variant="ghost" size="sm" onClick={() => armAll(false)}>
            Stand down
          </Button>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {nodes.map((node) => {
          const status = nodeStatus(node, simTime);
          const selected = node.id === selectedNodeId;
          return (
            <article
              key={node.id}
              className={cn(
                "flex flex-col rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] transition-[box-shadow] duration-150",
                selected && "shadow-[0_0_0_1px_var(--color-accent)]",
              )}
            >
              <button
                type="button"
                className="text-left"
                onClick={() => {
                  selectNode(node.id);
                  void navigate({ to: "/" });
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                      {node.sector}
                    </p>
                    <h2 className="font-display text-2xl text-fg">{node.code}</h2>
                  </div>
                  <Badge tone={TONE[status]}>
                    <StatusDot tone={TONE[status]} />
                    {status}
                  </Badge>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-raised">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      node.battery < 0.2 ? "bg-warn" : "bg-live",
                    )}
                    style={{ width: `${Math.round(node.battery * 100)}%` }}
                  />
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  <dt className="text-muted">Battery</dt>
                  <dd className="text-right font-mono text-fg tabular-nums">
                    {Math.round(node.battery * 100)}%
                  </dd>
                  <dt className="text-muted">Solar</dt>
                  <dd className="text-right font-mono text-fg tabular-nums">
                    {node.solarW.toFixed(1)} W
                  </dd>
                  <dt className="text-muted">RSSI</dt>
                  <dd className="text-right font-mono text-fg tabular-nums">{node.rssi} dBm</dd>
                  <dt className="text-muted">Heard</dt>
                  <dd className="text-right font-mono text-fg tabular-nums">{node.detections}</dd>
                  <dt className="text-muted">Library</dt>
                  <dd className="truncate text-right text-fg">{PROFILES[node.profileId].name}</dd>
                </dl>
              </button>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant={node.armed ? "outline" : "default"}
                  onClick={() => toggleArm(node.id)}
                >
                  {node.armed ? "Disarm" : "Arm"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={node.battery < 0.08}
                  onClick={() => pulseNode(node.id)}
                >
                  Pulse
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
