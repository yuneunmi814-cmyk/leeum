"use client";

import Link from "next/link";
import Tile from "../Tile";
import { works } from "@/data/works";
import Chapter from "./Chapter";

/** Home #collection — Where the Light Stays preview. */
export default function CollectionChapter() {
  return (
    <Chapter id="collection" number="III." title="Collection 01">
      <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Where the Light Stays
        <span className="text-concrete-300">.</span>
      </h2>
      <p className="mt-6 font-serif text-lg italic text-concrete-500 sm:text-xl">
        빛이 머무는 공간
      </p>
      <p className="mt-10 max-w-xl font-serif text-base leading-[1.85] text-balance text-concrete-700 sm:text-lg">
        두 개의 작품, 하나의 빛.
      </p>

      {/* Asymmetric grid — same Tile component the /works page uses */}
      <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-16 sm:mt-20 md:grid-cols-12 md:gap-y-24 lg:gap-x-10">
        {works.map((work, i) => (
          <Tile key={work.id} work={work} index={i} />
        ))}
      </div>

      <div className="mt-20 sm:mt-28">
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
    </Chapter>
  );
}
