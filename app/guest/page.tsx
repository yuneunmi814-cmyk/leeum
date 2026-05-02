import type { Metadata } from "next";
import Link from "next/link";
import GuestBook from "@/components/GuestBook";

export const metadata: Metadata = {
  title: "Guest Book",
  description:
    "Voices from the gallery — 이 전시를 다녀가신 분들의 한 마디. 당신의 발자국도 더해주세요.",
  openGraph: {
    title: "Guest Book · Project Yoon",
    description: "Voices from the gallery.",
  },
};

const channels: Array<{ label: string; value: string; href: string }> = [
  { label: "Email", value: "studio@oculus.kr", href: "mailto:studio@oculus.kr" },
  {
    label: "GitHub",
    value: "github.com/oculus-studio",
    href: "https://github.com/oculus-studio",
  },
  {
    label: "Instagram",
    value: "@oculus.studio",
    href: "https://instagram.com/oculus.studio",
  },
];

export default function GuestPage() {
  return (
    <main className="relative bg-canvas pt-20">
      <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-gallery">
          {/* Chapter mark */}
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500">
            <span aria-hidden className="block h-px w-12 bg-concrete-300" />
            <span>The Guest Book</span>
          </div>

          {/* Title block */}
          <h1 className="mt-8 font-serif text-4xl font-light leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
            남기시는 한 줄,
            <span className="block italic font-light text-concrete-500">
              a single line is enough.
            </span>
          </h1>

          {/* Two-column body */}
          <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            {/* Left: intro + form + list */}
            <div className="lg:col-span-7">
              <p className="max-w-xl font-serif text-lg leading-[1.85] text-balance text-concrete-700 sm:text-xl">
                방명록은 미술관의 가장 마지막 자리입니다. 방을 둘러본 다음, 한 줄
                남겨 주시면 작가에게 전달됩니다. 답장이 늦더라도, 빛이 늦게
                떨어지는 것이라 생각해 주세요.
              </p>

              <GuestBook variant="full" />
            </div>

            {/* Right: information plaque (Hours / Channels / Location) */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border border-concrete-200 bg-canvas/50 p-7 sm:p-8">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                    Hours
                  </span>
                  <div className="mt-2 font-serif text-2xl text-ink">
                    Open 24/7
                  </div>
                  <div className="mt-1 font-sans text-[11px] uppercase tracking-gallery text-concrete-500">
                    · Online · No closure ·
                  </div>
                </div>

                <div className="mt-8 border-t border-concrete-200 pt-6">
                  <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                    Channels
                  </span>
                  <ul className="mt-3 space-y-3">
                    {channels.map((c) => (
                      <li key={c.label}>
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            c.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          data-cursor="view"
                          className="group block"
                        >
                          <div className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                            {c.label}
                          </div>
                          <div className="mt-1 flex items-baseline justify-between font-serif text-base text-ink transition-[letter-spacing] duration-300 group-hover:tracking-wide">
                            <span>{c.value}</span>
                            <span
                              aria-hidden
                              className="font-sans text-[10px] tracking-gallery text-concrete-400 transition-transform group-hover:translate-x-1"
                            >
                              ↗
                            </span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-concrete-200 pt-6">
                  <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                    Location
                  </span>
                  <div className="mt-2 font-serif text-base text-ink">
                    Jecheon, Republic of Korea
                  </div>
                  <div className="mt-1 font-sans text-[11px] tracking-wall text-concrete-500">
                    By appointment only
                  </div>
                </div>
              </div>
            </aside>
          </div>

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
