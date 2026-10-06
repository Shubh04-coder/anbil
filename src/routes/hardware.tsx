import { createFileRoute } from "@tanstack/react-router";
import { BOM, HARDWARE_STEPS, PLOT } from "@/lib/catalog";

export const Route = createFileRoute("/hardware")({ component: HardwarePage });

function HardwarePage() {
  const bomTotal = BOM.reduce((sum, row) => sum + row.cost, 0);

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col gap-8 p-3 md:p-5">
      <header className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
            Hardware / IoT
          </p>
          <h1 className="font-display mt-1 text-3xl text-fg md:text-5xl">The stake</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            A solar listening post, not a camera. Dual microphones classify pest sound on the
            ESP32-S3; a circular piezo array and one audible driver fire the matched recipe. Events
            leave on LoRaWAN. Raw audio does not.
          </p>
        </div>
        <figure className="overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--color-line)]">
          <img
            src="/images/node-studio.jpg"
            alt="Studio photograph of the charcoal Acoustic Crop Shield node with solar cap and ultrasonic ring."
            className="aspect-[4/3] h-auto w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
          />
        </figure>
      </header>

      <section className="overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--color-line)]">
        <img
          src="/images/node-field.jpg"
          alt="The node staked at the edge of a flooded rice paddy at dusk."
          className="aspect-video h-auto w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
        />
      </section>

      <section>
        <h2 className="font-display text-2xl text-fg">From ear to pulse</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {HARDWARE_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]"
            >
              <p className="font-mono text-[11px] text-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-lg font-medium text-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] md:p-5">
        <h2 className="font-display text-2xl text-fg">Signal path</h2>
        <p className="mt-1 text-sm text-muted">
          {PLOT.gateway} at the pump house. Nodes sleep the radio between 12-byte uplinks.
        </p>
        <div className="mt-5 overflow-x-auto">
          <svg
            viewBox="0 0 920 120"
            className="h-auto min-w-[640px] w-full text-fg"
            role="img"
            aria-label="Hardware signal path from dual microphones through the ESP32-S3 to transducers and LoRa."
          >
            {["MEMS mic", "Ultrasonic mic", "ESP32-S3", "Piezo array", "Audible driver", "SX1276"].map(
              (label, i) => {
                const x = 20 + i * 150;
                return (
                  <g key={label}>
                    {i < 5 && (
                      <path
                        d={`M ${x + 110} 52 H ${x + 150}`}
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.25"
                      />
                    )}
                    <rect
                      x={x}
                      y={22}
                      width="110"
                      height="60"
                      rx="12"
                      fill="#1c241e"
                      stroke="currentColor"
                      strokeOpacity="0.16"
                    />
                    <text
                      x={x + 55}
                      y={56}
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize="11"
                      fontFamily="Outfit, sans-serif"
                    >
                      {label}
                    </text>
                  </g>
                );
              },
            )}
          </svg>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl text-fg">Bill of materials</h2>
          <p className="font-mono text-sm text-muted tabular-nums">
            ~${bomTotal.toFixed(0)} per node
          </p>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--color-line)]">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-[11px] tracking-wide text-muted uppercase">
              <tr>
                <th className="px-4 py-2.5 font-medium">Part</th>
                <th className="px-4 py-2.5 font-medium">Role</th>
                <th className="px-4 py-2.5 font-medium text-right">Qty</th>
                <th className="px-4 py-2.5 font-medium text-right">USD</th>
              </tr>
            </thead>
            <tbody>
              {BOM.map((row) => (
                <tr key={row.item} className="border-t border-line">
                  <td className="px-4 py-2.5 text-fg">{row.item}</td>
                  <td className="px-4 py-2.5 text-muted">{row.role}</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums">{row.qty}</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums">
                    {row.cost.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Night reserve is sized for 14 hours of listen plus about forty 1.2 s pulses. A 10 W panel
          recovers the pack on a clear basin day. Mount one metre above canopy, south of rattling
          plastic, solar cap facing the sun path.
        </p>
      </section>
    </div>
  );
}
