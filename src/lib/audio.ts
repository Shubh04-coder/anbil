import { PROFILES, type ProfileId } from "@/lib/catalog";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function audioContextClass(): typeof AudioContext | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

export async function unlockAudio(): Promise<boolean> {
  const AC = audioContextClass();
  if (!AC) return false;
  if (!ctx) {
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.22;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") await ctx.resume();
  return ctx.state === "running";
}

export function isAudioRunning() {
  return ctx?.state === "running";
}

export function playPulse(profileId: ProfileId, panValue: number) {
  if (!ctx || !master || ctx.state !== "running") return;
  const profile = PROFILES[profileId] === undefined ? PROFILES["bat-mimic"] : PROFILES[profileId];
  const now = ctx.currentTime;
  const pan = ctx.createStereoPanner();
  pan.pan.value = Math.max(-0.85, Math.min(0.85, panValue * 2 - 1));
  pan.connect(master);

  if (profile.pattern === "whistle") {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(profile.audibleHz * 1.4, now);
    osc.frequency.exponentialRampToValueAtTime(profile.audibleHz * 0.55, now + 0.7);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
    osc.connect(g);
    g.connect(pan);
    osc.start(now);
    osc.stop(now + 0.9);
    return;
  }

  if (profile.pattern === "clack") {
    for (let i = 0; i < 6; i += 1) {
      const t = now + i * 0.09;
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.04), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let s = 0; s < data.length; s += 1) {
        data[s] = (Math.random() * 2 - 1) * Math.exp(-s / (data.length * 0.18));
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = profile.audibleHz;
      bp.Q.value = 1.2;
      const g = ctx.createGain();
      g.gain.value = 0.5;
      src.connect(bp);
      bp.connect(g);
      g.connect(pan);
      src.start(t);
    }
    return;
  }

  if (profile.pattern === "sweep") {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(profile.audibleHz * 0.7, now);
    osc.frequency.linearRampToValueAtTime(profile.audibleHz * 1.6, now + 0.9);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1);
    osc.connect(g);
    g.connect(pan);
    osc.start(now);
    osc.stop(now + 1.05);
    return;
  }

  const pulses = 8;
  for (let i = 0; i < pulses; i += 1) {
    const t = now + i * 0.1;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = profile.audibleHz;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.032);
    osc.connect(g);
    g.connect(pan);
    osc.start(t);
    osc.stop(t + 0.04);
  }
}
