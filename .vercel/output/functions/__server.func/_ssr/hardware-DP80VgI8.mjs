import { n as HARDWARE_STEPS, o as PLOT, t as BOM } from "./catalog-DIP_0OUH.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hardware-DP80VgI8.js
var import_jsx_runtime = require_jsx_runtime();
function HardwarePage() {
	const bomTotal = BOM.reduce((sum, row) => sum + row.cost, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-[1100px] flex-1 flex-col gap-8 p-3 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.2em] text-muted uppercase",
						children: "Hardware / IoT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-1 text-3xl text-fg md:text-5xl",
						children: "The stake"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm leading-relaxed text-muted",
						children: "A solar listening post, not a camera. Dual microphones classify pest sound on the ESP32-S3; a circular piezo array and one audible driver fire the matched recipe. Events leave on LoRaWAN. Raw audio does not."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
					className: "overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--color-line)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/node-studio.jpg",
						alt: "Studio photograph of the charcoal Acoustic Crop Shield node with solar cap and ultrasonic ring.",
						className: "aspect-[4/3] h-auto w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--color-line)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/node-field.jpg",
					alt: "The node staked at the edge of a flooded rice paddy at dusk.",
					className: "aspect-video h-auto w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-fg",
				children: "From ear to pulse"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 grid gap-3 md:grid-cols-2",
				children: HARDWARE_STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-muted tabular-nums",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 text-lg font-medium text-fg",
							children: step.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: step.body
						})
					]
				}, step.title))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] md:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: "Signal path"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [PLOT.gateway, " at the pump house. Nodes sleep the radio between 12-byte uplinks."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 920 120",
							className: "h-auto min-w-[640px] w-full text-fg",
							role: "img",
							"aria-label": "Hardware signal path from dual microphones through the ESP32-S3 to transducers and LoRa.",
							children: [
								"MEMS mic",
								"Ultrasonic mic",
								"ESP32-S3",
								"Piezo array",
								"Audible driver",
								"SX1276"
							].map((label, i) => {
								const x = 20 + i * 150;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
									i < 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: `M ${x + 110} 52 H ${x + 150}`,
										fill: "none",
										stroke: "currentColor",
										strokeOpacity: "0.25"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x,
										y: 22,
										width: "110",
										height: "60",
										rx: "12",
										fill: "#1c241e",
										stroke: "currentColor",
										strokeOpacity: "0.16"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: x + 55,
										y: 56,
										textAnchor: "middle",
										fill: "currentColor",
										fontSize: "11",
										fontFamily: "Outfit, sans-serif",
										children: label
									})
								] }, label);
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: "Bill of materials"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-sm text-muted tabular-nums",
						children: [
							"~$",
							bomTotal.toFixed(0),
							" per node"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--color-line)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface text-left text-[11px] tracking-wide text-muted uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 font-medium",
									children: "Part"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 font-medium",
									children: "Role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 font-medium text-right",
									children: "Qty"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 font-medium text-right",
									children: "USD"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: BOM.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 text-fg",
									children: row.item
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 text-muted",
									children: row.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 text-right font-mono tabular-nums",
									children: row.qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 text-right font-mono tabular-nums",
									children: row.cost.toFixed(2)
								})
							]
						}, row.item)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
					children: "Night reserve is sized for 14 hours of listen plus about forty 1.2 s pulses. A 10 W panel recovers the pack on a clear basin day. Mount one metre above canopy, south of rattling plastic, solar cap facing the sun path."
				})
			] })
		]
	});
}
//#endregion
export { HardwarePage as component };
