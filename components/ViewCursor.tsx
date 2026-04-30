"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom "VIEW" cursor that appears over [data-cursor="view"] elements.
 * Hidden entirely on touch / non-hover devices.
 */
export default function ViewCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 55, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 55, mass: 0.4 });

  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      const isOverTrigger = !!(
        target && target.closest && target.closest('[data-cursor="view"]')
      );
      setActive(isOverTrigger);
    };
    const onLeave = () => setActive(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{
          scale: active ? 1 : 0.4,
          opacity: active ? 1 : 0,
        }}
        transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-ink/95 text-canvas backdrop-blur-md"
      >
        <span className="font-sans text-[10px] uppercase tracking-gallery">
          View
        </span>
        <span
          aria-hidden
          className="absolute inset-0 rounded-full ring-1 ring-canvas/30"
        />
      </motion.div>
    </motion.div>
  );
}
