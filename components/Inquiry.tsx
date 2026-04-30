"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  "회사·브랜드 홈페이지",
  "제품·서비스 랜딩페이지",
  "포트폴리오 사이트",
  "모바일 반응형 웹",
  "그 외 의뢰인이 상상하시는 웹",
];

const process: Array<[string, string, string]> = [
  [
    "I.",
    "먼저 충분히 듣습니다",
    "어떤 분이신지, 어떤 사업을 하시는지, 무엇을 만들고 싶으신지 들려주세요. 채팅도 좋고, 편하시면 미팅도 좋습니다.",
  ],
  [
    "II.",
    "견적과 일정을 정성껏 안내드립니다",
    "처음 말씀드린 금액에서 추가되는 비용은 없습니다.",
  ],
  [
    "III.",
    "초안을 함께 보며 의견을 나눕니다",
    "생각하신 방향과 다르면 편하게 말씀해 주세요.",
  ],
  [
    "IV.",
    "만족하실 때까지 함께 다듬습니다",
    "납품 후에도 간단한 수정은 언제든 도와드립니다.",
  ],
];

const promises = [
  "의뢰인의 이야기를 끝까지 듣겠습니다",
  "처음 협의한 금액 그대로 진행합니다",
  "약속드린 일정은 반드시 지킵니다",
  "만족하지 못한 결과물은 납품하지 않습니다",
];

// Reusable reveal — fade up, stays in viewport
const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" },
};

export default function Inquiry() {
  return (
    <section
      id="inquiry"
      className="relative bg-canvas px-6 pt-20 sm:px-10 sm:pt-32 lg:px-16"
    >
      <div className="mx-auto max-w-gallery">
        {/* Chapter mark */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.9 }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          <span>III.</span>
          <span className="block h-px w-12 bg-concrete-300" />
          <span>The Inquiry</span>
        </motion.div>

        {/* Title + subtitle */}
        <motion.h1
          {...reveal}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 font-serif text-5xl font-light leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
        >
          문의
        </motion.h1>
        <motion.p
          {...reveal}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="mt-5 font-serif italic text-lg text-concrete-500 sm:text-xl"
        >
          Where every project begins.
        </motion.p>
      </div>

      {/* Two-column body */}
      <div className="mx-auto mt-20 grid max-w-gallery grid-cols-1 gap-12 sm:mt-28 lg:grid-cols-12 lg:gap-16">
        {/* Left: inquiry placeholder — two chairs at a small table, the seat for a conversation */}
        <motion.figure
          {...reveal}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-concrete-200">
            <div className="absolute inset-0 bg-gradient-to-br from-concrete-300 via-concrete-400 to-concrete-700" />
            <div className="absolute inset-0 concrete-grain opacity-40 mix-blend-multiply" />
            <div className="absolute inset-0 flex items-center justify-center text-concrete-100/40">
              <svg
                viewBox="0 0 100 120"
                className="h-3/5 w-auto"
                fill="none"
                stroke="currentColor"
              >
                {/* Soft horizontal beams — a calm, lit room */}
                <line x1="14" y1="34" x2="86" y2="34" strokeWidth="0.3" strokeOpacity="0.3" />
                <line x1="14" y1="48" x2="86" y2="48" strokeWidth="0.3" strokeOpacity="0.3" />
                <line x1="14" y1="62" x2="86" y2="62" strokeWidth="0.3" strokeOpacity="0.3" />

                {/* Floor line */}
                <line x1="6" y1="106" x2="94" y2="106" strokeWidth="0.6" />

                {/* Left chair (side view, facing right) */}
                <line x1="22" y1="72" x2="22" y2="92" strokeWidth="0.7" />
                <line x1="22" y1="92" x2="36" y2="92" strokeWidth="0.7" />
                <line x1="22" y1="92" x2="22" y2="106" strokeWidth="0.45" />
                <line x1="36" y1="92" x2="36" y2="106" strokeWidth="0.45" />

                {/* Right chair (mirrored, facing left) */}
                <line x1="78" y1="72" x2="78" y2="92" strokeWidth="0.7" />
                <line x1="78" y1="92" x2="64" y2="92" strokeWidth="0.7" />
                <line x1="78" y1="92" x2="78" y2="106" strokeWidth="0.45" />
                <line x1="64" y1="92" x2="64" y2="106" strokeWidth="0.45" />

                {/* Small table between */}
                <line x1="42" y1="90" x2="58" y2="90" strokeWidth="0.5" />
                <line x1="44" y1="90" x2="44" y2="100" strokeWidth="0.3" />
                <line x1="56" y1="90" x2="56" y2="100" strokeWidth="0.3" />
              </svg>
            </div>
            <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-concrete-100/30 bg-concrete-900/30 px-4 py-3 backdrop-blur-sm">
              <span className="font-sans text-[9px] uppercase tracking-gallery text-concrete-50">
                Conversation, 2026
              </span>
              <span className="font-serif italic text-[11px] text-concrete-100/80">
                open invitation
              </span>
            </figcaption>
          </div>

          <div className="mt-4 flex items-baseline justify-between text-[10px] uppercase tracking-gallery text-concrete-500">
            <span>Plate III</span>
            <span>윤은미 / Yoon Eun-mi</span>
          </div>
        </motion.figure>

        {/* Right: body */}
        <motion.div
          {...reveal}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-7 lg:pt-2"
        >
          {/* Greeting */}
          <p className="font-serif text-2xl text-ink leading-tight sm:text-3xl">
            안녕하세요, 윤은미입니다.
          </p>

          {/* Lead */}
          <div className="mt-8 space-y-6 font-serif text-lg leading-[1.85] text-concrete-800 text-balance sm:text-xl">
            <p>
              머릿속에만 있던 것을 화면 위에 옮기는 일을 합니다. 의뢰인이
              &ldquo;이런 게 있으면 좋겠다&rdquo;고 상상하시는 그 모습 그대로,
              혹은 그보다 더 좋은 모습으로 만들어드리는 것이 제 일입니다.
            </p>
            <p>
              웹사이트는 단순한 도구가 아니라 의뢰인의 생각과 사업과 이야기를
              담는 그릇이라고 생각합니다. 그래서 한 분 한 분께 시간을 충분히
              들입니다.
            </p>
          </div>

          {/* Section · Services */}
          <SectionBlock title="해드리는 일" subtitle="Services">
            <ul className="space-y-3 font-serif text-base leading-relaxed text-concrete-800 sm:text-lg">
              {services.map((s) => (
                <li key={s} className="flex gap-4">
                  <span aria-hidden className="text-concrete-400">·</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </SectionBlock>

          {/* Section · Process */}
          <SectionBlock title="진행 과정" subtitle="Process">
            <ol className="space-y-8">
              {process.map(([n, h, b]) => (
                <li
                  key={n}
                  className="grid grid-cols-[3rem_1fr] gap-x-4 sm:grid-cols-[3.5rem_1fr]"
                >
                  <div className="font-serif text-base text-concrete-400 sm:text-lg">
                    {n}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-ink leading-snug sm:text-xl">
                      {h}
                    </h3>
                    <p className="mt-2 font-serif text-base leading-[1.75] text-concrete-700 sm:text-[17px]">
                      {b}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionBlock>

          {/* Section · Four Promises */}
          <SectionBlock title="약속드리는 것" subtitle="Four Promises">
            <ul className="space-y-3 font-serif text-base leading-relaxed text-concrete-800 sm:text-lg">
              {promises.map((p) => (
                <li key={p} className="flex gap-4">
                  <span aria-hidden className="text-concrete-400">—</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </SectionBlock>

          {/* Closing */}
          <div className="mt-16 border-t border-concrete-200 pt-12">
            <p className="font-serif text-lg leading-[1.85] text-concrete-800 sm:text-xl">
              연구자이자 창작자로 살아가고 있습니다. 웹은 지금 다루는 매체 중
              하나이며, 한 작품을 만들 듯 정성을 다해 작업합니다.
            </p>
            <p className="mt-6 font-serif text-lg leading-[1.85] text-concrete-800 sm:text-xl">
              편하게 채팅 주세요. 어떤 작은 질문이라도 정성껏 답변드리겠습니다.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16">
            {/*
              The CTA opens the user's mail client. Swap to a KakaoTalk
              open-chat URL or an Instagram DM link by changing href below.
              e.g. href="https://open.kakao.com/o/abc123"
                   href="https://instagram.com/yourhandle"
            */}
            <a
              href="mailto:hello@projectyoon.com?subject=%5BInquiry%5D%20%EB%AC%B8%EC%9D%98"
              data-cursor="view"
              className="group inline-flex items-baseline gap-4 border-b border-ink/30 pb-3 font-serif text-3xl text-ink transition-colors hover:border-ink sm:text-4xl"
            >
              <span>Start a Conversation</span>
              <span
                aria-hidden
                className="font-sans text-base tracking-gallery transition-transform group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
            <p className="mt-3 font-serif italic text-base text-concrete-500">
              대화 시작하기
            </p>
          </div>
        </motion.div>
      </div>

      {/* Continue-to nav */}
      <div className="mx-auto mt-32 max-w-gallery border-t border-concrete-200 pt-12 pb-32 sm:mt-40">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Link href="/works" data-cursor="view" className="group">
            <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
              ↗ Continue to
            </span>
            <div className="mt-3 font-serif text-2xl text-ink transition-[letter-spacing] duration-500 group-hover:tracking-wide sm:text-3xl">
              작품 둘러보기
            </div>
            <div className="mt-1 font-serif italic text-sm text-concrete-500">
              The Galleries
            </div>
          </Link>
          <Link href="/about" data-cursor="view" className="group sm:text-right">
            <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
              ↗ Continue to
            </span>
            <div className="mt-3 font-serif text-2xl text-ink transition-[letter-spacing] duration-500 group-hover:tracking-wide sm:text-3xl">
              작가 소개
            </div>
            <div className="mt-1 font-serif italic text-sm text-concrete-500">
              The Artist
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionBlock({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-16 border-t border-concrete-200 pt-12">
      <div className="flex items-baseline gap-4">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">{title}</h2>
        <span className="font-serif italic text-base text-concrete-500 sm:text-lg">
          / {subtitle}
        </span>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
