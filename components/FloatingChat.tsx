"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const KAKAO_URL = "https://open.kakao.com/o/gUBbgRsi";

/**
 * KakaoTalk speech-bubble silhouette, recoloured to the gallery ink.
 * Swap this SVG to change the icon without touching the wrapper below.
 */
const ChatBubbleIcon = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="h-full w-full"
  >
    <path
      d="M16 4C8.268 4 2 8.91 2 14.967c0 3.92 2.628 7.357 6.563 9.286-.29.973-1.05 3.523-1.2 4.073-.187.683.25.674.524.49.215-.144 3.42-2.32 4.802-3.258 1.058.156 2.15.24 3.31.24 7.732 0 14-4.91 14-10.967S23.732 4 16 4z"
      fill="#0F0F0E"
    />
  </svg>
);

/**
 * Floating chat-bubble — fixed bottom-right, every page except
 * /inquiry. Mounts in the root layout. Fades in 1.5 s after mount so
 * the entrance scene reads first.
 */
export default function FloatingChat() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(id);
  }, []);

  if (pathname.startsWith("/inquiry")) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 transition-[opacity,transform] duration-700 ease-out sm:bottom-8 sm:right-8 ${
        visible
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-90 opacity-0"
      }`}
    >
      <a
        href={KAKAO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 오픈채팅으로 문의하기"
        title="Open KakaoTalk inquiry"
        data-cursor="view"
        className="inline-flex h-[52px] w-[52px] items-center justify-center [filter:drop-shadow(0_4px_16px_rgba(0,0,0,0.15))] transition-[filter,transform] duration-300 ease-out hover:-translate-y-[2px] hover:scale-[1.08] hover:[filter:drop-shadow(0_10px_24px_rgba(0,0,0,0.25))] active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:h-14 sm:w-14"
      >
        <ChatBubbleIcon />
      </a>
    </div>
  );
}
