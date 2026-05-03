"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useActiveChapter } from "./home/useActiveChapter";

const links = [
  { anchor: "entrance", href: "/", label: "Intro" },
  { anchor: "about", href: "/about", label: "About" },
  { anchor: "collection", href: "/works", label: "Works" },
  { anchor: "inquiry", href: "/inquiry", label: "Inquiry" },
] as const;

// Anchors that actually live on the home page after the 3-chapter cut.
// About + Guest are dedicated routes only — their links always navigate
// to the route, never to a #anchor on /.
const HOME_ANCHORS = new Set(["entrance", "collection", "inquiry"]);
const HOME_ANCHOR_LIST = links
  .filter((l) => HOME_ANCHORS.has(l.anchor))
  .map((l) => l.anchor);

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
  const onHome = pathname === "/";
  // Only run the chapter tracker on the home page; on dedicated routes
  // we fall back to pathname-based active state.
  const activeChapter = useActiveChapter(onHome ? HOME_ANCHOR_LIST : []);

  const isActive = (link: (typeof links)[number]) => {
    // About + Guest never live on home — match by route only.
    if (!HOME_ANCHORS.has(link.anchor)) {
      return link.href !== "/" && pathname.startsWith(link.href);
    }
    if (onHome) return activeChapter === link.anchor;
    return false;
  };

  // Home anchors get same-page or route+anchor links; About/Guest always
  // navigate to their dedicated routes.
  const targetFor = (link: (typeof links)[number]) => {
    if (!HOME_ANCHORS.has(link.anchor)) return link.href;
    return onHome ? `#${link.anchor}` : `/#${link.anchor}`;
  };

  return (
    <>
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
            href={onHome ? "#entrance" : "/"}
            data-cursor="view"
            className="group inline-flex shrink-0 items-center gap-2 sm:gap-3"
          >
            <span
              aria-hidden
              className="hidden h-px w-6 bg-ink transition-[width] duration-500 group-hover:w-10 sm:block"
            />
            <span className="font-serif text-base tracking-[0.18em] text-ink">
              PROJECT YOON
            </span>
          </Link>

          <nav aria-label="Sections" className="min-w-0">
            <ul className="flex items-center gap-3 sm:gap-6 lg:gap-9">
              {links.map((link) => {
                const active = isActive(link);
                return (
                  <li key={link.anchor}>
                    <Link
                      href={targetFor(link)}
                      aria-current={active ? "page" : undefined}
                      className={`relative font-sans text-[10px] uppercase tracking-gallery transition-colors ${
                        active
                          ? "text-ink"
                          : "text-concrete-500 hover:text-ink"
                      }`}
                    >
                      {link.label}
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
