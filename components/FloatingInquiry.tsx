"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const KAKAO_URL = "https://open.kakao.com/o/gUBbgRsi";

/**
 * Floating "INQUIRY ↗" pill — fixed bottom-right, every page except
 * /inquiry (which has its own large CTA). Fades in 1.5 s after mount
 * so the Oculus / chapter title reads first. Mounted once in the
 * root layout.
 */
export default function FloatingInquiry() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(id);
  }, []);

  if (pathname.startsWith("/inquiry")) return null;

  return (
    <a
      href={KAKAO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open KakaoTalk inquiry chat"
      title="카카오톡으로 문의하기"
      data-cursor="view"
      className={`group/inq fixed bottom-5 right-5 z-40 inline-flex h-11 min-w-[110px] items-center justify-center gap-2 rounded border border-white/15 bg-[#0F0F0E] px-5 font-serif text-sm text-[#F5F0E8] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-[opacity,transform,background-color,border-color] duration-500 hover:border-white/25 hover:bg-[#1A1A18] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F0E8]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:bottom-8 sm:right-8 sm:h-12 sm:min-w-[130px] sm:text-base ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span className="tracking-[0.12em]">INQUIRY</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover/inq:-translate-y-[2px] group-hover/inq:translate-x-[2px]"
      >
        ↗
      </span>
    </a>
  );
}
