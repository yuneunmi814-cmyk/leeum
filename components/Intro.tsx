"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative bg-concrete-50 px-6 py-32 sm:px-10 sm:py-40 lg:px-16"
    >
      {/* Section number */}
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          <span>I.</span>
          <span className="block h-px w-12 bg-concrete-300" />
          <span>The Artist</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 max-w-3xl font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.25] tracking-tight text-balance text-concrete-900"
        >
          이 공간은 한 사람의 시선이 머무른 자리입니다.
          <span className="block mt-2 text-concrete-500 italic font-light">
            A room arranged around a single gaze.
          </span>
        </motion.h2>
      </div>

      {/* Two-column body */}
      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait placeholder */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-concrete-200">
            {/* B&W placeholder — soft tonal block with grain */}
            <div className="absolute inset-0 bg-gradient-to-br from-concrete-300 via-concrete-400 to-concrete-700" />
            <div className="absolute inset-0 concrete-grain opacity-40 mix-blend-multiply" />
            <div className="absolute inset-0 flex items-center justify-center text-concrete-100/40">
              <svg viewBox="0 0 100 120" className="h-1/2 w-auto" fill="none" stroke="currentColor" strokeWidth="0.6">
                <circle cx="50" cy="42" r="18" />
                <path d="M14 118 C 14 88, 30 74, 50 74 C 70 74, 86 88, 86 118" />
              </svg>
            </div>
            {/* Caption tag */}
            <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-concrete-100/30 bg-concrete-900/30 px-4 py-3 backdrop-blur-sm">
              <span className="font-sans text-[9px] uppercase tracking-gallery text-concrete-50">
                Portrait, 2024
              </span>
              <span className="font-serif italic text-[11px] text-concrete-100/80">
                gelatin silver print
              </span>
            </figcaption>
          </div>

          <div className="mt-4 flex items-baseline justify-between text-[10px] uppercase tracking-gallery text-concrete-500">
            <span>Plate I</span>
            <span>이윤미 / Lee Yun-mi</span>
          </div>
        </motion.figure>

        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-7 lg:pt-6"
        >
          <p className="font-serif text-lg sm:text-xl leading-[1.85] text-concrete-800 text-balance">
            이 공간은 빛을 따라 만들어졌습니다. 천창을 통과한 햇살이 콘크리트 벽면에 도달하기까지의
            짧은 여정을, 작가는 작품이 관람객에게 다가가는 시간에 빗대었습니다. 관람객은 이곳에서
            서두르지 않으셔도 좋습니다.
          </p>

          <p className="mt-8 font-serif text-base leading-[1.85] text-concrete-700">
            전시는 다섯 개의 방으로 구성되어 있습니다. 각각의 방은 독립된 작품을 위한 자리이지만,
            동시에 하나의 호흡으로 이어지도록 의도되었습니다. 정해진 순서를 따르실 필요는 없습니다.
            마음이 머무는 곳에서 머무르시면 됩니다.
          </p>

          <p className="mt-8 font-serif italic text-base leading-[1.85] text-concrete-500">
            “The room does not ask the visitor to look. It only asks them to stay.”
          </p>

          {/* Meta strip */}
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-concrete-200 pt-8 font-sans text-xs sm:grid-cols-3">
            <div>
              <dt className="text-[10px] uppercase tracking-gallery text-concrete-500">Based in</dt>
              <dd className="mt-2 text-concrete-900">Seoul, KR</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-gallery text-concrete-500">Practice</dt>
              <dd className="mt-2 text-concrete-900">Spatial &amp; Type</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-gallery text-concrete-500">Years</dt>
              <dd className="mt-2 text-concrete-900">2018 — 2026</dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
