"use client";

import Link from "next/link";
import Chapter from "./Chapter";

/**
 * Home #guest-book — closing chapter. A short invitation to leave a line,
 * a small "hours" plaque, and the site's footer rule below.
 */
export default function GuestChapter() {
  return (
    <>
      <Chapter id="guest-book" number="V." title="The Guest Book">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl font-light leading-[1.2] text-balance text-ink sm:text-4xl lg:text-5xl">
              남기시는 한 줄,
              <span className="block italic text-concrete-500">
                a single line is enough.
              </span>
            </h2>

            <p className="mt-10 max-w-xl font-serif text-lg leading-[1.85] text-balance text-concrete-700 sm:text-xl">
              방을 둘러보신 다음, 한 줄 남겨 주시면 작가에게 전달됩니다.
            </p>

            <div className="mt-12">
              <Link
                href="/guest"
                data-cursor="view"
                className="group inline-flex items-baseline gap-3 border-b border-ink/30 pb-1 font-sans text-xs uppercase tracking-gallery text-ink transition-colors hover:border-ink"
              >
                <span>방명록 남기기</span>
                <span
                  aria-hidden
                  className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>

          {/* Hours plaque — quieter version of the /guest panel */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-concrete-200 bg-canvas/50 p-6 sm:p-7">
              <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                Hours
              </span>
              <div className="mt-2 font-serif text-2xl text-ink">Open 24/7</div>
              <div className="mt-1 font-sans text-[11px] uppercase tracking-gallery text-concrete-500">
                · Online · No closure ·
              </div>
            </div>
          </aside>
        </div>
      </Chapter>

      {/* Site-wide footer rule — closes the scroll exhibition */}
      <div className="border-t border-concrete-200 bg-canvas px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-gallery flex-col gap-3 font-sans text-[10px] uppercase tracking-gallery text-concrete-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Oculus Studio</span>
          <span>Inspired by M1 Rotunda — Mario Botta · Leeum</span>
        </div>
      </div>
    </>
  );
}
