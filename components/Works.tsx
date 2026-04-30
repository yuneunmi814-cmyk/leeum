"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { works, type Work } from "@/data/works";
import PlaceholderArt from "./PlaceholderArt";

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
      {/* Section opener */}
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
          <span>The Galleries</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="mt-6 max-w-2xl font-serif text-2xl leading-[1.3] text-ink sm:text-3xl lg:text-4xl"
        >
          여덟 개의 방, 여덟 개의 작품.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="mt-6 max-w-xl font-serif text-base leading-[1.85] text-concrete-500"
        >
          정해진 동선은 없습니다. 마음이 머무는 곳에서 머무시면 됩니다.
        </motion.p>
      </div>

      {/* Asymmetric grid */}
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
            End of Exhibition
          </p>
          <p className="mt-2 font-serif italic text-concrete-700">
            Thank you for staying.
          </p>
        </div>
      </div>
    </section>
  );
}

function Tile({ work, index }: { work: Work; index: number }) {
  const span = spanClass[work.layout.span];
  const offset = work.layout.offset ?? "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`col-span-1 ${span} ${offset}`}
    >
      <Link
        href={`/works/${work.id}`}
        data-cursor="view"
        className="group block focus-visible:outline-none"
        aria-label={`${work.titleKo} (${work.title}) — ${work.year}`}
      >
        {/* Plate */}
        <div className="relative overflow-hidden bg-concrete-200">
          <motion.div
            className={`relative ${work.layout.aspect} w-full will-change-transform`}
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <PlaceholderArt
              shape={work.placeholder.shape}
              palette={work.placeholder.palette}
            />
            <div
              className="absolute inset-0 concrete-grain opacity-25 mix-blend-multiply"
              aria-hidden
            />
          </motion.div>

          {/* Hover shadow + edge */}
          <div
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10 transition-opacity duration-700 group-hover:ring-ink/25"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-4 -bottom-6 h-12 rounded-[50%] bg-ink/0 blur-2xl transition-all duration-700 group-hover:-bottom-3 group-hover:bg-ink/15"
            aria-hidden
          />

          {/* Plate corner index */}
          <div className="pointer-events-none absolute left-4 top-4 font-sans text-[10px] uppercase tracking-gallery text-ink/0 transition-colors duration-500 group-hover:text-ink/70">
            № {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Caption */}
        <div className="mt-5 flex items-baseline justify-between">
          <h3 className="font-serif text-xl text-ink leading-tight transition-[letter-spacing] duration-500 group-hover:tracking-wider sm:text-2xl">
            {work.titleKo}
          </h3>
          <span className="ml-4 shrink-0 font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            {work.year}
          </span>
        </div>
        <p className="mt-1 font-serif italic text-sm text-concrete-500">
          {work.title}
        </p>
        <p className="mt-3 max-w-md font-sans text-xs leading-relaxed text-concrete-700">
          {work.medium}
        </p>
        <p className="mt-3 max-w-md font-serif text-[15px] leading-[1.75] text-concrete-700 text-balance">
          {work.caption}
        </p>
      </Link>
    </motion.div>
  );
}
