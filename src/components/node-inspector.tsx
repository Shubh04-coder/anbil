import { Battery, Sun, Wifi } from "lucide-react";
import { PESTS, PROFILES, type PestKind, type ProfileId } from "@/lib/catalog";
import { nodeStatus, useSim } from "@/lib/store";
import { Badge, StatusDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TONE: Record<ReturnType<typeof nodeStatus>, "live" | "warn" | "danger" | "mute"> = {
  listening: "live",
  pulsing: "live",
  standby: "mute",
  low: "warn",
  offline: "danger",
};

export function NodeInspector() {
  const nodes = useSim((s) => s.nodes);
  const selectedNodeId = useSim((s) => s.selectedNodeId);
  const simTime = useSim((s) => s.simTime);
  const dropKind = useSim((s) => s.dropKind);
  const setDropKind = useSim((s) => s.setDropKind);
  const toggleArm = useSim((s) => s.toggleArm);
  const setProfile = useSim((s) => s.setProfile);
  const pulseNode = useSim((s) => s.pulseNode);
  const pulseArmed = useSim((s) => s.pulseArmed);
  const armAll = useSim((s) => s.armAll);
  const node = nodes.find((n) => n.id === selectedNodeId) ?? nodes[0];
  if (!node) return null;
  const status = nodeStatus(node, simTime);

  return (
    <aside className="flex flex-col gap-3">
      <section className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
              {node.sector}
            </p>
            <h2 className="font-display text-2xl leading-tight text-fg">{node.code}</h2>
          </div>
          <Badge tone={TONE[status]}>
            <StatusDot tone={TONE[status]} />
            {status}
          </Badge>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2">
          <Meter icon={Battery} label="Battery" value={`${Math.round(node.battery * 100)}%`} />
          <Meter icon={Sun} label="Solar" value={`${node.solarW.toFixed(1)} W`} />
          <Meter icon={Wifi} label="RSSI" value={`${node.rssi} dBm`} />
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" variant={node.armed ? "outline" : "default"} onClick={() => toggleArm(node.id)}>
            {node.armed ? "Disarm" : "Arm"}
          </Button>
          <Button size="sm" onClick={() => pulseNode(node.id)} disabled={node.battery < 0.08}>
            Pulse now
          </Button>
        </div>

        <label className="mt-4 block">
          <span className="text-[11px] font-medium tracking-wide text-muted uppercase">Library</span>
          <select
            className="mt-1 h-10 w-full rounded-[10px] bg-raised px-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] outline-none"
            value={node.profileId}
            onChange={(e) => setProfile(node.id, e.target.value as ProfileId)}
          >
            {Object.values(PROFILES).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          {PROFILES[node.profileId].summary}
        </p>
      </section>

      <section className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]">
        <h3 className="text-sm font-medium text-fg">Introduce pressure</h3>
        <p className="mt-1 text-xs text-muted">
          Click the paddy, or drop a signature at the selected node.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(Object.keys(PESTS) as PestKind[]).map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => setDropKind(kind)}
              className={cn(
                "h-9 rounded-full px-3 text-xs transition-[background-color,color] duration-150",
                dropKind === kind
                  ? "bg-accent text-accent-fg"
                  : "bg-raised text-muted hover:text-fg",
              )}
            >
              {PESTS[kind].label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => pulseArmed()}>
            Pulse armed
          </Button>
          <Button size="sm" variant="ghost" onClick={() => armAll(true)}>
            Arm all
          </Button>
        </div>
      </section>
    </aside>
  );
}

function Meter({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Battery;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[12px] bg-raised px-2.5 py-2">
      <p className="flex items-center gap-1 text-[10px] tracking-wide text-muted uppercase">
        <Icon className="size-3" />
        {label}
      </p>
      <p className="mt-0.5 font-mono text-sm text-fg tabular-nums">{value}</p>
    </div>
  );
}
