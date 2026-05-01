"use client";

import GuestBook from "../GuestBook";
import Chapter from "./Chapter";

/**
 * Home #guest-book — closing chapter. Inline preview form (3 entries
 * deep) with "전체 방명록 보기 ↗" linking off to /guest. Same component
 * as /guest, just `variant="preview"`.
 */
export default function GuestChapter() {
  return (
    <>
      <Chapter id="guest-book" number="V." title="The Guest Book">
        <h2 className="font-serif text-3xl font-light leading-[1.2] text-balance text-ink sm:text-4xl lg:text-5xl">
          남기시는 한 줄,
          <span className="block italic text-concrete-500">
            a single line is enough.
          </span>
        </h2>

        <p className="mt-10 max-w-xl font-serif text-lg leading-[1.85] text-balance text-concrete-700 sm:text-xl">
          방명록은 미술관의 가장 마지막 자리입니다. 방을 둘러보신 다음, 한 줄
          남겨 주세요.
        </p>

        <GuestBook variant="preview" />
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
