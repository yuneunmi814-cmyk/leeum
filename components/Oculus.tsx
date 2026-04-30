"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo } from "react";

type OculusProps = {
  segments?: number;
  rings?: number;
};

/**
 * Mario Botta's M1 oculus — a top-down view of the rotunda's skylight.
 *
 * Layered from back to front:
 *   1. Corner vignette  (the dim periphery of the rotunda)
 *   2. Sky disc          (B8C9D6 core fading to deeper blue at the rim)
 *   3. Atmospheric haze  (fine canvas halo where light meets concrete)
 *   4. Slow-rotating texture ring (continuous, ~4 minutes per turn)
 *   5. 24 radial spokes  (with primary / secondary / tertiary weight)
 *   6. Concentric rings  (4 inner + 1 heavy outer)
 *   7. Rivets at the major spoke × ring intersections
 *   8. Rose keystone     (16-petal central pattern with breathing core)
 *   9. Heavy outer rim   (the cast concrete edge)
 *  10. Concrete shadow   (radial fall-off to dark at the corners)
 *  11. Cursor-following beam (two-layer: sharp + extra-soft halo)
 *  12. Drifting dust motes (8 particles, infinite gentle vertical drift)
 *  13. Inscription       (a thin gallery label, micro-typography)
 */
export default function Oculus({ segments = 24, rings = 5 }: OculusProps) {
  const reduceMotion = useReducedMotion();

  // Mouse-driven parallax (clamped, spring-damped)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [3.5, -3.5]), {
    stiffness: 50,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, [-1, 1], [-3.5, 3.5]), {
    stiffness: 50,
    damping: 22,
  });
  const rZ = useSpring(useTransform(mx, [-1, 1], [-2, 2]), {
    stiffness: 40,
    damping: 24,
  });
  const beamX = useSpring(useTransform(mx, [-1, 1], [-26, 26]), {
    stiffness: 40,
    damping: 24,
  });
  const beamY = useSpring(useTransform(my, [-1, 1], [-26, 26]), {
    stiffness: 40,
    damping: 24,
  });

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduceMotion]);

  // ── Geometry pre-computed once ──────────────────────────────────────
  const spokes = useMemo(() => {
    const out: { angle: number; x2: number; y2: number; tier: 1 | 2 | 3 }[] = [];
    const majorEvery = segments / 8; // 8 primary ribs
    const secondaryEvery = segments / 4; // 4 of those are emphasized further
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2 - Math.PI / 2; // 0 starts at top
      const tier: 1 | 2 | 3 =
        i % secondaryEvery === 0 ? 1 : i % majorEvery === 0 ? 2 : 3;
      out.push({
        angle: a,
        x2: 500 + Math.cos(a) * 460,
        y2: 500 + Math.sin(a) * 460,
        tier,
      });
    }
    return out;
  }, [segments]);

  const ringRadii = useMemo(() => {
    const out: number[] = [];
    for (let i = 1; i <= rings; i++) {
      out.push(70 + Math.pow(i / rings, 1.18) * 380);
    }
    return out;
  }, [rings]);

  const rivets = useMemo(() => {
    const out: { x: number; y: number; r: number }[] = [];
    spokes.forEach((s) => {
      if (s.tier > 2) return;
      ringRadii.forEach((r, ri) => {
        out.push({
          x: 500 + Math.cos(s.angle) * r,
          y: 500 + Math.sin(s.angle) * r,
          r: ri === ringRadii.length - 1 ? 2.6 : 1.5,
        });
      });
    });
    return out;
  }, [spokes, ringRadii]);

  const rose = useMemo(() => {
    const petals = 16;
    const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i < petals; i++) {
      const a = (i / petals) * Math.PI * 2;
      out.push({
        x1: 500 + Math.cos(a) * 16,
        y1: 500 + Math.sin(a) * 16,
        x2: 500 + Math.cos(a) * 38,
        y2: 500 + Math.sin(a) * 38,
      });
    }
    return out;
  }, []);

  // Deterministic motes — no hydration mismatch
  const motes = useMemo(() => {
    const seeded = (n: number) => {
      const x = Math.sin(n * 9283.13) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 8 }).map((_, i) => {
      const a = seeded(i + 1) * Math.PI * 2;
      const r = 80 + seeded(i + 11) * 320;
      return {
        cx: 500 + Math.cos(a) * r,
        cy: 500 + Math.sin(a) * r,
        size: 0.9 + seeded(i + 21) * 1.4,
        delay: seeded(i + 31) * 8,
        duration: 7 + seeded(i + 41) * 7,
        drift: 8 + seeded(i + 51) * 12,
      };
    });
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ perspective: 1400 }}
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 1000 1000"
        className="h-[155vmin] w-[155vmin] max-w-none"
        style={{
          rotateX: rx,
          rotateY: ry,
          rotate: rZ,
          transformPerspective: 1400,
        }}
      >
        <defs>
          {/* The sky pouring through */}
          <radialGradient id="oc-sky" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4F7F9" />
            <stop offset="20%" stopColor="#DCE5EC" />
            <stop offset="46%" stopColor="#B8C9D6" />
            <stop offset="74%" stopColor="#8AA2B5" />
            <stop offset="100%" stopColor="#5C7180" />
          </radialGradient>

          {/* A whisper of canvas at the rim — atmosphere */}
          <radialGradient id="oc-haze" cx="50%" cy="50%" r="50%">
            <stop offset="62%" stopColor="#FAFAF7" stopOpacity="0" />
            <stop offset="94%" stopColor="#FAFAF7" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#FAFAF7" stopOpacity="0" />
          </radialGradient>

          {/* The concrete corner shadow */}
          <radialGradient id="oc-rim-shadow" cx="50%" cy="42%" r="62%">
            <stop offset="62%" stopColor="#373531" stopOpacity="0" />
            <stop offset="82%" stopColor="#2C2C2C" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.92" />
          </radialGradient>

          {/* Cursor-following beam */}
          <radialGradient id="oc-beam" cx="50%" cy="50%" r="48%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#F1F5F8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Center keystone glaze */}
          <radialGradient id="oc-keystone" cx="50%" cy="44%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F1F5F8" />
            <stop offset="100%" stopColor="#DCE5EC" />
          </radialGradient>

          {/* Soft global vignette */}
          <radialGradient id="oc-vignette" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="78%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
          </radialGradient>

          <filter id="oc-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="oc-blur-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>

          {/* Path used for the inscribed micro-text */}
          <path
            id="oc-inscription"
            d="M 500 500 m -432 0 a 432 432 0 1 1 864 0 a 432 432 0 1 1 -864 0"
            fill="none"
          />
        </defs>

        {/* 1. Corner vignette */}
        <rect width="1000" height="1000" fill="url(#oc-vignette)" />

        {/* 2. Sky disc */}
        <circle cx="500" cy="500" r="460" fill="url(#oc-sky)" />

        {/* 3. Atmospheric haze */}
        <circle cx="500" cy="500" r="460" fill="url(#oc-haze)" />

        {/* 4. Slow-rotating texture ring (origin at 500,500 via translate trick) */}
        <g transform="translate(500 500)">
          <motion.g
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          >
            <g stroke="#1A1A1A" strokeOpacity="0.09">
              {Array.from({ length: 96 }).map((_, i) => {
                const a = (i / 96) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1={Math.cos(a) * 360}
                    y1={Math.sin(a) * 360}
                    x2={Math.cos(a) * 410}
                    y2={Math.sin(a) * 410}
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>
            {/* counter-rotating dotted ring */}
            <circle
              r="395"
              cx="0"
              cy="0"
              fill="none"
              stroke="#1A1A1A"
              strokeOpacity="0.18"
              strokeWidth="0.6"
              strokeDasharray="2 8"
            />
          </motion.g>
        </g>

        {/* 5. Spokes — three weights */}
        <g stroke="#1A1A1A">
          {spokes.map((s, i) => (
            <line
              key={i}
              x1="500"
              y1="500"
              x2={s.x2}
              y2={s.y2}
              strokeOpacity={s.tier === 1 ? 0.78 : s.tier === 2 ? 0.5 : 0.28}
              strokeWidth={s.tier === 1 ? 1.5 : s.tier === 2 ? 0.9 : 0.45}
            />
          ))}
        </g>

        {/* 6. Concentric rings */}
        <g fill="none" stroke="#1A1A1A">
          {ringRadii.map((r, i) => (
            <circle
              key={i}
              cx="500"
              cy="500"
              r={r}
              strokeOpacity={i === ringRadii.length - 1 ? 0.85 : 0.22}
              strokeWidth={i === ringRadii.length - 1 ? 1.6 : 0.5}
            />
          ))}
        </g>

        {/* 7. Rivets */}
        <g fill="#1A1A1A" fillOpacity="0.55">
          {rivets.map((rv, i) => (
            <circle key={i} cx={rv.x} cy={rv.y} r={rv.r} />
          ))}
        </g>

        {/* 8. Rose keystone */}
        <g>
          <circle cx="500" cy="500" r="46" fill="url(#oc-keystone)" />
          <g stroke="#1A1A1A" strokeOpacity="0.45" strokeWidth="0.55">
            {rose.map((p, i) => (
              <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} />
            ))}
          </g>
          <circle
            cx="500"
            cy="500"
            r="38"
            fill="none"
            stroke="#1A1A1A"
            strokeOpacity="0.6"
            strokeWidth="0.7"
          />
          <circle
            cx="500"
            cy="500"
            r="14"
            fill="none"
            stroke="#1A1A1A"
            strokeOpacity="0.5"
            strokeWidth="0.6"
          />
          {/* Breathing core */}
          <motion.circle
            cx="500"
            cy="500"
            r="6"
            fill="#FFFFFF"
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.7, 1, 0.7], r: [6, 9, 6] }
            }
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* 9. Heavy outer rim */}
        <circle
          cx="500"
          cy="500"
          r="460"
          fill="none"
          stroke="#1A1A1A"
          strokeOpacity="0.95"
          strokeWidth="2.6"
        />
        <circle
          cx="500"
          cy="500"
          r="478"
          fill="none"
          stroke="#1A1A1A"
          strokeOpacity="0.18"
          strokeWidth="14"
        />

        {/* 10. Concrete shadow */}
        <rect width="1000" height="1000" fill="url(#oc-rim-shadow)" />

        {/* 11. Cursor-following beam (two layers for depth) */}
        <motion.g style={{ x: beamX, y: beamY }}>
          <circle
            cx="500"
            cy="500"
            r="280"
            fill="url(#oc-beam)"
            filter="url(#oc-blur)"
          />
          <circle
            cx="500"
            cy="500"
            r="120"
            fill="url(#oc-beam)"
            filter="url(#oc-blur-soft)"
            opacity="0.7"
          />
        </motion.g>

        {/* 12. Dust motes */}
        <g>
          {motes.map((m, i) => (
            <motion.circle
              key={i}
              cx={m.cx}
              cy={m.cy}
              r={m.size}
              fill="#FFFFFF"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [-m.drift / 2, m.drift / 2, -m.drift / 2],
                      opacity: [0, 0.8, 0],
                    }
              }
              transition={{
                duration: m.duration,
                delay: m.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* 13. Inscription — a faint gallery label around the rim */}
        <text
          fill="#1A1A1A"
          fillOpacity="0.32"
          fontSize="11"
          letterSpacing="6"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          <textPath href="#oc-inscription" startOffset="0">
            M1 · ROTUNDA · OCULUS · MMXXVI · LIGHT FALLS BY ITS OWN WEIGHT ·
          </textPath>
        </text>
      </motion.svg>
    </motion.div>
  );
}
