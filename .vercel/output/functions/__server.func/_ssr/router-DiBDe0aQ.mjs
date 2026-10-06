import { i as __toESM } from "../_runtime.mjs";
import { a as PESTS, c as PULSE_RADIUS, i as NODE_SEEDS, r as LISTEN_RADIUS, s as PROFILES } from "./catalog-DIP_0OUH.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TriangleAlert, c as Play, d as Cpu, i as Volume2, l as Pause, n as Waves, p as Activity, r as VolumeX, s as Radio, u as Map$1 } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DiBDe0aQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "currentColor",
				opacity: "0.08"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 24.5V11.2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "9.4",
				r: "2.4",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11.2 8.2c2.2-2.4 7.4-2.4 9.6 0",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.6 6.2c3.6-3.8 11.2-3.8 14.8 0",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6.2 4.2c4.8-4.8 14.8-4.8 19.6 0",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.3",
				strokeLinecap: "round",
				opacity: "0.4"
			})
		]
	});
}
var ctx = null;
var master = null;
function audioContextClass() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.AudioContext ?? w.webkitAudioContext ?? null;
}
async function unlockAudio() {
	const AC = audioContextClass();
	if (!AC) return false;
	if (!ctx) {
		ctx = new AC();
		master = ctx.createGain();
		master.gain.value = .22;
		master.connect(ctx.destination);
	}
	if (ctx.state === "suspended") await ctx.resume();
	return ctx.state === "running";
}
function playPulse(profileId, panValue) {
	if (!ctx || !master || ctx.state !== "running") return;
	const profile = PROFILES[profileId] === void 0 ? PROFILES["bat-mimic"] : PROFILES[profileId];
	const now = ctx.currentTime;
	const pan = ctx.createStereoPanner();
	pan.pan.value = Math.max(-.85, Math.min(.85, panValue * 2 - 1));
	pan.connect(master);
	if (profile.pattern === "whistle") {
		const osc = ctx.createOscillator();
		const g = ctx.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(profile.audibleHz * 1.4, now);
		osc.frequency.exponentialRampToValueAtTime(profile.audibleHz * .55, now + .7);
		g.gain.setValueAtTime(1e-4, now);
		g.gain.exponentialRampToValueAtTime(.18, now + .04);
		g.gain.exponentialRampToValueAtTime(1e-4, now + .85);
		osc.connect(g);
		g.connect(pan);
		osc.start(now);
		osc.stop(now + .9);
		return;
	}
	if (profile.pattern === "clack") {
		for (let i = 0; i < 6; i += 1) {
			const t = now + i * .09;
			const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * .04), ctx.sampleRate);
			const data = buffer.getChannelData(0);
			for (let s = 0; s < data.length; s += 1) data[s] = (Math.random() * 2 - 1) * Math.exp(-s / (data.length * .18));
			const src = ctx.createBufferSource();
			src.buffer = buffer;
			const bp = ctx.createBiquadFilter();
			bp.type = "bandpass";
			bp.frequency.value = profile.audibleHz;
			bp.Q.value = 1.2;
			const g = ctx.createGain();
			g.gain.value = .5;
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
		osc.frequency.setValueAtTime(profile.audibleHz * .7, now);
		osc.frequency.linearRampToValueAtTime(profile.audibleHz * 1.6, now + .9);
		g.gain.setValueAtTime(1e-4, now);
		g.gain.exponentialRampToValueAtTime(.12, now + .05);
		g.gain.exponentialRampToValueAtTime(1e-4, now + 1);
		osc.connect(g);
		g.connect(pan);
		osc.start(now);
		osc.stop(now + 1.05);
		return;
	}
	const pulses = 8;
	for (let i = 0; i < pulses; i += 1) {
		const t = now + i * .1;
		const osc = ctx.createOscillator();
		const g = ctx.createGain();
		osc.type = "square";
		osc.frequency.value = profile.audibleHz;
		g.gain.setValueAtTime(1e-4, t);
		g.gain.exponentialRampToValueAtTime(.09, t + .004);
		g.gain.exponentialRampToValueAtTime(1e-4, t + .032);
		osc.connect(g);
		g.connect(pan);
		osc.start(t);
		osc.stop(t + .04);
	}
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a += 1831565813;
		let t = a;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function dist(ax, ay, bx, by) {
	const dx = ax - bx;
	const dy = ay - by;
	return Math.hypot(dx, dy);
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function formatHour(hour) {
	const h = (hour % 24 + 24) % 24;
	const hh = Math.floor(h);
	const mm = Math.floor((h - hh) * 60);
	const period = hh >= 12 ? "PM" : "AM";
	return `${hh % 12 === 0 ? 12 : hh % 12}:${mm.toString().padStart(2, "0")} ${period}`;
}
function nid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
var rand = mulberry32(44037);
function seedNodes() {
	return NODE_SEEDS.map((n) => ({
		...n,
		solarW: n.battery > .2 ? 3.2 + rand() * 4 : .4,
		detections: Math.floor(rand() * 14),
		lastEventAt: null,
		coolingUntil: 0,
		pulseUntil: 0,
		pulseProfile: null
	}));
}
function spawnPest(kind, x, y) {
	const edge = Math.floor(rand() * 4);
	let px = x;
	let py = y;
	if (px === void 0 || py === void 0) {
		if (edge === 0) {
			px = rand();
			py = -.02;
		} else if (edge === 1) {
			px = 1.02;
			py = rand();
		} else if (edge === 2) {
			px = rand();
			py = 1.02;
		} else {
			px = -.02;
			py = rand();
		}
	}
	const towardX = .35 + rand() * .3 - px;
	const towardY = .35 + rand() * .3 - py;
	const mag = Math.hypot(towardX, towardY) || 1;
	const speed = PESTS[kind].speed * (.7 + rand() * .6);
	return {
		id: nid("pest"),
		kind,
		x: px,
		y: py,
		vx: towardX / mag * speed,
		vy: towardY / mag * speed,
		stress: 0,
		fleeing: false,
		lastDetect: {}
	};
}
function resolveProfile(node, kind) {
	if (node.profileId === "adaptive") return PESTS[kind].profileId;
	return node.profileId;
}
function nightFactor(hour) {
	if (hour >= 20 || hour < 5) return .92;
	if (hour >= 18 || hour < 6.5) return .55;
	return .12;
}
var useSim = create((set, get) => ({
	hour: 19.35,
	speed: 1,
	muted: false,
	audioReady: false,
	selectedNodeId: "acs-05",
	dropKind: "moth",
	nodes: seedNodes(),
	pests: [
		spawnPest("moth", .28, .24),
		spawnPest("moth", .62, .18),
		spawnPest("parakeet", .72, .32),
		spawnPest("rodent", .22, .7),
		spawnPest("hopper", .58, .62)
	],
	pulses: [],
	events: [],
	hourly: Array.from({ length: 24 }, (_, i) => i >= 18 || i < 5 ? 4 + Math.floor(rand() * 8) : 1 + Math.floor(rand() * 3)),
	detectionsToday: 37,
	pulsesToday: 29,
	simTime: 0,
	tick: (dt) => {
		const state = get();
		if (state.speed === 0) return;
		const step = Math.min(dt, .05) * state.speed;
		const hour = (state.hour + step * (24 / 900)) % 24;
		const simTime = state.simTime + step;
		const sunUp = hour >= 6.2 && hour <= 17.8;
		const ambient = nightFactor(hour);
		const nodes = state.nodes.map((n) => {
			let battery = n.battery;
			let solarW = n.solarW;
			if (sunUp) {
				solarW = 2.4 + (.5 - Math.abs(hour - 12) / 12) * 7.2 * (.85 + rand() * .2);
				battery = clamp(battery + step * .0045 * (solarW / 8), 0, 1);
			} else {
				solarW = .05 + rand() * .08;
				battery = clamp(battery - step * (n.armed ? .0018 : 4e-4), 0, 1);
			}
			const pulsing = simTime < n.pulseUntil;
			return {
				...n,
				battery,
				solarW,
				pulseUntil: pulsing ? n.pulseUntil : 0,
				pulseProfile: pulsing ? n.pulseProfile : null
			};
		});
		let detectionsToday = state.detectionsToday;
		let pulsesToday = state.pulsesToday;
		const hourly = state.hourly.slice();
		const events = state.events.slice();
		const newPulses = [];
		let pests = state.pests.map((p) => ({
			...p,
			lastDetect: { ...p.lastDetect }
		}));
		for (const pest of pests) {
			const spec = PESTS[pest.kind];
			if (pest.fleeing) {
				const dx = pest.x < .5 ? -1 : 1;
				const dy = pest.y < .5 ? -1 : 1;
				pest.vx += dx * .12 * step;
				pest.vy += dy * .12 * step;
			}
			for (const node of nodes) {
				if (!node.armed || node.battery < .08) continue;
				const d = dist(pest.x, pest.y, node.x, node.y);
				if (d > .22) continue;
				if (simTime - (pest.lastDetect[node.id] ?? -99) < 5.5) continue;
				const pDetect = (1 - d / LISTEN_RADIUS) * spec.loudness * spec.activity(hour) * .55 * step;
				if (rand() > pDetect) continue;
				pest.lastDetect[node.id] = simTime;
				node.detections += 1;
				node.lastEventAt = simTime;
				detectionsToday += 1;
				hourly[Math.floor(hour)] += 1;
				const profileId = resolveProfile(node, pest.kind);
				const conf = clamp(.72 + (1 - d / LISTEN_RADIUS) * .24 + rand() * .05, .7, .99);
				events.unshift({
					id: nid("evt"),
					at: Date.now(),
					hour,
					nodeId: node.id,
					kind: pest.kind,
					confidence: conf,
					action: "classified",
					khz: PROFILES[profileId].carrierKhz
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
						color: spec.colorToken
					});
					events.unshift({
						id: nid("evt"),
						at: Date.now(),
						hour,
						nodeId: node.id,
						kind: pest.kind,
						confidence: conf,
						action: "pulsed",
						khz: PROFILES[profileId].carrierKhz
					});
					if (!state.muted && state.audioReady) playPulse(profileId, node.x);
				}
			}
			for (const node of nodes) {
				if (simTime >= node.pulseUntil || !node.pulseUntil) continue;
				const d = dist(pest.x, pest.y, node.x, node.y);
				if (d > .3 || d < .001) continue;
				const nx = (pest.x - node.x) / d;
				const ny = (pest.y - node.y) / d;
				pest.vx += nx * .55 * step;
				pest.vy += ny * .55 * step;
				pest.stress += .85 * step * (1 - d / PULSE_RADIUS);
				if (pest.stress > .85) pest.fleeing = true;
			}
			const speedLimit = spec.speed * (pest.fleeing ? 2.4 : 1.15);
			const mag = Math.hypot(pest.vx, pest.vy) || 1;
			if (mag > speedLimit) {
				pest.vx = pest.vx / mag * speedLimit;
				pest.vy = pest.vy / mag * speedLimit;
			}
			pest.x += pest.vx * step * 3.4;
			pest.y += pest.vy * step * 3.4;
			pest.vx += (rand() - .5) * .01;
			pest.vy += (rand() - .5) * .01;
		}
		pests = pests.filter((p) => p.x > -.08 && p.x < 1.08 && p.y > -.08 && p.y < 1.08);
		const kinds = Object.keys(PESTS);
		if (pests.length < 16) for (const kind of kinds) {
			const pressure = PESTS[kind].activity(hour);
			if (rand() < pressure * .035 * step * (.4 + ambient)) pests.push(spawnPest(kind));
		}
		const pulses = state.pulses.concat(newPulses).filter((p) => simTime - p.born < p.life);
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
			pulsesToday
		});
	},
	setSpeed: (speed) => set({ speed }),
	setHour: (hour) => set({ hour: clamp(hour, 0, 23.99) }),
	setMuted: (muted) => set({ muted }),
	enableAudio: async () => {
		set({ audioReady: await unlockAudio() });
	},
	selectNode: (id) => set({ selectedNodeId: id }),
	setDropKind: (kind) => set({ dropKind: kind }),
	toggleArm: (id) => set((s) => ({ nodes: s.nodes.map((n) => n.id === id ? {
		...n,
		armed: !n.armed
	} : n) })),
	setProfile: (id, profileId) => set((s) => ({ nodes: s.nodes.map((n) => n.id === id ? {
		...n,
		profileId
	} : n) })),
	armAll: (armed) => set((s) => ({ nodes: s.nodes.map((n) => n.battery < .08 ? n : {
		...n,
		armed
	}) })),
	spawnAt: (kind, x, y) => set((s) => ({ pests: s.pests.concat(spawnPest(kind, clamp(x, 0, 1), clamp(y, 0, 1))) })),
	pulseNode: (id, profileId) => {
		const state = get();
		const node = state.nodes.find((n) => n.id === id);
		if (!node || node.battery < .08) return;
		const profile = profileId ?? node.profileId;
		const use = profile === "adaptive" ? "bat-mimic" : profile;
		set({
			pulsesToday: state.pulsesToday + 1,
			nodes: state.nodes.map((n) => n.id === id ? {
				...n,
				pulseUntil: state.simTime + 1.25,
				pulseProfile: use,
				coolingUntil: state.simTime + 2.4
			} : n),
			pulses: state.pulses.concat({
				id: nid("pulse"),
				nodeId: id,
				x: node.x,
				y: node.y,
				born: state.simTime,
				life: 1.35,
				color: "live"
			})
		});
		if (!state.muted && state.audioReady) playPulse(use, node.x);
	},
	pulseArmed: () => {
		const state = get();
		const armed = state.nodes.filter((n) => n.armed && n.battery >= .08);
		if (armed.length === 0) return;
		set({
			pulsesToday: state.pulsesToday + armed.length,
			nodes: state.nodes.map((n) => n.armed && n.battery >= .08 ? {
				...n,
				pulseUntil: state.simTime + 1.25,
				pulseProfile: n.profileId === "adaptive" ? "bat-mimic" : n.profileId,
				coolingUntil: state.simTime + 2.6
			} : n),
			pulses: state.pulses.concat(armed.map((n) => ({
				id: nid("pulse"),
				nodeId: n.id,
				x: n.x,
				y: n.y,
				born: state.simTime,
				life: 1.35,
				color: "live"
			})))
		});
		if (!state.muted && state.audioReady) armed.forEach((n, i) => {
			window.setTimeout(() => {
				playPulse(n.profileId === "adaptive" ? "bat-mimic" : n.profileId, n.x);
			}, i * 70);
		});
	}
}));
function nodeStatus(n, simTime) {
	if (n.battery < .08) return "offline";
	if (simTime < n.pulseUntil) return "pulsing";
	if (n.battery < .2) return "low";
	if (!n.armed) return "standby";
	return "listening";
}
function coverageOf(nodes) {
	const live = nodes.filter((n) => n.armed && n.battery >= .08);
	if (live.length === 0) return 0;
	let hit = 0;
	const steps = 12;
	for (let i = 0; i < steps; i += 1) for (let j = 0; j < steps; j += 1) {
		const x = (i + .5) / steps;
		const y = (j + .5) / steps;
		if (live.some((n) => dist(x, y, n.x, n.y) <= .22)) hit += 1;
	}
	return hit / 144;
}
function SimTicker() {
	const tick = useSim((s) => s.tick);
	(0, import_react.useEffect)(() => {
		let frame = 0;
		let last = performance.now();
		const loop = (t) => {
			const dt = Math.min(.05, (t - last) / 1e3);
			last = t;
			tick(dt);
			frame = requestAnimationFrame(loop);
		};
		frame = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(frame);
	}, [tick]);
	return null;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium outline-none select-none disabled:pointer-events-none disabled:opacity-40 transition-[color,background-color,box-shadow,opacity,transform] duration-150 ease-out active:not-disabled:scale-[0.96] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent)_45%,transparent)]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			outline: "bg-transparent text-fg shadow-[0_0_0_1px_var(--color-line)] hover:bg-raised",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-raised",
			danger: "bg-danger/15 text-danger hover:bg-danger/25"
		},
		size: {
			default: "h-10 px-3.5",
			sm: "h-8 px-2.5 text-xs rounded-lg",
			lg: "h-11 px-4",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var NAV = [
	{
		to: "/",
		label: "Field",
		icon: Map$1
	},
	{
		to: "/acoustics",
		label: "Acoustics",
		icon: Waves
	},
	{
		to: "/fleet",
		label: "Fleet",
		icon: Radio
	},
	{
		to: "/hardware",
		label: "Hardware",
		icon: Cpu
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const hour = useSim((s) => s.hour);
	const speed = useSim((s) => s.speed);
	const setSpeed = useSim((s) => s.setSpeed);
	const muted = useSim((s) => s.muted);
	const setMuted = useSim((s) => s.setMuted);
	const audioReady = useSim((s) => s.audioReady);
	const enableAudio = useSim((s) => s.enableAudio);
	const listening = useSim((s) => s.nodes).filter((n) => n.armed && n.battery >= .08).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimTicker, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-bg/90 px-3 py-2.5 backdrop-blur-sm md:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex min-w-0 items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-mono text-[10px] tracking-[0.22em] text-muted uppercase",
								children: "Acoustic"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display block text-base leading-none text-fg",
								children: "Crop Shield"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "ml-4 hidden items-center gap-1 md:flex",
						children: NAV.map((item) => {
							const active = pathname === item.to;
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("inline-flex h-10 items-center gap-2 rounded-[10px] px-3 text-sm transition-[color,background-color] duration-150", active ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: 1.75
								}), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1.5 sm:gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden items-center gap-1.5 font-mono text-[11px] text-muted tabular-nums sm:flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-3.5 text-live" }),
									listening,
									"/8",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-1 text-line",
										children: "|"
									}),
									formatHour(hour)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": speed === 0 ? "Resume field" : "Pause field",
								onClick: () => setSpeed(speed === 0 ? 1 : 0),
								children: speed === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "hidden sm:inline-flex",
								onClick: () => setSpeed(speed === 8 ? 1 : 8),
								children: speed === 8 ? "1×" : "8×"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: audioReady && !muted ? "default" : "outline",
								size: "sm",
								onClick: () => {
									if (!audioReady) enableAudio();
									else setMuted(!muted);
								},
								children: [audioReady && !muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: !audioReady ? "Hear pulses" : muted ? "Muted" : "Live"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex min-h-0 flex-1 flex-col pb-[4.25rem] md:pb-0",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-bg/95 md:hidden",
				children: NAV.map((item) => {
					const active = pathname === item.to;
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]", active ? "text-fg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4",
							strokeWidth: 1.75
						}), item.label]
					}, item.to);
				})
			})
		]
	});
}
var styles_default = "/assets/styles-DCBkUfPX.css";
var APP_NAME = "Acoustic Crop Shield";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Listening field for pest detection and species-matched acoustic deterrence. Solar nodes, edge classify, LoRa events."
			},
			{
				name: "theme-color",
				content: "#0d110f"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@400;500;600&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$3 = () => import("./routes-CmdQpFYm.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./acoustics-DvdEorrJ.mjs");
var Route$2 = createFileRoute("/acoustics")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./fleet-BW8ejbLF.mjs");
var Route$1 = createFileRoute("/fleet")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./hardware-DP80VgI8.mjs");
var Route = createFileRoute("/hardware")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	AcousticsRoute: Route$2.update({
		id: "/acoustics",
		path: "/acoustics",
		getParentRoute: () => Route$4
	}),
	FleetRoute: Route$1.update({
		id: "/fleet",
		path: "/fleet",
		getParentRoute: () => Route$4
	}),
	HardwareRoute: Route.update({
		id: "/hardware",
		path: "/hardware",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useSim as a, formatHour as c, nodeStatus as i, Button as n, cn as o, coverageOf as r, dist as s, router_exports as t };
