import type { Metadata } from "next";
import Link from "next/link";
import GuestBook from "@/components/GuestBook";

export const metadata: Metadata = {
  title: "Guest Book — Oculus",
  description:
    "방명록 · 이 전시를 다녀가신 분들의 한 마디. 당신의 발자국도 더해주세요.",
};

export default function GuestPage() {
  return (
    <main className="relative bg-canvas pt-20">
      <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-gallery">
          {/* Chapter mark */}
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500">
            <span>V.</span>
            <span aria-hidden className="block h-px w-12 bg-concrete-300" />
            <span>The Guest Book</span>
          </div>

          {/* Title */}
          <h1 className="mt-8 font-serif text-5xl font-light leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            방명록
          </h1>
          <p className="mt-5 font-serif italic text-lg text-concrete-500 sm:text-xl">
            Voices from the gallery.
          </p>

          {/* Intro */}
          <p className="mt-10 max-w-xl font-serif text-lg leading-[1.85] text-balance text-concrete-700 sm:text-xl">
            이 전시를 다녀가신 분들의 한 마디.
            <br />
            당신의 발자국도 더해주세요.
          </p>

          {/* Form + list (client island) */}
          <GuestBook />

          {/* Bottom return link */}
          <div className="mt-32 border-t border-concrete-200 pt-12 sm:mt-40">
            <Link
              href="/"
              data-cursor="view"
              className="group inline-flex items-baseline gap-3 border-b border-ink/30 pb-1 font-sans text-xs uppercase tracking-gallery text-ink transition-colors hover:border-ink"
            >
              <span>메인으로 돌아가기</span>
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
    </main>
  );
}
