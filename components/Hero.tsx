"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Oculus from "./Oculus";
import {
  DEFAULT_TONE,
  formatClock,
  getSkyTone,
  type SkyTone,
} from "@/lib/skyTone";

export default function Hero() {
  // Initialize with the static daylight tone so SSR + first client render
  // agree; on mount we swap to the real time-of-day tone, and refresh once
  // a minute so a long-open page tracks the day.
  const [tone, setTone] = useState<SkyTone>(DEFAULT_TONE);
  const [clock, setClock] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTone(getSkyTone(now));
      setClock(formatClock(now));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="entrance"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden scroll-mt-0"
      style={{
        backgroundColor: tone.ambient,
        transition: "background-color 1.6s ease",
      }}
    >
      {/* Concrete wall */}
      <div className="absolute inset-0 concrete-grain opacity-50" aria-hidden />
      <div className="absolute inset-0 vignette-light opacity-70" aria-hidden />

      {/* The skylight */}
      <Oculus tone={tone} />

      {/* Centerpiece text */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="font-sans text-[10px] sm:text-xs uppercase tracking-gallery"
          style={{
            color: tone.inkOnSky,
            opacity: 0.7,
            transition: "color 1.6s ease",
          }}
        >
          An Exhibition of Work
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18, letterSpacing: "0.12em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
          transition={{ duration: 1.6, delay: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 font-serif text-[14vw] sm:text-[8vw] lg:text-[7rem] font-light leading-[0.95]"
          style={{ color: tone.inkOnSky, transition: "color 1.6s ease" }}
        >
          윤 은 미
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.0 }}
          className="mt-5 font-serif italic text-base sm:text-lg"
          style={{
            color: tone.inkOnSky,
            opacity: 0.75,
            transition: "color 1.6s ease",
          }}
        >
          <span
            className="not-italic font-sans text-[10px] uppercase tracking-gallery mr-3 align-middle"
            style={{ opacity: 0.6 }}
          >
            Curator · Designer
          </span>
          <span className="align-middle">a quiet study of light &amp; form</span>
        </motion.p>

        {/* Phase chip — the time-of-day reading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: clock ? 1 : 0, y: 0 }}
          transition={{ duration: 1.6, delay: 1.3 }}
          className="mt-12 inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-gallery"
          style={{
            color: tone.inkOnSky,
            opacity: 0.55,
            transition: "color 1.6s ease",
          }}
        >
          <span>{clock || "—:—"}</span>
          <span className="block h-px w-6" style={{ backgroundColor: tone.inkOnSky, opacity: 0.5 }} />
          <span>{tone.label}</span>
          <span className="block h-px w-6" style={{ backgroundColor: tone.inkOnSky, opacity: 0.5 }} />
          <span>The light shifts with the hour</span>
        </motion.div>
      </div>

      {/* Scroll indicator — leads into the next chapter on the same page */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ color: tone.inkOnSky, transition: "color 1.6s ease" }}
      >
        <Link
          href="#the-artist"
          data-cursor="view"
          className="group inline-flex items-baseline gap-3 font-sans text-[10px] uppercase tracking-gallery transition-opacity"
          style={{ opacity: 0.7 }}
        >
          <motion.span
            aria-hidden
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            ↓
          </motion.span>
          <span>Enter the Gallery</span>
        </Link>
        <div
          className="mt-2 font-serif italic text-[11px]"
          style={{ opacity: 0.55 }}
        >
          전시회 입장
        </div>
      </motion.div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px gallery-rule" aria-hidden />
    </section>
  );
}
