//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DIP_0OUH.js
var PLOT = {
	name: "Kolar Bend",
	block: "Block C · 4.6 ha flooded rice",
	gateway: "GW-Narmada-02",
	region: "Narmada basin"
};
var LISTEN_RADIUS = .22;
var PULSE_RADIUS = .3;
var PESTS = {
	moth: {
		label: "Fall armyworm",
		latin: "Spodoptera frugiperda",
		loudness: .9,
		speed: .045,
		colorToken: "danger",
		profileId: "bat-mimic",
		signature: "Wingbeat 32–38 kHz, dusk swarm",
		activity: (h) => h >= 18 || h < 5 ? 1 : h >= 17 ? .4 : .05
	},
	hopper: {
		label: "Green leafhopper",
		latin: "Nephotettix virescens",
		loudness: .55,
		speed: .03,
		colorToken: "live",
		profileId: "hopper-jam",
		signature: "Substrate click 8–14 kHz",
		activity: (h) => h >= 6 && h < 11 || h >= 16 && h < 19 ? .85 : .15
	},
	rodent: {
		label: "Bandicoot rat",
		latin: "Bandicota bengalensis",
		loudness: .7,
		speed: .038,
		colorToken: "warn",
		profileId: "rodent-band",
		signature: "Chew + 22 kHz vocal",
		activity: (h) => h >= 20 || h < 5 ? 1 : .08
	},
	parakeet: {
		label: "Rose-ringed parakeet",
		latin: "Psittacula krameri",
		loudness: 1,
		speed: .07,
		colorToken: "fg",
		profileId: "avian-distress",
		signature: "Flock call 2–6 kHz",
		activity: (h) => h >= 6 && h < 10 || h >= 16 && h < 18.5 ? 1 : .05
	},
	locust: {
		label: "Desert locust",
		latin: "Schistocerca gregaria",
		loudness: .8,
		speed: .055,
		colorToken: "accent",
		profileId: "locust-clack",
		signature: "Stridulation 12–25 kHz",
		activity: (h) => h >= 9 && h < 17 ? .55 : .04
	}
};
var PROFILES = {
	adaptive: {
		id: "adaptive",
		name: "Adaptive",
		target: "Matched on classify",
		band: "2–70 kHz",
		carrierKhz: 32,
		audibleHz: 2400,
		pattern: "burst",
		bins: [
			8,
			22,
			32,
			48
		],
		summary: "Node picks the library entry for the classified signature."
	},
	"bat-mimic": {
		id: "bat-mimic",
		name: "Bat-mimic burst",
		target: "Noctuid moths",
		band: "25–40 kHz",
		carrierKhz: 32,
		audibleHz: 4100,
		pattern: "burst",
		bins: [
			28,
			32,
			36,
			40
		],
		summary: "5 ms pulses at 10 Hz, temporal mimic of a sympatric bat search-phase call. Moths dump altitude; little habituation."
	},
	"hopper-jam": {
		id: "hopper-jam",
		name: "Hopper jam",
		target: "Leafhoppers",
		band: "8–18 kHz",
		carrierKhz: 12,
		audibleHz: 2800,
		pattern: "sweep",
		bins: [
			8,
			12,
			16
		],
		summary: "Slow sweep that jams substrate courtship clicks in the canopy."
	},
	"rodent-band": {
		id: "rodent-band",
		name: "Rodent band",
		target: "Rats & mice",
		band: "20–35 kHz",
		carrierKhz: 26,
		audibleHz: 1800,
		pattern: "burst",
		bins: [
			20,
			24,
			28,
			34
		],
		summary: "Harsh 20–35 kHz packets. Rotates carrier every 90 s to delay habituation."
	},
	"avian-distress": {
		id: "avian-distress",
		name: "Avian distress",
		target: "Flocking birds",
		band: "2–8 kHz",
		carrierKhz: 4.2,
		audibleHz: 2400,
		pattern: "whistle",
		bins: [
			2,
			4,
			6
		],
		summary: "Descending distress whistle plus a hawk-like chatter. Audible band."
	},
	"locust-clack": {
		id: "locust-clack",
		name: "Locust clack",
		target: "Swarming orthoptera",
		band: "12–25 kHz",
		carrierKhz: 18,
		audibleHz: 900,
		pattern: "clack",
		bins: [
			12,
			16,
			20,
			24
		],
		summary: "Broadband clacks that break swarm cohesion at the plot edge."
	}
};
var NODE_SEEDS = [
	{
		id: "acs-01",
		code: "ACS-01",
		sector: "NW bund",
		x: .18,
		y: .2,
		armed: true,
		battery: .86,
		rssi: -79,
		profileId: "adaptive"
	},
	{
		id: "acs-02",
		code: "ACS-02",
		sector: "North canal",
		x: .5,
		y: .16,
		armed: true,
		battery: .74,
		rssi: -84,
		profileId: "avian-distress"
	},
	{
		id: "acs-03",
		code: "ACS-03",
		sector: "NE bund",
		x: .82,
		y: .22,
		armed: true,
		battery: .91,
		rssi: -76,
		profileId: "adaptive"
	},
	{
		id: "acs-04",
		code: "ACS-04",
		sector: "West ditch",
		x: .16,
		y: .52,
		armed: true,
		battery: .63,
		rssi: -91,
		profileId: "adaptive"
	},
	{
		id: "acs-05",
		code: "ACS-05",
		sector: "Centre",
		x: .5,
		y: .5,
		armed: true,
		battery: .88,
		rssi: -72,
		profileId: "adaptive"
	},
	{
		id: "acs-06",
		code: "ACS-06",
		sector: "East bund",
		x: .84,
		y: .54,
		armed: true,
		battery: .81,
		rssi: -81,
		profileId: "adaptive"
	},
	{
		id: "acs-07",
		code: "ACS-07",
		sector: "SW corner",
		x: .2,
		y: .82,
		armed: false,
		battery: .14,
		rssi: -97,
		profileId: "rodent-band"
	},
	{
		id: "acs-08",
		code: "ACS-08",
		sector: "SE bund",
		x: .78,
		y: .84,
		armed: true,
		battery: .77,
		rssi: -80,
		profileId: "adaptive"
	}
];
var BOM = [
	{
		item: "ESP32-S3-WROOM-1",
		role: "Edge MCU + TinyML",
		qty: 1,
		cost: 3.4
	},
	{
		item: "INMP441 I2S MEMS",
		role: "Omni listen, 20 Hz–20 kHz",
		qty: 1,
		cost: 2.1
	},
	{
		item: "Knowles SPH0641LU",
		role: "Ultrasonic listen to 80 kHz",
		qty: 1,
		cost: 4.8
	},
	{
		item: "40 kHz piezo disc",
		role: "Circular deterrent array",
		qty: 8,
		cost: 6.4
	},
	{
		item: "3 W full-range driver",
		role: "Audible avian band",
		qty: 1,
		cost: 2.6
	},
	{
		item: "SX1276 LoRa 868/915",
		role: "Event uplink",
		qty: 1,
		cost: 5.2
	},
	{
		item: "10 W 6 V solar + MPPT",
		role: "Day harvest",
		qty: 1,
		cost: 11
	},
	{
		item: "6 Ah LiFePO4 6.4 V",
		role: "Night reserve",
		qty: 1,
		cost: 14.5
	},
	{
		item: "Class-D amp + preamp",
		role: "Drive + listen chain",
		qty: 1,
		cost: 4.1
	},
	{
		item: "IP67 ASA pod + 48 mm stake",
		role: "Field mount",
		qty: 1,
		cost: 9.8
	}
];
var HARDWARE_STEPS = [
	{
		title: "Listen",
		body: "Dual mics sample airborne and ultrasonic bands. Wind screens and a 1 m canopy mount keep rain and plastic rattle out of the classifier."
	},
	{
		title: "Classify on the stake",
		body: "A Conv1D TinyML model on the ESP32-S3 scores five pest families in ~50 ms. Raw audio never leaves the node — only a 12-byte event."
	},
	{
		title: "Pulse",
		body: "The matched library entry drives the piezo array or the audible driver. Carriers rotate so pests cannot habituate on a single tone."
	},
	{
		title: "Uplink",
		body: "LoRaWAN ships class, confidence, and battery to the plot gateway. This console is the listening field, not a camera wall."
	}
];
//#endregion
export { PESTS as a, PULSE_RADIUS as c, NODE_SEEDS as i, HARDWARE_STEPS as n, PLOT as o, LISTEN_RADIUS as r, PROFILES as s, BOM as t };
