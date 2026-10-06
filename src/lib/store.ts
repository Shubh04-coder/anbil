import { create } from "zustand";
import {
  LISTEN_RADIUS,
  NODE_SEEDS,
  PESTS,
  PLOT,
  PROFILES,
  PULSE_RADIUS,
  type NodeRecord,
  type Pest,
  type PestKind,
  type ProfileId,
  type PulseRing,
  type SimEvent,
} from "@/lib/catalog";
import { playPulse, unlockAudio } from "@/lib/audio";
import { clamp, dist, mulberry32, nid } from "@/lib/utils";

const rand = mulberry32(0xac05);

export type Speed = 0 | 1 | 8;

type SimState = {
  hour: number;
  speed: Speed;
  muted: boolean;
  audioReady: boolean;
  selectedNodeId: string | null;
  dropKind: PestKind;
  nodes: NodeRecord[];
  pests: Pest[];
  pulses: PulseRing[];
  events: SimEvent[];
  hourly: number[];
  detectionsToday: number;
  pulsesToday: number;
  simTime: number;
  tick: (dt: number) => void;
  setSpeed: (speed: Speed) => void;
  setHour: (hour: number) => void;
  setMuted: (muted: boolean) => void;
  enableAudio: () => Promise<void>;
  selectNode: (id: string | null) => void;
  setDropKind: (kind: PestKind) => void;
  toggleArm: (id: string) => void;
  setProfile: (id: string, profileId: ProfileId) => void;
  armAll: (armed: boolean) => void;
  spawnAt: (kind: PestKind, x: number, y: number) => void;
  pulseNode: (id: string, profileId?: ProfileId) => void;
  pulseArmed: () => void;
};

function seedNodes(): NodeRecord[] {
  return NODE_SEEDS.map((n) => ({
    ...n,
    solarW: n.battery > 0.2 ? 3.2 + rand() * 4 : 0.4,
    detections: Math.floor(rand() * 14),
    lastEventAt: null,
    coolingUntil: 0,
    pulseUntil: 0,
    pulseProfile: null,
  }));
}

function spawnPest(kind: PestKind, x?: number, y?: number): Pest {
  const edge = Math.floor(rand() * 4);
  let px = x;
  let py = y;
  if (px === undefined || py === undefined) {
    if (edge === 0) {
      px = rand();
      py = -0.02;
    } else if (edge === 1) {
      px = 1.02;
      py = rand();
    } else if (edge === 2) {
      px = rand();
      py = 1.02;
    } else {
      px = -0.02;
      py = rand();
    }
  }
  const towardX = 0.35 + rand() * 0.3 - px;
  const towardY = 0.35 + rand() * 0.3 - py;
  const mag = Math.hypot(towardX, towardY) || 1;
  const speed = PESTS[kind].speed * (0.7 + rand() * 0.6);
  return {
    id: nid("pest"),
    kind,
    x: px,
    y: py,
    vx: (towardX / mag) * speed,
    vy: (towardY / mag) * speed,
    stress: 0,
    fleeing: false,
    lastDetect: {},
  };
}

function resolveProfile(node: NodeRecord, kind: PestKind): ProfileId {
  if (node.profileId === "adaptive") return PESTS[kind].profileId;
  return node.profileId;
}

function nightFactor(hour: number) {
  if (hour >= 20 || hour < 5) return 0.92;
  if (hour >= 18 || hour < 6.5) return 0.55;
  return 0.12;
}

export const useSim = create<SimState>((set, get) => ({
  hour: 19.35,
  speed: 1,
  muted: false,
  audioReady: false,
  selectedNodeId: "acs-05",
  dropKind: "moth",
  nodes: seedNodes(),
  pests: [
    spawnPest("moth", 0.28, 0.24),
    spawnPest("moth", 0.62, 0.18),
    spawnPest("parakeet", 0.72, 0.32),
    spawnPest("rodent", 0.22, 0.7),
    spawnPest("hopper", 0.58, 0.62),
  ],
  pulses: [],
  events: [],
  hourly: Array.from({ length: 24 }, (_, i) =>
    i >= 18 || i < 5 ? 4 + Math.floor(rand() * 8) : 1 + Math.floor(rand() * 3),
  ),
  detectionsToday: 37,
  pulsesToday: 29,
  simTime: 0,

  tick: (dt) => {
    const state = get();
    if (state.speed === 0) return;
    const step = Math.min(dt, 0.05) * state.speed;
    const hour = (state.hour + step * (24 / 900)) % 24;
    const simTime = state.simTime + step;
    const sunUp = hour >= 6.2 && hour <= 17.8;
    const ambient = nightFactor(hour);

    const nodes = state.nodes.map((n) => {
      let battery = n.battery;
      let solarW = n.solarW;
      if (sunUp) {
        solarW = 2.4 + (0.5 - Math.abs(hour - 12) / 12) * 7.2 * (0.85 + rand() * 0.2);
        battery = clamp(battery + step * 0.0045 * (solarW / 8), 0, 1);
      } else {
        solarW = 0.05 + rand() * 0.08;
        battery = clamp(battery - step * (n.armed ? 0.0018 : 0.0004), 0, 1);
      }
      const pulsing = simTime < n.pulseUntil;
      return { ...n, battery, solarW, pulseUntil: pulsing ? n.pulseUntil : 0, pulseProfile: pulsing ? n.pulseProfile : null };
    });

    let detectionsToday = state.detectionsToday;
    let pulsesToday = state.pulsesToday;
    const hourly = state.hourly.slice();
    const events = state.events.slice();
    const newPulses: PulseRing[] = [];

    let pests = state.pests.map((p) => ({ ...p, lastDetect: { ...p.lastDetect } }));

    for (const pest of pests) {
      const spec = PESTS[pest.kind];
      if (pest.fleeing) {
        const dx = pest.x < 0.5 ? -1 : 1;
        const dy = pest.y < 0.5 ? -1 : 1;
        pest.vx += dx * 0.12 * step;
        pest.vy += dy * 0.12 * step;
      }

      for (const node of nodes) {
        if (!node.armed || node.battery < 0.08) continue;
        const d = dist(pest.x, pest.y, node.x, node.y);
        if (d > LISTEN_RADIUS) continue;
        const since = simTime - (pest.lastDetect[node.id] ?? -99);
        if (since < 5.5) continue;
        const pDetect = (1 - d / LISTEN_RADIUS) * spec.loudness * spec.activity(hour) * 0.55 * step;
        if (rand() > pDetect) continue;
        pest.lastDetect[node.id] = simTime;
        node.detections += 1;
        node.lastEventAt = simTime;
        detectionsToday += 1;
        hourly[Math.floor(hour)] += 1;
        const profileId = resolveProfile(node, pest.kind);
        const conf = clamp(0.72 + (1 - d / LISTEN_RADIUS) * 0.24 + rand() * 0.05, 0.7, 0.99);
        events.unshift({
          id: nid("evt"),
          at: Date.now(),
          hour,
          nodeId: node.id,
          kind: pest.kind,
          confidence: conf,
          action: "classified",
          khz: PROFILES[profileId].carrierKhz,
        });
        if (simTime >= node.coolingUntil) {
          node.pulseUntil = simTime + 1.25;
          node.pulseProfile = profileId;
          node.coolingUntil = simTime + 3.2;
          pulsesToday += 1;
          newPulses.push({
            id: nid("pulse"),
            nodeId: node.id,
            x: node.x,
            y: node.y,
            born: simTime,
            life: 1.35,
            color: spec.colorToken,
          });
          events.unshift({
            id: nid("evt"),
            at: Date.now(),
            hour,
            nodeId: node.id,
            kind: pest.kind,
            confidence: conf,
            action: "pulsed",
            khz: PROFILES[profileId].carrierKhz,
          });
          if (!state.muted && state.audioReady) playPulse(profileId, node.x);
        }
      }

      for (const node of nodes) {
        if (simTime >= node.pulseUntil || !node.pulseUntil) continue;
        const d = dist(pest.x, pest.y, node.x, node.y);
        if (d > PULSE_RADIUS || d < 0.001) continue;
        const nx = (pest.x - node.x) / d;
        const ny = (pest.y - node.y) / d;
        pest.vx += nx * 0.55 * step;
        pest.vy += ny * 0.55 * step;
        pest.stress += 0.85 * step * (1 - d / PULSE_RADIUS);
        if (pest.stress > 0.85) pest.fleeing = true;
      }

      const speedLimit = spec.speed * (pest.fleeing ? 2.4 : 1.15);
      const mag = Math.hypot(pest.vx, pest.vy) || 1;
      if (mag > speedLimit) {
        pest.vx = (pest.vx / mag) * speedLimit;
        pest.vy = (pest.vy / mag) * speedLimit;
      }
      pest.x += pest.vx * step * 3.4;
      pest.y += pest.vy * step * 3.4;
      pest.vx += (rand() - 0.5) * 0.01;
      pest.vy += (rand() - 0.5) * 0.01;
    }

    pests = pests.filter((p) => p.x > -0.08 && p.x < 1.08 && p.y > -0.08 && p.y < 1.08);

    const kinds = Object.keys(PESTS) as PestKind[];
    const cap = 16;
    if (pests.length < cap) {
      for (const kind of kinds) {
        const pressure = PESTS[kind].activity(hour);
        if (rand() < pressure * 0.035 * step * (0.4 + ambient)) {
          pests.push(spawnPest(kind));
        }
      }
    }

    const pulses = state.pulses
      .concat(newPulses)
      .filter((p) => simTime - p.born < p.life);

    if (events.length > 70) events.length = 70;

    set({
      hour,
      simTime,
      nodes,
      pests,
      pulses,
      events,
      hourly,
      detectionsToday,
      pulsesToday,
    });
  },

  setSpeed: (speed) => set({ speed }),
  setHour: (hour) => set({ hour: clamp(hour, 0, 23.99) }),
  setMuted: (muted) => set({ muted }),
  enableAudio: async () => {
    const ok = await unlockAudio();
    set({ audioReady: ok });
  },
  selectNode: (id) => set({ selectedNodeId: id }),
  setDropKind: (kind) => set({ dropKind: kind }),
  toggleArm: (id) =>
    set((s) => ({
      nodes: s.nodes.map((n) => (n.id === id ? { ...n, armed: !n.armed } : n)),
    })),
  setProfile: (id, profileId) =>
    set((s) => ({
      nodes: s.nodes.map((n) => (n.id === id ? { ...n, profileId } : n)),
    })),
  armAll: (armed) =>
    set((s) => ({
      nodes: s.nodes.map((n) => (n.battery < 0.08 ? n : { ...n, armed })),
    })),
  spawnAt: (kind, x, y) =>
    set((s) => ({ pests: s.pests.concat(spawnPest(kind, clamp(x, 0, 1), clamp(y, 0, 1))) })),
  pulseNode: (id, profileId) => {
    const state = get();
    const node = state.nodes.find((n) => n.id === id);
    if (!node || node.battery < 0.08) return;
    const profile = profileId ?? node.profileId;
    const use = profile === "adaptive" ? "bat-mimic" : profile;
    set({
      pulsesToday: state.pulsesToday + 1,
      nodes: state.nodes.map((n) =>
        n.id === id
          ? { ...n, pulseUntil: state.simTime + 1.25, pulseProfile: use, coolingUntil: state.simTime + 2.4 }
          : n,
      ),
      pulses: state.pulses.concat({
        id: nid("pulse"),
        nodeId: id,
        x: node.x,
        y: node.y,
        born: state.simTime,
        life: 1.35,
        color: "live",
      }),
    });
    if (!state.muted && state.audioReady) playPulse(use, node.x);
  },
  pulseArmed: () => {
    const state = get();
    const armed = state.nodes.filter((n) => n.armed && n.battery >= 0.08);
    if (armed.length === 0) return;
    set({
      pulsesToday: state.pulsesToday + armed.length,
      nodes: state.nodes.map((n) =>
        n.armed && n.battery >= 0.08
          ? {
              ...n,
              pulseUntil: state.simTime + 1.25,
              pulseProfile: n.profileId === "adaptive" ? "bat-mimic" : n.profileId,
              coolingUntil: state.simTime + 2.6,
            }
          : n,
      ),
      pulses: state.pulses.concat(
        armed.map((n) => ({
          id: nid("pulse"),
          nodeId: n.id,
          x: n.x,
          y: n.y,
          born: state.simTime,
          life: 1.35,
          color: "live",
        })),
      ),
    });
    if (!state.muted && state.audioReady) {
      armed.forEach((n, i) => {
        window.setTimeout(() => {
          const use = n.profileId === "adaptive" ? "bat-mimic" : n.profileId;
          playPulse(use, n.x);
        }, i * 70);
      });
    }
  },
}));

export function nodeStatus(n: NodeRecord, simTime: number) {
  if (n.battery < 0.08) return "offline" as const;
  if (simTime < n.pulseUntil) return "pulsing" as const;
  if (n.battery < 0.2) return "low" as const;
  if (!n.armed) return "standby" as const;
  return "listening" as const;
}

export function coverageOf(nodes: NodeRecord[]) {
  const live = nodes.filter((n) => n.armed && n.battery >= 0.08);
  if (live.length === 0) return 0;
  let hit = 0;
  const steps = 12;
  for (let i = 0; i < steps; i += 1) {
    for (let j = 0; j < steps; j += 1) {
      const x = (i + 0.5) / steps;
      const y = (j + 0.5) / steps;
      if (live.some((n) => dist(x, y, n.x, n.y) <= LISTEN_RADIUS)) hit += 1;
    }
  }
  return hit / (steps * steps);
}

export { PLOT };
