"use client";

import { motion } from "framer-motion";

/**
 * Wraps the detail page body in a single fade-up reveal.
 * Kept as a thin client island so the page itself stays a server component.
 */
export default function DetailReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
