import { s as PROFILES } from "./catalog-DIP_0OUH.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useSim, c as formatHour, n as Button } from "./router-DiBDe0aQ.mjs";
import { t as Spectrogram } from "./spectrogram-C0R1ypEF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/acoustics-DvdEorrJ.js
var import_jsx_runtime = require_jsx_runtime();
function AcousticsPage() {
	const hourly = useSim((s) => s.hourly);
	const hour = useSim((s) => s.hour);
	const setHour = useSim((s) => s.setHour);
	const selectedNodeId = useSim((s) => s.selectedNodeId);
	const pulseNode = useSim((s) => s.pulseNode);
	const enableAudio = useSim((s) => s.enableAudio);
	const audioReady = useSim((s) => s.audioReady);
	const maxHourly = Math.max(1, ...hourly);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-5 p-3 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.2em] text-muted uppercase",
						children: "Library"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-1 text-3xl text-fg md:text-4xl",
						children: "Frequency lab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: "Each pest family has a matched acoustic recipe. Ultrasonic carriers are heard here as audible analogs so you can judge the pulse from the console."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative h-56 overflow-hidden rounded-xl bg-field shadow-[0_0_0_1px_var(--color-line)] md:h-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spectrogram, { className: "absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none absolute top-3 left-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
						children: "Live listen"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg",
						children: "Selected node waterfall · 0–80 kHz"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
				children: Object.values(PROFILES).filter((p) => p.id !== "adaptive").map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
							children: profile.band
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-1 text-xl text-fg",
							children: profile.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-live",
							children: profile.target
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 flex-1 text-sm leading-relaxed text-muted",
							children: profile.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 h-10 overflow-hidden rounded-[10px] bg-field",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpectrumMini, { bins: profile.bins })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3",
							size: "sm",
							variant: "outline",
							onClick: () => {
								if (!audioReady) enableAudio();
								pulseNode(selectedNodeId ?? "acs-05", profile.id);
							},
							children: "Test pulse"
						})
					]
				}, profile.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-fg",
							children: "Detections by hour"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Moths and rats after dusk. Parakeets at the canal in the first and last light."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 text-sm text-muted",
							children: [
								"Clock",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 0,
									max: 23.9,
									step: .1,
									value: hour,
									onChange: (e) => setHour(Number(e.target.value)),
									className: "h-10 w-40 accent-accent",
									"aria-label": "Set field clock"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-fg tabular-nums",
									children: formatHour(hour)
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex h-28 items-end gap-1",
						children: hourly.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex min-w-0 flex-1 flex-col items-center gap-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full rounded-sm bg-accent/80",
								style: { height: `${Math.max(6, v / maxHourly * 100)}%` },
								title: `${i}:00 · ${v}`
							})
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex justify-between font-mono text-[10px] text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "00" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "06" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "12" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "18" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "24" })
						]
					})
				]
			})
		]
	});
}
function SpectrumMini({ bins }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 80 40",
		className: "h-full w-full",
		"aria-hidden": true,
		children: Array.from({ length: 32 }, (_, i) => {
			const khz = i / 31 * 80;
			const near = bins.some((b) => Math.abs(b - khz) < 6);
			const h = near ? 28 : 6 + i % 5;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: i * 2.5 + 1,
				y: 36 - h,
				width: "1.6",
				height: h,
				rx: "0.6",
				fill: near ? "#c5d4b8" : "#2a332c"
			}, i);
		})
	});
}
//#endregion
export { AcousticsPage as component };
