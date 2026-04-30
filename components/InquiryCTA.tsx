"use client";

/**
 * Reusable contact CTA — KakaoTalk Open Chat as the primary, email as a
 * quieter secondary fallback. Used by /inquiry and the home #inquiry chapter.
 */
export default function InquiryCTA() {
  return (
    <div>
      <p className="mt-12 font-sans text-sm leading-relaxed text-concrete-500">
        채팅창에 무엇이든 편하게 적어주세요. 답장은 보통 24시간 안에 드립니다.
      </p>

      <div className="mt-10 sm:mt-12">
        <a
          href="https://open.kakao.com/o/gUBbgRsi"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          className="group inline-flex min-h-12 items-center gap-5 bg-ink px-10 py-5 text-canvas transition-[background-color,gap] duration-300 hover:bg-accent hover:gap-6 sm:px-12 sm:py-6"
        >
          <span className="font-serif text-xl font-light tracking-tight sm:text-2xl">
            Start a Conversation
          </span>
          <span
            aria-hidden
            className="font-sans text-sm tracking-gallery transition-transform duration-300 group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>
        <p className="mt-4 font-serif italic text-base text-concrete-500">
          카카오톡으로 편하게 말씀해 주세요
        </p>
      </div>

      <p className="mt-24 font-sans text-sm text-concrete-500">
        또는 이메일도 좋아요{" "}
        <span aria-hidden className="text-concrete-400">
          →
        </span>{" "}
        <a
          href="mailto:yuneunmi814@gmail.com"
          data-cursor="view"
          className="text-concrete-700 transition-colors duration-300 hover:text-ink"
        >
          yuneunmi814@gmail.com
        </a>
      </p>
    </div>
  );
}
