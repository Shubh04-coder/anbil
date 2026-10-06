import { i as __toESM } from "../_runtime.mjs";
import { a as PESTS, r as LISTEN_RADIUS, s as PROFILES } from "./catalog-DIP_0OUH.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useSim, o as cn, s as dist } from "./router-DiBDe0aQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spectrogram-C0R1ypEF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BINS = 64;
var MAX_KHZ = 80;
function Spectrogram({ className }) {
	const canvasRef = (0, import_react.useRef)(null);
	const selectedNodeId = useSim((s) => s.selectedNodeId);
	const nodes = useSim((s) => s.nodes);
	const node = nodes.find((n) => n.id === selectedNodeId) ?? nodes[0];
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const parent = canvas.parentElement;
		if (!parent) return;
		let raf = 0;
		let primed = false;
		const draw = () => {
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = parent.clientWidth;
			const h = parent.clientHeight;
			if (w < 8 || h < 8) {
				raf = requestAnimationFrame(draw);
				return;
			}
			if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
				canvas.width = Math.floor(w * dpr);
				canvas.height = Math.floor(h * dpr);
				canvas.style.width = `${w}px`;
				canvas.style.height = `${h}px`;
			}
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				raf = requestAnimationFrame(draw);
				return;
			}
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			if (primed) ctx.drawImage(canvas, -Math.round(2 * dpr), 0);
			const col = new Array(BINS).fill(0);
			const state = useSim.getState();
			const night = state.hour >= 19 || state.hour < 6 ? .28 : .16;
			for (let i = 0; i < BINS; i += 1) col[i] = .14 + night * Math.random() * (.45 + i / BINS);
			const n = state.nodes.find((nd) => nd.id === state.selectedNodeId) ?? state.nodes[0];
			if (n) {
				for (const pest of state.pests) {
					const d = dist(pest.x, pest.y, n.x, n.y);
					if (d > .253) continue;
					const gain = (1 - d / (LISTEN_RADIUS * 1.15)) * PESTS[pest.kind].loudness;
					const profile = PROFILES[PESTS[pest.kind].profileId];
					for (const khz of profile.bins) {
						const bin = Math.round(khz / MAX_KHZ * 63);
						for (let k = -2; k <= 2; k += 1) {
							const b = bin + k;
							if (b < 0 || b >= BINS) continue;
							col[b] += gain * (1 - Math.abs(k) / 3) * (1.2 + Math.random() * .5);
						}
					}
				}
				if (state.simTime < n.pulseUntil && n.pulseProfile) {
					const profile = PROFILES[n.pulseProfile];
					for (const khz of profile.bins) {
						const bin = Math.round(khz / MAX_KHZ * 63);
						col[bin] = Math.max(col[bin], 1.4);
						if (bin + 1 < BINS) col[bin + 1] = Math.max(col[bin + 1], .9);
					}
				}
			}
			const colW = Math.max(2, Math.round(2 * dpr));
			const paintCol = (xPos) => {
				for (let i = 0; i < BINS; i += 1) {
					const v = Math.min(1.5, col[i] ?? 0) / 1.5;
					const y0 = canvas.height - (i + 1) / BINS * canvas.height;
					const bh = canvas.height / BINS + 1;
					const r = Math.floor(22 + v * 190);
					const g = Math.floor(34 + v * 200);
					const b = Math.floor(24 + v * 130);
					ctx.fillStyle = `rgb(${r},${g},${b})`;
					ctx.fillRect(xPos, y0, colW + 1, bh);
				}
			};
			if (!primed) {
				for (let xPos = 0; xPos < canvas.width; xPos += colW) paintCol(xPos);
				primed = true;
			} else paintCol(canvas.width - colW);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.fillStyle = "rgba(13,17,15,0.55)";
			ctx.fillRect(0, 0, 8, h);
			raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(raf);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "h-full w-full rounded-[14px]",
			"aria-label": `Live spectrogram for ${node?.code ?? "selected node"}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-y-2 left-2 flex flex-col justify-between font-mono text-[9px] text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "kHz" })
			]
		})]
	});
}
//#endregion
export { Spectrogram as t };
