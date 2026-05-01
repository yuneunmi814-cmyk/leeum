import type { Metadata } from "next";
import Link from "next/link";
import Intro from "@/components/Intro";

export const metadata: Metadata = {
  title: "The Artist",
  description:
    "이 공간은 한 사람의 시선이 머무른 자리입니다. 윤은미 — 작가 노트, 그리고 이 공간에 대한 짧은 설명.",
  openGraph: {
    title: "The Artist · Project Yoon",
    description: "한 사람의 시선이 머무른 자리.",
  },
};

export default function AboutPage() {
  return (
    <main className="relative bg-canvas pt-20">
      <Intro />

      {/* Continue-to nav */}
      <div className="mx-auto max-w-gallery border-t border-concrete-200 px-6 pt-12 pb-32 sm:px-10 lg:px-16">
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
          <Link href="/inquiry" data-cursor="view" className="group sm:text-right">
            <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
              ↗ Continue to
            </span>
            <div className="mt-3 font-serif text-2xl text-ink transition-[letter-spacing] duration-500 group-hover:tracking-wide sm:text-3xl">
              문의
            </div>
            <div className="mt-1 font-serif italic text-sm text-concrete-500">
              The Inquiry
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
