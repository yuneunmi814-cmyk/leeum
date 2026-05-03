"use client";

import Link from "next/link";
import InquiryCTA from "../InquiryCTA";
import Chapter from "./Chapter";

/** Home #inquiry — compressed lead from /inquiry plus the same CTA. */
export default function InquiryChapter() {
  return (
    <Chapter id="inquiry" number="III." title="The Inquiry">
      <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
        문의
      </h2>
      <p className="mt-5 font-serif italic text-lg text-concrete-500 sm:text-xl">
        Where every project begins.
      </p>

      <div className="mt-12 max-w-2xl space-y-6 font-serif text-lg leading-[1.85] text-balance text-concrete-800 sm:text-xl">
        <p>
          머릿속에만 있던 것을 화면 위에 옮기는 일을 합니다. 의뢰인이
          &ldquo;이런 게 있으면 좋겠다&rdquo;고 상상하시는 그 모습 그대로,
          혹은 그보다 더 좋은 모습으로 만들어드리는 것이 제 일입니다.
        </p>
        <p>
          웹사이트는 단순한 도구가 아니라 의뢰인의 생각과 사업과 이야기를 담는
          그릇이라고 생각합니다.
        </p>
      </div>

      <InquiryCTA />

      <div className="mt-16">
        <Link
          href="/inquiry"
          data-cursor="view"
          className="group inline-flex items-baseline gap-3 border-b border-ink/30 pb-1 font-sans text-xs uppercase tracking-gallery text-ink transition-colors hover:border-ink"
        >
          <span>자세한 작업 안내</span>
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
