import { s as PROFILES } from "./catalog-DIP_0OUH.mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useSim, i as nodeStatus, n as Button, o as cn } from "./router-DiBDe0aQ.mjs";
import { n as StatusDot, t as Badge } from "./badge-C-JXc6Zi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fleet-BW8ejbLF.js
var import_jsx_runtime = require_jsx_runtime();
var TONE = {
	listening: "live",
	pulsing: "live",
	standby: "mute",
	low: "warn",
	offline: "danger"
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-5 p-3 md:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.2em] text-muted uppercase",
					children: "Plot nodes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-3xl text-fg md:text-4xl",
					children: "Fleet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: "Eight solar stakes on LoRaWAN. ACS-07 is on the SW corner with a tired pack — disarm keeps it as a listen-only spare until the next sun."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => armAll(true),
					children: "Arm all"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => armAll(false),
					children: "Stand down"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: nodes.map((node) => {
				const status = nodeStatus(node, simTime);
				const selected = node.id === selectedNodeId;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: cn("flex flex-col rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] transition-[box-shadow] duration-150", selected && "shadow-[0_0_0_1px_var(--color-accent)]"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "text-left",
						onClick: () => {
							selectNode(node.id);
							navigate({ to: "/" });
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
									children: node.sector
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl text-fg",
									children: node.code
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: TONE[status],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { tone: TONE[status] }), status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 h-1.5 overflow-hidden rounded-full bg-raised",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-full rounded-full", node.battery < .2 ? "bg-warn" : "bg-live"),
									style: { width: `${Math.round(node.battery * 100)}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Battery"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "text-right font-mono text-fg tabular-nums",
										children: [Math.round(node.battery * 100), "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Solar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "text-right font-mono text-fg tabular-nums",
										children: [node.solarW.toFixed(1), " W"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "RSSI"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "text-right font-mono text-fg tabular-nums",
										children: [node.rssi, " dBm"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Heard"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-right font-mono text-fg tabular-nums",
										children: node.detections
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Library"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "truncate text-right text-fg",
										children: PROFILES[node.profileId].name
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: node.armed ? "outline" : "default",
							onClick: () => toggleArm(node.id),
							children: node.armed ? "Disarm" : "Arm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							disabled: node.battery < .08,
							onClick: () => pulseNode(node.id),
							children: "Pulse"
						})]
					})]
				}, node.id);
			})
		})]
	});
}
//#endregion
export { FleetPage as component };
