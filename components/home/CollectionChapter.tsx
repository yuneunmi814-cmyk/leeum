"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { firstSentence, works, type Work } from "@/data/works";

/**
 * Home #collection — "작품 둘러보기".
 *
 * Vertical scroll inside this section drives a horizontal pan across
 * an editorial track of panels: intro → each work → CTA. The section
 * is intentionally tall (sticky stage inside) so the pan reads as a
 * deliberate walk down a gallery wall, not a snap carousel.
 */
export default function CollectionChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  // Measure the track's overflow so the pan ends exactly when the last
  // panel reaches the right edge — works for any number of works.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Soften the wheel into a continuous glide.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  const x = useTransform(smooth, [0, 1], [0, -travel]);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative scroll-mt-20 h-[280vh] sm:h-[320vh] lg:h-[360vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-canvas">
        <ChapterMark />

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex shrink-0 items-center gap-10 pl-[6vw] pr-[10vw] will-change-transform sm:gap-14 lg:gap-20"
        >
          <IntroPanel />
          {works.map((work, i) => (
            <WorkPanel key={work.id} work={work} index={i} />
          ))}
          <CTAPanel />
        </motion.div>

        <ProgressBar progress={smooth} />
      </div>
    </section>
  );
}

function ChapterMark() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-10 sm:px-10 sm:pt-14 lg:px-16 lg:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="mx-auto flex max-w-gallery items-center gap-4 font-sans text-[10px] uppercase tracking-gallery text-concrete-500"
      >
        <span>III.</span>
        <span aria-hidden className="block h-px w-12 bg-concrete-300" />
        <span>Collection 01 · 작품 둘러보기</span>
      </motion.div>
    </div>
  );
}

function IntroPanel() {
  return (
    <div className="flex h-[78vh] w-[88vw] max-w-[920px] shrink-0 flex-col justify-center pr-8 sm:pr-16 lg:pr-24">
      <p className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
        Where the Light Stays
      </p>
      <h2 className="mt-6 font-serif text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
        빛이 머무는 공간
        <span className="text-concrete-300">.</span>
      </h2>
      <p className="mt-6 font-serif text-base italic text-concrete-500 sm:text-lg lg:text-xl">
        A horizontal walk down the wall.
      </p>
      <p className="mt-10 max-w-md font-serif text-base leading-[1.85] text-concrete-700 sm:text-lg">
        두 개의 작품, 하나의 빛. 옆으로 스크롤하며
        <br />한 점씩 마주합니다.
      </p>
      <div className="mt-12 flex items-center gap-3 font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
        <span aria-hidden className="block h-px w-10 bg-concrete-400" />
        <span>스크롤하여 둘러보기</span>
        <span aria-hidden className="text-concrete-400">↔</span>
      </div>
    </div>
  );
}

function WorkPanel({ work, index }: { work: Work; index: number }) {
  const [imgSrc, setImgSrc] = useState(work.thumbnail);
  const previewLine = firstSentence(work.description);

  return (
    <article className="group flex h-[78vh] w-[88vw] max-w-[1200px] shrink-0 flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-16">
      <div className="relative h-[55%] w-full overflow-hidden bg-concrete-200 lg:h-full lg:w-[58%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={`${work.titleKo} — ${work.title}`}
          onError={() => {
            const fallback = `/works/${work.id}/placeholder.svg`;
            if (imgSrc !== fallback) setImgSrc(fallback);
          }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.03]"
          style={{ objectPosition: work.layout.objectPosition ?? "center" }}
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 concrete-grain opacity-25 mix-blend-multiply"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10"
          aria-hidden
        />
        <div className="absolute left-4 top-4 font-sans text-[10px] uppercase tracking-gallery text-canvas mix-blend-difference">
          № {String(index + 1).padStart(2, "0")}
        </div>
        {work.links.live && (
          <a
            href={work.links.live}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            aria-label={`Open the live ${work.title} site in a new tab`}
            className="absolute right-4 top-4 inline-flex items-center gap-1.5 bg-ink/85 px-3 py-1.5 font-sans text-[10px] uppercase tracking-gallery text-canvas backdrop-blur-sm transition-colors hover:bg-ink"
          >
            <span>Live</span>
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-baseline gap-3 font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
          <span>{work.year}</span>
          <span aria-hidden className="block h-px w-8 bg-concrete-300" />
          <span>{work.tags[0]}</span>
        </div>
        <h3 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-5xl lg:text-6xl">
          {work.titleKo}
        </h3>
        <p className="mt-2 font-serif italic text-lg text-concrete-500 sm:text-xl lg:text-2xl">
          {work.title}
        </p>
        <p className="mt-6 max-w-md font-sans text-xs leading-relaxed text-concrete-700">
          {work.medium}
        </p>
        <p className="mt-6 max-w-md font-serif text-[15px] leading-[1.8] text-concrete-700 lg:text-base">
          {previewLine}
        </p>
        <div className="mt-8">
          <Link
            href={`/works/${work.id}`}
            data-cursor="view"
            aria-label={`Open detail page for ${work.titleKo} (${work.title})`}
            className="group/link inline-flex items-baseline gap-3 border-b border-ink/30 pb-1 font-sans text-xs uppercase tracking-gallery text-ink transition-colors hover:border-ink"
          >
            <span>작품 자세히 보기</span>
            <span
              aria-hidden
              className="text-sm transition-transform duration-300 group-hover/link:translate-x-1"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function CTAPanel() {
  return (
    <div className="flex h-[78vh] w-[78vw] max-w-[720px] shrink-0 flex-col justify-center pr-6">
      <p className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
        Continue
      </p>
      <h3 className="mt-6 font-serif text-3xl font-light leading-[1.15] text-balance text-ink sm:text-4xl lg:text-5xl">
        전체 컬렉션을
        <br />
        이어서 둘러보기
      </h3>
      <p className="mt-6 max-w-sm font-serif text-base leading-[1.85] text-concrete-700">
        나머지 작품들은 컬렉션 페이지에서 만나보실 수 있습니다.
      </p>
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/works"
          data-cursor="view"
          className="group inline-flex items-baseline gap-3 border-b border-ink/30 pb-1 font-sans text-xs uppercase tracking-gallery text-ink transition-colors hover:border-ink"
        >
          <span>전체 컬렉션 보기</span>
          <span
            aria-hidden
            className="text-sm transition-transform duration-300 group-hover:translate-x-1"
          >
            ↗
          </span>
        </Link>
        <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-400">
          계속 스크롤 ↓
        </span>
      </div>
    </div>
  );
}

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 px-6 sm:bottom-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-gallery items-center gap-4">
        <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
          작품 둘러보기
        </span>
        <div className="relative h-px flex-1 bg-concrete-300/60">
          <motion.div
            style={{ scaleX: progress }}
            className="absolute inset-y-0 left-0 right-0 origin-left bg-ink"
          />
        </div>
        <span
          aria-hidden
          className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          ↔ 가로
        </span>
      </div>
    </div>
  );
}
