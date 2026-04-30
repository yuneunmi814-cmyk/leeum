"use client";

import { motion } from "framer-motion";

/**
 * Shared chapter shell for the home single-scroll experience.
 *
 * - Section gets the anchor id so #foo links land here.
 * - scroll-mt-20 leaves room for the fixed header when jumping to anchors.
 * - The chapter mark ("II. — The Artist") fades in first, the body
 *   slides up 120 ms later — that small delay is the docent's pause
 *   before the reveal.
 */
export default function Chapter({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative scroll-mt-20 px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"
    >
      <div className="mx-auto max-w-gallery">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          <span>{number}</span>
          <span aria-hidden className="block h-px w-12 bg-concrete-300" />
          <span>{title}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{
            duration: 1.2,
            delay: 0.12,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="mt-12 sm:mt-16"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
