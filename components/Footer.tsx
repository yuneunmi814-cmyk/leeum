import Link from "next/link";

const contact: Array<{ label: string; value: string; href: string }> = [
  { label: "Email", value: "yuneunmi814@gmail.com", href: "mailto:yuneunmi814@gmail.com" },
  {
    label: "KakaoTalk",
    value: "Open chat",
    href: "https://open.kakao.com/o/gUBbgRsi",
  },
  {
    label: "Location",
    value: "Jecheon, Republic of Korea",
    href: "",
  },
];

const elsewhere: Array<{ label: string; value: string; href: string }> = [
  {
    label: "Instagram",
    value: "@projectyoon.studio",
    href: "https://instagram.com/projectyoon.studio",
  },
  {
    label: "GitHub",
    value: "yuneunmi814-cmyk",
    href: "https://github.com/yuneunmi814-cmyk",
  },
];

/**
 * Site-wide footer. Three columns on desktop, vertical stack on mobile.
 * Mounted in the root layout, so it sits below every page's content.
 */
export default function Footer() {
  return (
    <footer className="mt-32 border-t border-concrete-200 bg-concrete-100/50 px-6 pb-10 pt-20 sm:px-10 sm:pt-24 lg:px-16">
      <div className="mx-auto grid max-w-gallery grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-10 lg:gap-16">
        {/* Left — brand */}
        <div>
          <div className="font-serif text-base tracking-[0.18em] text-ink">
            PROJECT YOON
          </div>
          <p className="mt-3 font-serif italic text-sm text-concrete-500">
            빛이 머무는 자리
          </p>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-gallery text-concrete-500">
            © 2026 윤은미. All works reserved.
          </p>
        </div>

        {/* Middle — contact */}
        <div>
          <div className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            Contact
          </div>
          <ul className="mt-4 space-y-3">
            {contact.map((c) => (
              <li key={c.label}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      c.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    data-cursor="view"
                    className="group inline-flex items-baseline gap-2 font-serif text-sm text-concrete-800 transition-colors hover:text-ink"
                  >
                    <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-400">
                      {c.label}
                    </span>
                    <span>{c.value}</span>
                    <span
                      aria-hidden
                      className="font-sans text-[10px] tracking-gallery text-concrete-400 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                ) : (
                  <div className="inline-flex items-baseline gap-2 font-serif text-sm text-concrete-800">
                    <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-400">
                      {c.label}
                    </span>
                    <span>{c.value}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — elsewhere */}
        <div>
          <div className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            Elsewhere
          </div>
          <ul className="mt-4 space-y-3">
            {elsewhere.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  className="group inline-flex items-baseline gap-2 font-serif text-sm text-concrete-800 transition-colors hover:text-ink"
                >
                  <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-400">
                    {c.label}
                  </span>
                  <span>{c.value}</span>
                  <span
                    aria-hidden
                    className="font-sans text-[10px] tracking-gallery text-concrete-400 transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="mx-auto mt-16 max-w-gallery border-t border-concrete-200 pt-6 sm:mt-20">
        <div className="flex flex-col gap-2 font-sans text-[10px] uppercase tracking-gallery text-concrete-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Built with{" "}
            <Link
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-concrete-700 transition-colors hover:text-ink"
            >
              Claude Code
            </Link>
          </span>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
