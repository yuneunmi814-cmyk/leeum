"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#intro", label: "Intro" },
  { href: "/#works", label: "Works" },
  { href: "/#guest-book", label: "Guest" },
];

export default function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress — a single hairline at the very top */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-ink"
        style={{ scaleX }}
        aria-hidden
      />

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled
            ? "border-b border-concrete-200 bg-canvas/80 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-gallery items-center justify-between px-6 py-4 sm:px-10 sm:py-5 lg:px-16">
          <Link
            href="/"
            data-cursor="view"
            className="group inline-flex items-center gap-3"
          >
            <span
              aria-hidden
              className="block h-px w-6 bg-ink transition-[width] duration-500 group-hover:w-10"
            />
            <span className="font-serif text-base tracking-wide text-ink">
              OCULUS
            </span>
            <span className="hidden font-sans text-[10px] uppercase tracking-gallery text-concrete-500 sm:inline">
              · M1 Rotunda
            </span>
          </Link>

          <nav aria-label="Sections">
            <ul className="flex items-center gap-5 sm:gap-9">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
