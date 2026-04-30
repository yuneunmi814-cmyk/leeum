"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Intro" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/studio", label: "Studio" },
  { href: "/guest", label: "Guest" },
] as const;

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

  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
        <div className="mx-auto flex max-w-gallery items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-10 sm:py-5 lg:px-16">
          <Link
            href="/"
            data-cursor="view"
            className="group inline-flex shrink-0 items-center gap-2 sm:gap-3"
          >
            <span
              aria-hidden
              className="hidden h-px w-6 bg-ink transition-[width] duration-500 group-hover:w-10 sm:block"
            />
            <span className="font-serif text-base tracking-wide text-ink">
              OCULUS
            </span>
            <span className="hidden font-sans text-[10px] uppercase tracking-gallery text-concrete-500 lg:inline">
              · M1 Rotunda
            </span>
          </Link>

          <nav aria-label="Sections" className="min-w-0">
            <ul className="flex items-center gap-3 sm:gap-6 lg:gap-9">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative font-sans text-[10px] uppercase tracking-gallery transition-colors ${
                        active
                          ? "text-ink"
                          : "text-concrete-500 hover:text-ink"
                      }`}
                    >
                      {link.label}
                      {/* Tiny underline marker for the active page */}
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute -bottom-1.5 left-0 right-0 h-px origin-left bg-ink transition-transform duration-500 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
