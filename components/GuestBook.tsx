"use client";

import { motion } from "framer-motion";

const channels: { label: string; value: string; href: string }[] = [
  { label: "Email", value: "studio@oculus.kr", href: "mailto:studio@oculus.kr" },
  { label: "GitHub", value: "github.com/oculus-studio", href: "https://github.com/oculus-studio" },
  { label: "Instagram", value: "@oculus.studio", href: "https://instagram.com/oculus.studio" },
];

export default function GuestBook() {
  return (
    <section
      id="guest-book"
      className="relative border-t border-concrete-200 bg-canvas px-6 pt-32 pb-16 sm:px-10 sm:pt-40 lg:px-16"
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
          <span>III.</span>
          <span className="block h-px w-12 bg-concrete-300" />
          <span>Guest Book</span>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <h2 className="font-serif text-3xl leading-[1.2] text-ink sm:text-5xl lg:text-6xl">
              남기시는 한 줄,
              <span className="block text-concrete-500 italic font-light">
                a single line is enough.
              </span>
            </h2>

            <p className="mt-8 max-w-xl font-serif text-lg leading-[1.85] text-concrete-700 text-balance">
              방명록은 미술관의 가장 마지막 자리입니다. 방을 둘러본 다음, 한 줄을
              남겨 주시면 작가에게 전달됩니다. 답장이 늦더라도, 빛이 늦게 떨어지는
              것이라 생각해 주세요.
            </p>

            <a
              href="mailto:studio@oculus.kr?subject=Guest%20Book"
              data-cursor="view"
              className="group mt-10 inline-flex items-center gap-4 border-b border-ink/30 pb-2 font-serif text-2xl text-ink transition-colors hover:border-ink sm:text-3xl"
            >
              <span className="italic">Sign the Guest Book</span>
              <span
                aria-hidden
                className="font-sans text-sm tracking-gallery transition-transform group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </motion.div>

          {/* Hours + channels — styled like a museum information plaque */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="lg:col-span-4 lg:col-start-9"
          >
            <div className="border border-concrete-200 bg-canvas/50 p-8">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                  Hours
                </span>
                <div className="mt-3 font-serif text-2xl text-ink">
                  Open 24/7
                </div>
                <div className="mt-1 font-sans text-[11px] uppercase tracking-gallery text-concrete-500">
                  · Online · No closure ·
                </div>
              </div>

              <div className="mt-8 border-t border-concrete-200 pt-6">
                <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                  Channels
                </span>
                <ul className="mt-4 space-y-4">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        data-cursor="view"
                        className="group block"
                      >
                        <div className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                          {c.label}
                        </div>
                        <div className="mt-1 flex items-baseline justify-between font-serif text-base text-ink transition-[letter-spacing] duration-300 group-hover:tracking-wide">
                          <span>{c.value}</span>
                          <span
                            aria-hidden
                            className="font-sans text-[10px] tracking-gallery text-concrete-400 transition-transform group-hover:translate-x-1"
                          >
                            ↗
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-concrete-200 pt-6">
                <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                  Location
                </span>
                <div className="mt-2 font-serif text-base text-ink">
                  Seoul, Republic of Korea
                </div>
                <div className="mt-1 font-sans text-[11px] tracking-wall text-concrete-500">
                  By appointment only
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Closing rule */}
      <div className="mx-auto mt-24 max-w-gallery border-t border-concrete-200 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            © 2026 Oculus Studio
          </span>
          <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            Inspired by M1 Rotunda — Mario Botta · Leeum
          </span>
        </div>
      </div>
    </section>
  );
}
