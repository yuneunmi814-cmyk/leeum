"use client";

import { motion } from "framer-motion";
import Oculus from "./Oculus";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-concrete-100">
      {/* Concrete wall */}
      <div className="absolute inset-0 concrete-grain opacity-70" aria-hidden />
      <div className="absolute inset-0 vignette-light" aria-hidden />

      {/* The skylight */}
      <Oculus />

      {/* Centerpiece text */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="font-sans text-[10px] sm:text-xs uppercase tracking-gallery text-concrete-700"
        >
          An Exhibition of Work
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18, letterSpacing: "0.12em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
          transition={{ duration: 1.6, delay: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 font-serif text-[14vw] sm:text-[8vw] lg:text-[7rem] font-light leading-[0.95] text-ink"
        >
          이 윤 미
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.0 }}
          className="mt-5 font-serif italic text-base sm:text-lg text-concrete-700"
        >
          <span className="not-italic font-sans text-[10px] uppercase tracking-gallery mr-3 align-middle text-concrete-500">
            Curator · Designer
          </span>
          <span className="align-middle">a quiet study of light & form</span>
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 font-sans text-[10px] uppercase tracking-gallery text-concrete-700 hover:text-concrete-900 transition-colors"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          ↓
        </motion.span>
        <span className="ml-3">Enter the Gallery</span>
      </motion.a>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px gallery-rule" aria-hidden />
    </section>
  );
}
