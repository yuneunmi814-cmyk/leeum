"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { works, type Work } from "@/data/works";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/**
 * Home #collection — "작품 둘러보기".
 *
 * Apple-style horizontal swipe slider: thumbnails only, snap-x mandatory,
 * native trackpad/touch gesture, mouse-wheel translated to horizontal,
 * arrow keys for keyboard nav, hidden scrollbar, edge fade masks that
 * hide themselves at the rail's start/end.
 */
export default function CollectionChapter() {
  return (
    <section
      id="collection"
      className="relative scroll-mt-20 py-24 sm:py-32 lg:py-40"
    >
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-gallery">
          <div className="flex items-center gap-4 font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            <span>II.</span>
            <span aria-hidden className="block h-px w-12 bg-concrete-300" />
            <span>Collection 01</span>
          </div>

          <div className="mt-12 sm:mt-16">
            <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Where the Light Stays
              <span className="text-concrete-300">.</span>
            </h2>
            <p className="mt-6 font-serif text-lg italic text-concrete-500 sm:text-xl">
              빛이 머무는 공간
            </p>
            <p className="mt-10 max-w-xl font-serif text-base leading-[1.85] text-concrete-700 sm:text-lg">
              네 개의 작품, 하나의 빛.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-gallery">
        <Slider />
      </div>

      <div className="px-6 sm:px-10 lg:px-16">
        <div className="mx-auto mt-16 max-w-gallery sm:mt-20">
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
        </div>
      </div>
    </section>
  );
}

function Slider() {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Read latest boundary state from inside the wheel handler without
  // re-subscribing. Avoids tearing down and re-binding `wheel` on every
  // scroll tick.
  const edgeRef = useRef({ atStart: true, atEnd: false });
  edgeRef.current = { atStart, atEnd };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const update = () => {
      const start = el.scrollLeft <= 4;
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setAtStart(start);
      setAtEnd(end);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Vertical wheel → horizontal scroll, but step out of the way at the
    // boundary in the natural direction so the page can take over.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const goingForward = e.deltaY > 0;
      const { atStart: s, atEnd: en } = edgeRef.current;
      if ((goingForward && en) || (!goingForward && s)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  const onKey: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : 320;
    e.preventDefault();
    el.scrollBy({
      left: e.key === "ArrowRight" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-16 sm:mt-20">
      <div
        ref={railRef}
        role="region"
        aria-label="작품 둘러보기 슬라이더"
        tabIndex={0}
        onKeyDown={onKey}
        className="no-scrollbar flex snap-x snap-mandatory items-start gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-4 pl-6 pr-12 sm:gap-6 sm:pl-10 sm:pr-16 lg:pl-16 lg:pr-24 focus-visible:outline-none"
      >
        {works.map((work, i) => (
          <SlideCard key={work.id} work={work} index={i} />
        ))}
        <EndPlaceholder />
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-canvas to-transparent transition-opacity duration-300 sm:w-16 ${
          atStart ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-canvas to-transparent transition-opacity duration-300 sm:w-16 ${
          atEnd ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

function SlideCard({ work, index }: { work: Work; index: number }) {
  const [imgSrc, setImgSrc] = useState(work.thumbnail);
  // Works with a live URL open externally; the rest (Oculus, app pieces
  // like NyangTalk) link to their internal detail page.
  const isExternal = Boolean(work.links.live) && work.id !== "oculus";
  const href = isExternal
    ? (work.links.live as string)
    : `/works/${work.id}`;
  const roman = ROMAN[index] ?? `${index + 1}`;

  const inner = (
    <>
      <div className="relative aspect-[4/3] w-[240px] overflow-hidden bg-concrete-200 sm:w-[320px] lg:w-[380px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={`${work.titleKo} — ${work.title}`}
          onError={() => {
            const fallback = `/works/${work.id}/placeholder.svg`;
            if (imgSrc !== fallback) setImgSrc(fallback);
          }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:group-hover/card:scale-[1.02]"
          style={{ objectPosition: work.layout.objectPosition ?? "center" }}
          loading="lazy"
          decoding="async"
        />
        <div
          className="pointer-events-none absolute inset-0 concrete-grain opacity-25 mix-blend-multiply"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10 transition-colors duration-500 group-hover/card:ring-ink/25"
          aria-hidden
        />
        {work.isProposal && (
          <span
            aria-hidden
            className="pointer-events-none absolute right-3 top-3 font-sans text-[11px] uppercase tracking-[0.18em] text-[#9B968E] opacity-100 transition-opacity duration-300 group-hover/card:opacity-0"
          >
            Proposal · {work.year}
          </span>
        )}
        <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 bg-ink/85 px-2.5 py-1 font-sans text-[10px] uppercase tracking-gallery text-canvas opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/card:opacity-100">
          <span>View</span>
          <span aria-hidden>↗</span>
        </span>
      </div>
      <div className="mt-4 font-sans text-[14px] uppercase tracking-[0.12em] text-ink sm:text-[16px]">
        {work.title.toUpperCase()}
        <span className="mx-2 text-concrete-400">·</span>
        {work.isProposal ? (
          <span className="text-concrete-500">Proposal, {work.year}</span>
        ) : (
          <>Plate {roman}, {work.year}</>
        )}
      </div>
    </>
  );

  const sharedClass =
    "group/card block shrink-0 snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40";

  if (isExternal) {
    return (
      <a
        data-card
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="view"
        aria-label={`Open ${work.title} (${work.titleKo}) in a new tab`}
        className={sharedClass}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      data-card
      href={href}
      data-cursor="view"
      aria-label={`Open detail page for ${work.titleKo} (${work.title})`}
      className={sharedClass}
    >
      {inner}
    </Link>
  );
}

function EndPlaceholder() {
  return (
    <div data-card className="flex shrink-0 snap-start flex-col" aria-hidden>
      <div className="relative flex aspect-[4/3] w-[240px] items-center justify-center border border-dashed border-concrete-300 bg-canvas sm:w-[320px] lg:w-[380px]">
        <div className="px-6 text-center">
          <p className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            Next Collection
          </p>
          <p className="mt-3 font-serif text-base italic text-concrete-700 sm:text-lg">
            다음 작품을 기다려 주세요.
          </p>
        </div>
      </div>
      <div className="mt-4 font-sans text-[14px] uppercase tracking-[0.12em] text-concrete-400 sm:text-[16px]">
        Coming Soon
      </div>
    </div>
  );
}
