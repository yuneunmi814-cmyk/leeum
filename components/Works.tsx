"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { firstSentence, works, type Work } from "@/data/works";

const spanClass: Record<Work["layout"]["span"], string> = {
  12: "md:col-span-12",
  7: "md:col-span-7",
  5: "md:col-span-5",
  4: "md:col-span-4",
};

export default function Works() {
  return (
    <section
      id="works"
      className="relative bg-canvas px-6 pt-32 sm:px-10 sm:pt-40 lg:px-16"
    >
      {/* Collection opener */}
      <div className="mx-auto max-w-gallery">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9 }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          <span>II.</span>
          <span className="block h-px w-12 bg-concrete-300" />
          <span>Where the Light Stays</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 font-serif text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          Where the Light Stays<span className="text-concrete-300">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="mt-8 font-serif text-lg italic text-concrete-500 sm:text-xl"
        >
          빛이 머무는 공간 ·{" "}
          <span className="not-italic font-sans text-[10px] uppercase tracking-gallery align-middle">
            Collection 01
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="mt-10 max-w-xl font-serif text-base leading-[1.85] text-concrete-700 text-balance sm:text-lg"
        >
          두 개의 작품, 하나의 빛. 코드로 지어 올린 두 공간을 한 자리에 모았다.
        </motion.p>
      </div>

      {/* Asymmetric grid — Oculus 7-col, Lumi-re 5-col on desktop; stacks on mobile */}
      <div className="mx-auto mt-20 max-w-gallery sm:mt-28 lg:mt-32">
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-24 lg:gap-x-10">
          {works.map((work, i) => (
            <Tile key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>

      {/* End plate */}
      <div className="mx-auto mt-32 max-w-gallery pb-24 sm:mt-40">
        <div className="border-t border-concrete-200 pt-8">
          <p className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            End of Collection 01
          </p>
          <p className="mt-2 font-serif italic text-concrete-700">
            More rooms are being prepared.
          </p>
        </div>
      </div>
    </section>
  );
}

function Tile({ work, index }: { work: Work; index: number }) {
  const span = spanClass[work.layout.span];
  const offset = work.layout.offset ?? "";
  // Until /works/<id>/thumb.jpg lands, fall back to the placeholder.svg.
  // Adding a real thumbnail at the spec'd path will replace it transparently.
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
      {/* Plate — the image area */}
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
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 concrete-grain opacity-25 mix-blend-multiply"
            aria-hidden
          />
        </div>

        {/* Hover ring + soft drop shadow */}
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10 transition-colors duration-700 group-hover:ring-ink/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-4 -bottom-6 h-12 rounded-[50%] bg-ink/0 blur-2xl transition-all duration-700 group-hover:-bottom-3 group-hover:bg-ink/15"
          aria-hidden
        />

        {/* Plate index label — appears on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-4 top-4 font-sans text-[10px] uppercase tracking-gallery text-ink/0 transition-colors duration-500 group-hover:text-ink/70"
        >
          № {String(index + 1).padStart(2, "0")}
        </div>

        {/* External link badge — sits ABOVE the overlay link */}
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
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        )}
      </div>

      {/* Caption */}
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

        {/* Hover preview — first sentence of curatorial note fades in */}
        <div className="mt-4 overflow-hidden">
          <p className="max-w-md -translate-y-1 font-serif text-[15px] leading-[1.7] text-concrete-700 opacity-0 text-balance transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            {previewLine}
          </p>
        </div>
      </div>

      {/* Click target — overlay link covers the whole tile so anywhere navigates
          to the detail page; the external badge above (z-20) overrides for its corner. */}
      <Link
        href={`/works/${work.id}`}
        data-cursor="view"
        aria-label={`Open detail page for ${work.titleKo} (${work.title})`}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
      />
    </motion.div>
  );
}
