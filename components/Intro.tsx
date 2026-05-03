"use client";

import { motion } from "framer-motion";

const PROCESS = [
  {
    n: "01",
    label: "듣기",
    en: "Listening",
    body:
      "의뢰자의 문장 너머에 있는 것을 먼저 듣습니다. 무엇을 만들고 싶은지보다, 왜 그것이 필요한지. 어떤 사람이 어떤 시간에 이 화면 앞에 멈춰 서게 될지를 묻습니다.",
  },
  {
    n: "02",
    label: "그리기",
    en: "Drafting",
    body:
      "들은 것을 종이 위에 옮깁니다. 구조와 결, 호흡과 여백 — 화면이 되기 전의 화면을 먼저 그립니다. 빠른 답보다는 맞는 답을 찾는 단계입니다.",
  },
  {
    n: "03",
    label: "만들기",
    en: "Building",
    body:
      "코드로 공간을 짓습니다. 디자인과 구현이 두 사람의 일이 아니라 한 사람의 손에서 끝나는 것이 이 작업실의 전제입니다. 픽셀과 줄바꿈, 폰트의 자간과 로딩의 무게까지.",
  },
  {
    n: "04",
    label: "다듬기",
    en: "Refining",
    body:
      "끝났다고 생각한 자리에서 한 번 더 멈춥니다. 글자 하나, 그림자 한 단계, 모서리 한 도(度). 정성껏 시간을 들이는 일이 결국 가장 빠른 길임을 매번 다시 배웁니다.",
  },
] as const;

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative bg-concrete-50 px-6 py-32 sm:px-10 sm:py-40 lg:px-16"
    >
      {/* Section header */}
      <div className="mx-auto max-w-gallery">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          <span aria-hidden className="block h-px w-12 bg-concrete-300" />
          <span>Curator&rsquo;s Note · The Artist</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 max-w-3xl font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.25] tracking-tight text-balance text-concrete-900"
        >
          저는 정성껏 시간을 들이는 사람입니다.
          <span className="block mt-2 text-concrete-500 italic font-light">
            A practice of taking time, on purpose.
          </span>
        </motion.h2>
      </div>

      {/* Curator's note — who is Yoon Eun-mi */}
      <div className="mx-auto mt-20 grid max-w-gallery grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait placeholder column */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-concrete-200">
            <div className="absolute inset-0 bg-gradient-to-br from-concrete-300 via-concrete-400 to-concrete-700" />
            <div className="absolute inset-0 concrete-grain opacity-40 mix-blend-multiply" />
            <div className="absolute inset-0 flex items-center justify-center text-concrete-100/40">
              <svg
                viewBox="0 0 100 120"
                className="h-1/2 w-auto"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              >
                <circle cx="50" cy="42" r="18" />
                <path d="M14 118 C 14 88, 30 74, 50 74 C 70 74, 86 88, 86 118" />
              </svg>
            </div>
            <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-concrete-100/30 bg-concrete-900/30 px-4 py-3 backdrop-blur-sm">
              <span className="font-sans text-[9px] uppercase tracking-gallery text-concrete-50">
                Portrait, 2026
              </span>
              <span className="font-serif italic text-[11px] text-concrete-100/80">
                gelatin silver print
              </span>
            </figcaption>
          </div>

          <div className="mt-4 flex items-baseline justify-between text-[10px] uppercase tracking-gallery text-concrete-500">
            <span>Plate I</span>
            <span>윤은미 / Yoon Eun-mi</span>
          </div>
        </motion.figure>

        {/* Statement column — 큐레이터 노트 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-7 lg:pt-6"
        >
          <p className="font-serif italic text-lg sm:text-xl leading-[1.85] text-concrete-500 text-balance">
            “The room does not ask the visitor to look. It only asks them to stay.”
          </p>

          {/* Meta strip */}
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-concrete-200 pt-8 font-sans text-xs sm:grid-cols-3">
            <div>
              <dt className="text-[10px] uppercase tracking-gallery text-concrete-500">
                Based in
              </dt>
              <dd className="mt-2 text-concrete-900">Jecheon, KR</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-gallery text-concrete-500">
                Practice
              </dt>
              <dd className="mt-2 text-concrete-900">Research · Design · Code</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-gallery text-concrete-500">
                Years
              </dt>
              <dd className="mt-2 text-concrete-900">2018 — 2026</dd>
            </div>
          </dl>
        </motion.div>
      </div>

      {/* Process — four steps */}
      <div className="mx-auto mt-32 max-w-gallery sm:mt-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          <span aria-hidden className="block h-px w-12 bg-concrete-300" />
          <span>Process · 작업의 순서</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 max-w-3xl font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.25] tracking-tight text-balance text-concrete-900"
        >
          듣기, 그리기, 만들기, 그리고 다듬기.
          <span className="block mt-2 font-serif italic text-base sm:text-lg text-concrete-500">
            Listening — Drafting — Building — Refining.
          </span>
        </motion.h3>

        <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:gap-x-16">
          {PROCESS.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 1.0,
                delay: 0.05 + i * 0.05,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="border-t border-concrete-200 pt-6"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-400">
                  {p.n}
                </span>
                <span className="font-serif text-2xl text-ink">{p.label}</span>
                <span className="font-serif italic text-sm text-concrete-500">
                  {p.en}
                </span>
              </div>
              <p className="mt-4 max-w-md font-serif text-base leading-[1.85] text-concrete-700 text-balance">
                {p.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Who I want to work with */}
      <div className="mx-auto mt-32 max-w-gallery sm:mt-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          <span aria-hidden className="block h-px w-12 bg-concrete-300" />
          <span>Whom I&rsquo;d Like to Meet</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 max-w-3xl font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.25] tracking-tight text-balance text-concrete-900"
        >
          시간이 들어간 화면을 알아보는 분들과 일하고 싶습니다.
        </motion.h3>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:col-span-7"
          >
            <p className="font-serif text-base sm:text-lg leading-[1.85] text-concrete-700 text-balance">
              빠르게 찍어내는 사이트가 필요하신 분이라면 더 좋은 선택지가 많습니다.
              저는 한 줄 카피의 자간, 첫 화면의 호흡, 보내기 버튼이 눌렸을 때의
              여운까지 — 결국 한 사람의 시간을 다정히 들여다보아야 풀리는 작업을
              조금 더 잘 합니다.
            </p>
            <p className="mt-6 font-serif text-base sm:text-lg leading-[1.85] text-concrete-700 text-balance">
              브랜드의 톤이 단단한 분, 자기 일을 오래 사랑해 오신 분, 작은
              디테일이 결국 신뢰가 된다는 것을 아는 분 — 그런 의뢰자와 함께한
              작업이 가장 멀리 갑니다.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:col-span-4 lg:col-start-9"
          >
            <div className="border-t border-concrete-200 pt-6">
              <div className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                A good fit
              </div>
              <ul className="mt-4 space-y-3 font-serif text-base leading-[1.7] text-concrete-800">
                <li>· 부티크 브랜드, 의료·뷰티·교육</li>
                <li>· 한 사람을 향한 정중한 화면</li>
                <li>· 다국어, 디테일, 결을 중시하는 곳</li>
                <li>· 정책·공공 부문의 시민 UX</li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* The name */}
      <div className="mx-auto mt-32 max-w-gallery sm:mt-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          <span aria-hidden className="block h-px w-12 bg-concrete-300" />
          <span>The Name · 프로젝트 윤</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 max-w-3xl"
        >
          <p className="font-serif text-xl sm:text-2xl leading-[1.55] text-balance text-concrete-900">
            <span className="text-ink">윤(尹)</span>은 다스리다,{" "}
            <span className="text-ink">윤(潤)</span>은 윤기 나게 하다,{" "}
            <span className="text-ink">윤(允)</span>은 진실하다.
          </p>

          <p className="mt-8 font-serif text-base sm:text-lg leading-[1.85] text-concrete-700 text-balance">
            세 글자 모두 저의 성을 발음하는 음입니다. 한 사람의 일을 다스리고,
            그 일에 윤기를 더하고, 진실되게 옮기는 작업실이고 싶었습니다.
            &lsquo;프로젝트 윤&rsquo;은 그 세 가지 약속의 약자입니다.
          </p>

          <p className="mt-8 font-serif italic text-base sm:text-lg leading-[1.85] text-concrete-500 text-balance">
            한 사람의 시간이 머무는 자리를 만드는 일.
            <span className="not-italic"> </span>그 자리에 빛이 스미면, 그것으로
            됐습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
