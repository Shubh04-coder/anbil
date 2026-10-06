import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { o as cn } from "./router-DiBDe0aQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-C-JXc6Zi.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { tone: {
		mute: "bg-raised text-muted",
		live: "bg-live/15 text-live",
		warn: "bg-warn/15 text-warn",
		danger: "bg-danger/15 text-danger",
		fg: "bg-fg/10 text-fg"
	} },
	defaultVariants: { tone: "mute" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({
			tone,
			className
		})),
		...props
	});
}
function StatusDot({ tone }) {
	const color = {
		live: "bg-live",
		warn: "bg-warn",
		danger: "bg-danger",
		mute: "bg-subtle"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("size-1.5 rounded-full", color),
		"aria-hidden": true
	});
}
//#endregion
export { StatusDot as n, Badge as t };
