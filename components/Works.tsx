"use client";

import { motion } from "framer-motion";
import { works } from "@/data/works";
import Tile from "./Tile";

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
          네 개의 작품, 하나의 빛. 코드로 지어 올린 공간·정책·앱을 한 자리에 모았다.
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

