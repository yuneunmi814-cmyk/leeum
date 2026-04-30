import type { WorkShape } from "@/data/works";

type Props = {
  shape: WorkShape;
  palette: [string, string, string];
};

/** SVG stand-ins until real artwork images replace them. */
export default function PlaceholderArt({ shape, palette }: Props) {
  const [c1, c2, c3] = palette;
  const idSuffix = `${shape}-${c2.replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={`bg-${idSuffix}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="55%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
        <radialGradient id={`spot-${idSuffix}`} cx="50%" cy="32%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="1000" fill={`url(#bg-${idSuffix})`} />
      <rect width="800" height="1000" fill={`url(#spot-${idSuffix})`} />

      {shape === "circle" && (
        <g stroke={c3} strokeOpacity="0.5" fill="none">
          <circle cx="400" cy="540" r="240" strokeWidth="1.4" />
          <circle cx="400" cy="540" r="160" strokeWidth="0.8" />
          <circle cx="400" cy="540" r="80" strokeWidth="0.5" />
          <circle cx="400" cy="540" r="20" fill={c1} stroke="none" />
        </g>
      )}

      {shape === "slab" && (
        <g>
          <rect x="120" y="260" width="560" height="120" fill={c1} opacity="0.85" />
          <rect x="120" y="420" width="560" height="120" fill={c2} opacity="0.7" />
          <rect x="120" y="580" width="560" height="120" fill={c3} opacity="0.65" />
        </g>
      )}

      {shape === "grid" && (
        <g stroke={c3} strokeOpacity="0.4">
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={400}
                y1={540}
                x2={400 + Math.cos(a) * 280}
                y2={540 + Math.sin(a) * 280}
                strokeWidth={i % 3 === 0 ? 1 : 0.4}
              />
            );
          })}
          <circle cx="400" cy="540" r="280" fill="none" stroke={c3} strokeOpacity="0.6" strokeWidth="1.2" />
          <circle cx="400" cy="540" r="160" fill="none" stroke={c3} strokeOpacity="0.35" strokeWidth="0.6" />
        </g>
      )}

      {shape === "line" && (
        <g stroke={c3} strokeOpacity="0.55">
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={i}
              x1="120"
              y1={300 + i * 26}
              x2={120 + (i % 3 === 0 ? 560 : i % 2 === 0 ? 360 : 220)}
              y2={300 + i * 26}
              strokeWidth="0.6"
            />
          ))}
        </g>
      )}

      {shape === "arch" && (
        <g fill="none" stroke={c3} strokeOpacity="0.6">
          <path d="M 200 760 L 200 480 A 200 200 0 0 1 600 480 L 600 760 Z" strokeWidth="1.6" />
          <path d="M 260 760 L 260 500 A 140 140 0 0 1 540 500 L 540 760 Z" strokeWidth="0.9" opacity="0.6" />
          <line x1="160" y1="760" x2="640" y2="760" strokeWidth="1.2" />
        </g>
      )}

      {shape === "horizon" && (
        <g>
          <line x1="60" y1="600" x2="740" y2="600" stroke={c3} strokeOpacity="0.75" strokeWidth="1.2" />
          <line x1="60" y1="640" x2="740" y2="640" stroke={c3} strokeOpacity="0.3" strokeWidth="0.5" />
          <circle cx="500" cy="380" r="60" fill={c1} opacity="0.6" />
          {/* small figure */}
          <g stroke={c3} strokeOpacity="0.85" strokeWidth="0.8" fill="none">
            <line x1="380" y1="600" x2="380" y2="560" />
            <circle cx="380" cy="554" r="6" />
          </g>
        </g>
      )}

      {shape === "rose" && (
        <g stroke={c3} fill="none" strokeOpacity="0.55">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x = 400 + Math.cos(a) * 100;
            const y = 540 + Math.sin(a) * 100;
            return <circle key={i} cx={x} cy={y} r="100" strokeWidth="0.6" />;
          })}
          <circle cx="400" cy="540" r="100" strokeWidth="1" />
          <circle cx="400" cy="540" r="6" fill={c1} stroke="none" />
        </g>
      )}
    </svg>
  );
}
