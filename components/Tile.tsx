"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { firstSentence, type Work } from "@/data/works";

const spanClass: Record<Work["layout"]["span"], string> = {
  12: "md:col-span-12",
  7: "md:col-span-7",
  5: "md:col-span-5",
  4: "md:col-span-4",
};

/**
 * One work plate in the asymmetric gallery grid.
 * - Whole tile is the click target (overlay link, z-10).
 * - "Live ↗" badge sits at z-20 so it overrides the overlay in its corner.
 * - Until /works/<id>/thumb.jpg lands, falls back to placeholder.svg.
 * - Hover reveals the first sentence of the curatorial note.
 */
export default function Tile({ work, index }: { work: Work; index: number }) {
  const span = spanClass[work.layout.span];
  const offset = work.layout.offset ?? "";
  const [imgSrc, setImgSrc] = useState(work.thumbnail);
  const previewLine = firstSentence(work.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`group relative col-span-1 ${span} ${offset}`}
    >
      <div className="relative overflow-hidden bg-concrete-200">
        <div
          className={`relative ${work.layout.aspect} w-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.025]`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={`${work.titleKo} — ${work.title}`}
            onError={() => {
              const fallback = `/works/${work.id}/placeholder.svg`;
              if (imgSrc !== fallback) setImgSrc(fallback);
            }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: work.layout.objectPosition ?? "center" }}
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 concrete-grain opacity-25 mix-blend-multiply"
            aria-hidden
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10 transition-colors duration-700 group-hover:ring-ink/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-4 -bottom-6 h-12 rounded-[50%] bg-ink/0 blur-2xl transition-all duration-700 group-hover:-bottom-3 group-hover:bg-ink/15"
          aria-hidden
        />

        <div
          aria-hidden
          className="pointer-events-none absolute left-4 top-4 font-sans text-[10px] uppercase tracking-gallery text-ink/0 transition-colors duration-500 group-hover:text-ink/70"
        >
          № {String(index + 1).padStart(2, "0")}
        </div>

        {work.links.live && (
          <a
            href={work.links.live}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            aria-label={`Open the live ${work.title} site in a new tab`}
            className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 bg-ink/85 px-3 py-1.5 font-sans text-[10px] uppercase tracking-gallery text-canvas opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 hover:bg-ink"
          >
            <span>Live</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        )}
      </div>

      <div className="relative mt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-2xl leading-tight text-ink transition-[letter-spacing] duration-500 group-hover:tracking-wider sm:text-3xl">
            {work.titleKo}
          </h3>
          <span className="shrink-0 font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            {work.year}
          </span>
        </div>
        <p className="mt-1 font-serif italic text-base text-concrete-500">
          {work.title}
          {work.links.live && (
            <span
              aria-hidden
              className="ml-2 inline-block align-baseline font-sans text-[10px] not-italic tracking-gallery text-concrete-400"
            >
              ↗
            </span>
          )}
        </p>
        <p className="mt-3 max-w-md font-sans text-xs leading-relaxed text-concrete-700">
          {work.medium}
        </p>

        <div className="mt-4 overflow-hidden">
          <p className="max-w-md -translate-y-1 font-serif text-[15px] leading-[1.7] text-concrete-700 opacity-0 text-balance transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            {previewLine}
          </p>
        </div>
      </div>

      {work.externalOnly && work.links.live ? (
        <a
          href={work.links.live}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          aria-label={`Open the live ${work.titleKo} (${work.title}) site in a new tab`}
          className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        />
      ) : (
        <Link
          href={`/works/${work.id}`}
          data-cursor="view"
          aria-label={`Open detail page for ${work.titleKo} (${work.title})`}
          className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        />
      )}
    </motion.div>
  );
}
