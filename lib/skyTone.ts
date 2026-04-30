/**
 * Sky tones for the M1 oculus — interpolated by clock time.
 *
 * Seven anchor phases positioned across the day. The active tone is
 * lerped between the two nearest anchors; transitions wrap cleanly
 * across midnight via a sentinel "dawn" entry at hour 29.
 */

export type SkyTone = {
  /** 5 stops for the sky radial gradient (center → rim) */
  sky: readonly [string, string, string, string, string];
  /** 3 stops for the central keystone glow */
  keystone: readonly [string, string, string];
  /** Highlight color for the cursor-following beam */
  beam: string;
  /** Tint of the rim shadow vignette (top→bottom) */
  rimShadow: string;
  /** 0–1 opacity of the canvas-haze halo near the rim */
  hazeOpacity: number;
  /** Suggested ambient / wall tint for the hero background */
  ambient: string;
  /** Foreground color for text/marks rendered on top of the sky disc */
  inkOnSky: string;
  /** Human-readable phase name (interpolated label is dominant phase) */
  label: string;
};

const TONES = {
  dawn: {
    sky: ["#3A2C4D", "#6B5677", "#B8769B", "#E8A789", "#FFD9B0"],
    keystone: ["#FFE8C9", "#E8A789", "#6B5677"],
    beam: "#FFE0B5",
    rimShadow: "#1F1525",
    hazeOpacity: 0.12,
    ambient: "#241A30",
    inkOnSky: "#F4E0D0",
    label: "Dawn",
  },
  morning: {
    sky: ["#FFE8C9", "#FFD0A0", "#E5A582", "#B8C2D6", "#7E8A9D"],
    keystone: ["#FFFFFF", "#FFE8C9", "#FFD0A0"],
    beam: "#FFF2D8",
    rimShadow: "#3A2F2A",
    hazeOpacity: 0.22,
    ambient: "#F5E8D5",
    inkOnSky: "#2C2C2C",
    label: "Morning",
  },
  day: {
    sky: ["#F4F7F9", "#DCE5EC", "#B8C9D6", "#8AA2B5", "#5C7180"],
    keystone: ["#FFFFFF", "#F1F5F8", "#DCE5EC"],
    beam: "#FFFFFF",
    rimShadow: "#2C2C2C",
    hazeOpacity: 0.2,
    ambient: "#FAFAF7",
    inkOnSky: "#1A1A1A",
    label: "Day",
  },
  afternoon: {
    sky: ["#F9F0E0", "#E8D5BC", "#C9A48C", "#9A8B7A", "#5C5045"],
    keystone: ["#FFF8E8", "#F9F0E0", "#E8D5BC"],
    beam: "#FFE8C2",
    rimShadow: "#3A2F25",
    hazeOpacity: 0.18,
    ambient: "#F5EDE0",
    inkOnSky: "#2C2418",
    label: "Afternoon",
  },
  sunset: {
    sky: ["#FFD8A0", "#FFA86B", "#E5645E", "#8B4F6E", "#3D2E4D"],
    keystone: ["#FFE8C9", "#FFA86B", "#E5645E"],
    beam: "#FFC982",
    rimShadow: "#2C1A2C",
    hazeOpacity: 0.14,
    ambient: "#3D2E3D",
    inkOnSky: "#FFE8C9",
    label: "Sunset",
  },
  dusk: {
    sky: ["#C9897E", "#8B6E7E", "#564B6B", "#2E3450", "#15192C"],
    keystone: ["#E8B5A0", "#8B6E7E", "#564B6B"],
    beam: "#C9A8A0",
    rimShadow: "#15192C",
    hazeOpacity: 0.1,
    ambient: "#1F1825",
    inkOnSky: "#E8C9C0",
    label: "Dusk",
  },
  night: {
    sky: ["#5C7180", "#3D4A6B", "#2C3550", "#1A2038", "#080C18"],
    keystone: ["#A0B0C9", "#5C7180", "#2C3550"],
    beam: "#A0B0C9",
    rimShadow: "#080C18",
    hazeOpacity: 0.06,
    ambient: "#0E1424",
    inkOnSky: "#A0B0C9",
    label: "Night",
  },
} as const satisfies Record<string, SkyTone>;

type ToneKey = keyof typeof TONES;

const SCHEDULE: ReadonlyArray<{ hour: number; key: ToneKey }> = [
  { hour: 5, key: "dawn" },
  { hour: 7, key: "morning" },
  { hour: 11, key: "day" },
  { hour: 16, key: "afternoon" },
  { hour: 18, key: "sunset" },
  { hour: 19.5, key: "dusk" },
  { hour: 22, key: "night" },
  { hour: 29, key: "dawn" }, // wraps to next-day dawn at 5 + 24
];

// ── color math ─────────────────────────────────────────────────────
function hexToRgb(s: string): [number, number, number] {
  const v = parseInt(s.replace("#", ""), 16);
  return [(v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff];
}

function toHex(n: number): string {
  return Math.round(Math.max(0, Math.min(255, n)))
    .toString(16)
    .padStart(2, "0");
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t));
}

function lerpTone(a: SkyTone, b: SkyTone, t: number, label: string): SkyTone {
  return {
    sky: a.sky.map((c, i) => lerpColor(c, b.sky[i], t)) as unknown as SkyTone["sky"],
    keystone: a.keystone.map((c, i) =>
      lerpColor(c, b.keystone[i], t)
    ) as unknown as SkyTone["keystone"],
    beam: lerpColor(a.beam, b.beam, t),
    rimShadow: lerpColor(a.rimShadow, b.rimShadow, t),
    hazeOpacity: lerp(a.hazeOpacity, b.hazeOpacity, t),
    ambient: lerpColor(a.ambient, b.ambient, t),
    inkOnSky: lerpColor(a.inkOnSky, b.inkOnSky, t),
    label,
  };
}

// ── public API ─────────────────────────────────────────────────────
export function getSkyTone(date: Date = new Date()): SkyTone {
  let h =
    date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  // Before the first checkpoint? wrap into the night→dawn segment.
  if (h < SCHEDULE[0].hour) h += 24;

  let i = 0;
  while (i < SCHEDULE.length - 1 && SCHEDULE[i + 1].hour <= h) i++;
  const cur = SCHEDULE[i];
  const next = SCHEDULE[Math.min(i + 1, SCHEDULE.length - 1)];

  const span = next.hour - cur.hour;
  const t = span === 0 ? 0 : (h - cur.hour) / span;

  // Use the dominant phase's label so it doesn't read as a weird hybrid.
  const label =
    t < 0.5 ? TONES[cur.key].label : TONES[next.key].label;

  return lerpTone(TONES[cur.key], TONES[next.key], t, label);
}

/** Default tone — used as initial state to avoid hydration mismatch. */
export const DEFAULT_TONE: SkyTone = TONES.day;

/** Formats hour:minute as e.g. "06:42" — for the Hero phase chip. */
export function formatClock(date: Date = new Date()): string {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}
