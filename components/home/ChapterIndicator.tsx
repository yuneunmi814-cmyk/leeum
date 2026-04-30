"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HOME_CHAPTERS, useActiveChapter } from "./useActiveChapter";

/**
 * Floating top-right reading of the current chapter — like a discreet
 * exhibition signpost. Hidden below sm; only mounts on the home page.
 * Fades cross-chapter via AnimatePresence on the active id.
 */
export default function ChapterIndicator() {
  const ids = HOME_CHAPTERS.map((c) => c.id);
  const activeId = useActiveChapter(ids);
  const active = HOME_CHAPTERS.find((c) => c.id === activeId);
  if (!active) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-10 top-20 z-40 hidden items-baseline gap-2 sm:flex lg:right-16 lg:top-24"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-baseline gap-2 font-sans text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          <span>{active.number}</span>
          <span className="block h-px w-4 bg-concrete-300" />
          <span>{active.label}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
