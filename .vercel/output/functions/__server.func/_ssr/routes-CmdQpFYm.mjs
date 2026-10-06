import { i as __toESM } from "../_runtime.mjs";
import { a as PESTS, r as LISTEN_RADIUS, s as PROFILES } from "./catalog-DIP_0OUH.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Battery, o as Sun, t as Wifi } from "../_libs/lucide-react.mjs";
import { a as useSim, c as formatHour, i as nodeStatus, n as Button, o as cn, r as coverageOf } from "./router-DiBDe0aQ.mjs";
import { t as Spectrogram } from "./spectrogram-C0R1ypEF.mjs";
import { n as StatusDot, t as Badge } from "./badge-C-JXc6Zi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CmdQpFYm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventFeed() {
	const events = useSim((s) => s.events);
	const nodes = useSim((s) => s.nodes);
	const selectNode = useSim((s) => s.selectNode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-line)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium text-fg",
				children: "Event tape"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[11px] text-muted tabular-nums",
				children: events.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2 pb-3",
			children: events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "px-2 py-6 text-center text-sm text-muted",
				children: "Field is quiet. Listening."
			}) : events.map((evt) => {
				const node = nodes.find((n) => n.id === evt.nodeId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => selectNode(evt.nodeId),
					className: "flex w-full items-start gap-3 rounded-[12px] px-2 py-2 text-left transition-[background-color] duration-150 hover:bg-raised",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: evt.action === "pulsed" ? "mt-1.5 size-1.5 shrink-0 rounded-full bg-live" : evt.action === "cleared" ? "mt-1.5 size-1.5 shrink-0 rounded-full bg-muted" : "mt-1.5 size-1.5 shrink-0 rounded-full bg-warn" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm text-fg",
								children: PESTS[evt.kind].label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-subtle tabular-nums",
								children: formatHour(evt.hour)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block truncate text-xs text-muted",
							children: [
								node?.code,
								" · ",
								evt.action,
								" · ",
								Math.round(evt.confidence * 100),
								"% · ",
								evt.khz,
								" kHz"
							]
						})]
					})]
				}) }, evt.id);
			})
		})]
	});
}
var KIND_HEX = {
	moth: "#c4786a",
	hopper: "#7eaa78",
	rodent: "#c4a574",
	parakeet: "#eef2ea",
	locust: "#c5d4b8"
};
var PULSE_VIS = .32;
function css(name) {
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function FieldMap() {
	const canvasRef = (0, import_react.useRef)(null);
	const aerialRef = (0, import_react.useRef)(null);
	const nodes = useSim((s) => s.nodes);
	const hour = useSim((s) => s.hour);
	const dropKind = useSim((s) => s.dropKind);
	const selectNode = useSim((s) => s.selectNode);
	const spawnAt = useSim((s) => s.spawnAt);
	(0, import_react.useEffect)(() => {
		const img = new Image();
		img.src = "/images/field-aerial.jpg";
		img.onload = () => {
			aerialRef.current = img;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const parent = canvas.parentElement;
		if (!parent) return;
		const draw = () => {
			const { nodes: liveNodes, pests, pulses, selectedNodeId, hour: clock, simTime } = useSim.getState();
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = parent.clientWidth;
			const h = parent.clientHeight;
			if (w < 8 || h < 8) return;
			if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
				canvas.width = Math.floor(w * dpr);
				canvas.height = Math.floor(h * dpr);
				canvas.style.width = `${w}px`;
				canvas.style.height = `${h}px`;
			}
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const pad = 18;
			const fw = w - 36;
			const fh = h - 36;
			const toX = (x) => pad + x * fw;
			const toY = (y) => pad + y * fh;
			const bg = css("--color-field") || "#121810";
			const fg = css("--color-fg") || "#eef2ea";
			const live = css("--color-live") || "#7eaa78";
			const muted = css("--color-muted") || "#8b9588";
			const line = css("--color-line") || "#2a332c";
			ctx.fillStyle = bg;
			ctx.fillRect(0, 0, w, h);
			ctx.save();
			roundRect(ctx, 14, 14, fw + 8, fh + 8, 16);
			ctx.clip();
			const aerial = aerialRef.current;
			if (aerial && aerial.complete) {
				ctx.globalAlpha = .62;
				ctx.drawImage(aerial, 14, 14, fw + 8, fh + 8);
				ctx.globalAlpha = 1;
				ctx.fillStyle = "rgba(13,17,15,0.28)";
				ctx.fillRect(14, 14, fw + 8, fh + 8);
			}
			ctx.fillStyle = `rgba(8,12,10,${clock >= 19.5 || clock < 5.5 ? .38 : clock >= 18 || clock < 6.8 ? .2 : .04})`;
			ctx.fillRect(14, 14, fw + 8, fh + 8);
			ctx.strokeStyle = "rgba(197,212,184,0.09)";
			ctx.lineWidth = 1;
			const rows = 18;
			for (let i = 0; i <= rows; i += 1) {
				const y = pad + i / rows * fh;
				ctx.beginPath();
				ctx.moveTo(pad, y);
				ctx.lineTo(pad + fw, y);
				ctx.stroke();
			}
			ctx.strokeStyle = "rgba(197,212,184,0.05)";
			for (let i = 0; i <= 10; i += 1) {
				const x = pad + i / 10 * fw;
				ctx.beginPath();
				ctx.moveTo(x, pad);
				ctx.lineTo(x, pad + fh);
				ctx.stroke();
			}
			for (const node of liveNodes) {
				if (!node.armed || node.battery < .08) continue;
				const x = toX(node.x);
				const y = toY(node.y);
				ctx.beginPath();
				ctx.ellipse(x, y, LISTEN_RADIUS * fw, LISTEN_RADIUS * fh, 0, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(126,170,120,0.06)";
				ctx.fill();
				ctx.strokeStyle = "rgba(126,170,120,0.22)";
				ctx.setLineDash([4, 6]);
				ctx.lineWidth = 1;
				ctx.stroke();
				ctx.setLineDash([]);
			}
			for (const pulse of pulses) {
				const age = (simTime - pulse.born) / pulse.life;
				const x = toX(pulse.x);
				const y = toY(pulse.y);
				ctx.beginPath();
				ctx.ellipse(x, y, age * PULSE_VIS * fw, age * PULSE_VIS * fh, 0, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(197,212,184,${.55 * (1 - age)})`;
				ctx.lineWidth = 2;
				ctx.stroke();
			}
			for (const pest of pests) {
				const x = toX(pest.x);
				const y = toY(pest.y);
				ctx.fillStyle = KIND_HEX[pest.kind];
				ctx.globalAlpha = pest.fleeing ? .45 : .95;
				ctx.beginPath();
				if (pest.kind === "parakeet") {
					ctx.moveTo(x, y - 6);
					ctx.lineTo(x + 6, y + 4);
					ctx.lineTo(x - 6, y + 4);
					ctx.closePath();
				} else if (pest.kind === "moth") ctx.ellipse(x, y, 6.5, 3, pest.vx, 0, Math.PI * 2);
				else if (pest.kind === "rodent") roundRect(ctx, x - 5, y - 3.5, 10, 7, 2);
				else if (pest.kind === "locust") {
					ctx.moveTo(x, y - 6);
					ctx.lineTo(x + 5, y);
					ctx.lineTo(x, y + 6);
					ctx.lineTo(x - 5, y);
					ctx.closePath();
				} else ctx.ellipse(x, y, 4, 5.5, 0, 0, Math.PI * 2);
				ctx.fill();
				ctx.globalAlpha = 1;
			}
			ctx.restore();
			for (const node of liveNodes) {
				const x = toX(node.x);
				const y = toY(node.y);
				const status = nodeStatus(node, simTime);
				const fill = status === "offline" ? "#5e675c" : status === "low" ? "#c4a574" : status === "pulsing" ? live : status === "standby" ? muted : live;
				if (node.id === selectedNodeId) {
					ctx.beginPath();
					ctx.arc(x, y, 14, 0, Math.PI * 2);
					ctx.strokeStyle = fg;
					ctx.lineWidth = 1.4;
					ctx.stroke();
				}
				ctx.beginPath();
				ctx.arc(x, y, 6, 0, Math.PI * 2);
				ctx.fillStyle = fill;
				ctx.fill();
				ctx.strokeStyle = bg;
				ctx.lineWidth = 2;
				ctx.stroke();
				ctx.font = "500 10px Outfit, sans-serif";
				ctx.fillStyle = fg;
				ctx.textAlign = "center";
				ctx.fillText(node.code, x, y + 18);
			}
			ctx.strokeStyle = line;
			ctx.lineWidth = 1;
			roundRect(ctx, 14, 14, fw + 8, fh + 8, 16);
			ctx.stroke();
			ctx.font = "500 10px IBM Plex Mono, monospace";
			ctx.fillStyle = muted;
			ctx.textAlign = "left";
			ctx.fillText("N", w - 28, 26);
			ctx.beginPath();
			ctx.moveTo(w - 24, 32);
			ctx.lineTo(w - 24, 46);
			ctx.lineTo(w - 27, 42);
			ctx.moveTo(w - 24, 46);
			ctx.lineTo(w - 21, 42);
			ctx.strokeStyle = muted;
			ctx.stroke();
			ctx.fillText("40 m", 26, h - 10);
			ctx.beginPath();
			ctx.moveTo(26, h - 16);
			ctx.lineTo(74, h - 16);
			ctx.stroke();
		};
		let raf = 0;
		const loop = () => {
			draw();
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		const ro = new ResizeObserver(() => draw());
		ro.observe(parent);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	}, []);
	function onPointer(e) {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const pad = 18;
		const fw = rect.width - 36;
		const fh = rect.height - 36;
		const x = (e.clientX - rect.left - pad) / fw;
		const y = (e.clientY - rect.top - pad) / fh;
		const hit = nodes.find((n) => Math.hypot(n.x - x, n.y - y) < .045);
		if (hit) {
			selectNode(hit.id);
			return;
		}
		if (x >= 0 && x <= 1 && y >= 0 && y <= 1) spawnAt(dropKind, x, y);
	}
	const cover = Math.round(coverageOf(nodes) * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-field shadow-[0_0_0_1px_var(--color-line)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "h-full min-h-[360px] w-full cursor-crosshair touch-none lg:min-h-[440px]",
				onPointerDown: onPointer,
				"aria-label": "Listening field map. Click a node to inspect, or click the paddy to introduce pest pressure."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[14px] bg-bg/80 px-3 py-2 shadow-[0_0_0_1px_var(--color-line)] backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.18em] text-muted uppercase",
							children: "Listening field"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-tight text-fg",
							children: "Kolar Bend"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Block C · 4.6 ha flooded rice"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[14px] bg-bg/80 px-3 py-2 text-right shadow-[0_0_0_1px_var(--color-line)] backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tabular-nums text-fg",
						children: formatHour(hour)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [cover, "% covered"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-3 bottom-3 hidden flex-wrap gap-2 sm:flex",
				children: Object.keys(PESTS).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full bg-bg/80 px-2 py-1 text-[11px] text-muted shadow-[0_0_0_1px_var(--color-line)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: k === "moth" ? "size-1.5 rounded-full bg-danger" : k === "hopper" ? "size-1.5 rounded-full bg-live" : k === "rodent" ? "size-1.5 rounded-full bg-warn" : k === "parakeet" ? "size-1.5 rounded-full bg-fg" : "size-1.5 rounded-full bg-accent" }), PESTS[k].label]
				}, k))
			})
		]
	});
}
function roundRect(ctx, x, y, w, h, r) {
	const radius = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.arcTo(x + w, y, x + w, y + h, radius);
	ctx.arcTo(x + w, y + h, x, y + h, radius);
	ctx.arcTo(x, y + h, x, y, radius);
	ctx.arcTo(x, y, x + w, y, radius);
	ctx.closePath();
}
function KpiStrip({ className }) {
	const detections = useSim((s) => s.detectionsToday);
	const pulses = useSim((s) => s.pulsesToday);
	const pests = useSim((s) => s.pests);
	const nodes = useSim((s) => s.nodes);
	const online = nodes.filter((n) => n.battery >= .08).length;
	const cover = Math.round(coverageOf(nodes) * 100);
	const pressure = pests.filter((p) => !p.fleeing).length;
	const items = [
		{
			k: "Detections",
			v: detections.toString(),
			d: "since 00:00"
		},
		{
			k: "Pulses fired",
			v: pulses.toString(),
			d: "matched library"
		},
		{
			k: "Active pressure",
			v: pressure.toString(),
			d: "signatures in plot"
		},
		{
			k: "Nodes",
			v: `${online}/8`,
			d: `${cover}% listen cover`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: className ?? "grid grid-cols-2 gap-2 lg:grid-cols-4",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl bg-surface px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-wide text-muted uppercase",
					children: item.k
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display mt-1 text-xl leading-none text-fg tabular-nums md:text-2xl",
					children: item.v
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-subtle",
					children: item.d
				})
			]
		}, item.k))
	});
}
var TONE = {
	listening: "live",
	pulsing: "live",
	standby: "mute",
	low: "warn",
	offline: "danger"
};
function NodeInspector() {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.18em] text-muted uppercase",
						children: node.sector
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl leading-tight text-fg",
						children: node.code
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: TONE[status],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { tone: TONE[status] }), status]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							icon: Battery,
							label: "Battery",
							value: `${Math.round(node.battery * 100)}%`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							icon: Sun,
							label: "Solar",
							value: `${node.solarW.toFixed(1)} W`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							icon: Wifi,
							label: "RSSI",
							value: `${node.rssi} dBm`
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: node.armed ? "outline" : "default",
						onClick: () => toggleArm(node.id),
						children: node.armed ? "Disarm" : "Arm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => pulseNode(node.id),
						disabled: node.battery < .08,
						children: "Pulse now"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-medium tracking-wide text-muted uppercase",
						children: "Library"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-1 h-10 w-full rounded-[10px] bg-raised px-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] outline-none",
						value: node.profileId,
						onChange: (e) => setProfile(node.id, e.target.value),
						children: Object.values(PROFILES).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p.id,
							children: p.name
						}, p.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-relaxed text-muted",
					children: PROFILES[node.profileId].summary
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium text-fg",
					children: "Introduce pressure"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Click the paddy, or drop a signature at the selected node."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1.5",
					children: Object.keys(PESTS).map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setDropKind(kind),
						className: cn("h-9 rounded-full px-3 text-xs transition-[background-color,color] duration-150", dropKind === kind ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
						children: PESTS[kind].label
					}, kind))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => pulseArmed(),
						children: "Pulse armed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => armAll(true),
						children: "Arm all"
					})]
				})
			]
		})]
	});
}
function Meter({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[12px] bg-raised px-2.5 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-1 text-[10px] tracking-wide text-muted uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" }), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 font-mono text-sm text-fg tabular-nums",
			children: value
		})]
	});
}
function FieldPage() {
	const selected = useSim((s) => s.selectedNodeId);
	const node = useSim((s) => s.nodes.find((n) => n.id === selected));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-3 p-3 md:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiStrip, { className: "hidden grid-cols-4 gap-2 xl:grid" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-0 flex-1 grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.6fr)_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-1 flex min-h-0 flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMap, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiStrip, { className: "grid grid-cols-2 gap-2 xl:hidden" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "relative h-36 overflow-hidden rounded-xl bg-field shadow-[0_0_0_1px_var(--color-line)] md:h-44",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spectrogram, { className: "absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none absolute top-2 left-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
								children: "Node spectrogram"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-fg",
								children: [node?.code ?? "ACS", " · 0–80 kHz"]
							})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-2 flex min-h-0 flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeInspector, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-[240px] flex-1 flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventFeed, {})
				})]
			})]
		})]
	});
}
//#endregion
export { FieldPage as component };
