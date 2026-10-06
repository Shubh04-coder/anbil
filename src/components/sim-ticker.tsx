import { useEffect } from "react";
import { useSim } from "@/lib/store";

export function SimTicker() {
  const tick = useSim((s) => s.tick);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      tick(dt);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [tick]);

  return null;
}
