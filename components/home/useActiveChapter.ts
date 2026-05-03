"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given anchor ids is currently in view, based on
 * scroll position. Whichever section's top is closest above 40 % of the
 * viewport height counts as active. Light, no IntersectionObserver,
 * no rAF loop — listens to the existing scroll/resize stream.
 */
export function useActiveChapter(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const compute = () => {
      const trigger = window.scrollY + window.innerHeight * 0.4;
      let current: string | null = ids[0] ?? null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= trigger) current = id;
      }
      setActive(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids.join("|")]);

  return active;
}

/** Catalogue of home chapters — single source of truth. */
export const HOME_CHAPTERS = [
  { id: "entrance", number: "I.", label: "Entrance" },
  { id: "collection", number: "II.", label: "Collection 01" },
  { id: "inquiry", number: "III.", label: "The Inquiry" },
] as const;

export type ChapterId = (typeof HOME_CHAPTERS)[number]["id"];
