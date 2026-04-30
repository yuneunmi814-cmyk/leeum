"use client";

import Link from "next/link";
import Chapter from "./Chapter";

/** Home #the-artist — a compressed reading of /about. */
export default function ArtistChapter() {
  return (
    <Chapter id="the-artist" number="II." title="The Artist">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait silhouette — same gelatin-silver tone as /about */}
        <figure className="lg:col-span-5">
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
                Portrait, 2024
              </span>
              <span className="font-serif italic text-[11px] text-concrete-100/80">
                gelatin silver print
              </span>
            </figcaption>
          </div>
        </figure>

        {/* Pull quote + condensed prose */}
        <div className="lg:col-span-7 lg:pt-2">
          <h2 className="font-serif text-3xl font-light leading-[1.2] text-balance text-ink sm:text-4xl lg:text-5xl">
            이 공간은 한 사람의 시선이
            <br />
            머무른 자리입니다.
          </h2>
          <p className="mt-4 font-serif italic text-base text-concrete-500 sm:text-lg">
            A room arranged around a single gaze.
          </p>

          <p className="mt-10 max-w-xl font-serif text-lg leading-[1.85] text-balance text-concrete-700 sm:text-xl">
            관람객은 이곳에서 서두르지 않으셔도 좋습니다. 빛과 결, 그리고 한
            사람의 결정이 만들어낸 작은 방들이 차례로 이어집니다.
          </p>

          <div className="mt-12">
            <Link
              href="/about"
              data-cursor="view"
              className="group inline-flex items-baseline gap-3 border-b border-ink/30 pb-1 font-sans text-xs uppercase tracking-gallery text-ink transition-colors hover:border-ink"
            >
              <span>작가 소개 자세히</span>
              <span
                aria-hidden
                className="text-sm transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
