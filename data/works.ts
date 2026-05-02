/**
 * Works data — single source of truth for the gallery + detail pages.
 *
 * Note: spec referenced src/data/works.ts; this project uses a flat
 * root layout (app/, components/, data/) so the file lives at
 * data/works.ts. The @/* path alias resolves either way.
 */

export type WorkShape =
  | "circle"
  | "arch"
  | "slab"
  | "grid"
  | "line"
  | "horizon"
  | "rose";

export type WorkLayout = {
  /** col-span at md+ on the 12-column grid */
  span: 12 | 7 | 5 | 4;
  /**
   * Tailwind aspect-ratio class suffix. Wide source images get cropped
   * to portrait shapes deliberately — the asymmetric portrait grid
   * reads more like a curated wall than a screenshot strip. The crop
   * focal point is set per work via `objectPosition` below.
   */
  aspect:
    | "aspect-[1920/875]"
    | "aspect-[4/5]"
    | "aspect-[3/4]"
    | "aspect-square"
    | "aspect-[16/10]"
    | "aspect-[16/9]"
    | "aspect-[5/6]"
    | "aspect-[2/3]";
  /** Optional vertical offset to break the row baseline (md+ only) */
  offset?: "md:mt-12" | "md:mt-20" | "md:mt-24" | "md:mt-32";
  /**
   * CSS object-position for the thumbnail crop. Defaults to "center"
   * when omitted. Use this to choose which slice of a wide source image
   * shows when the container is portrait — e.g. "30% center" shifts
   * the visible window leftward to keep a logo or word-start in frame.
   */
  objectPosition?: string;
};

export type Work = {
  id: string;
  title: string;
  titleKo: string;
  year: string;
  medium: string;
  /** Path to the real thumbnail (falls back to /works/<id>/placeholder.svg in the UI) */
  thumbnail: string;
  /** Additional images for the detail page */
  images: string[];
  /** Long-form curatorial description (multi-paragraph allowed via \n\n) */
  description: string;
  /** Short caption shown in the gallery grid */
  caption: string;
  /** Optional longer subtitle rendered under the title on the detail page */
  subtitle?: string;
  /** Bulleted highlights surfaced on the detail page */
  highlights?: string[];
  /**
   * Optional Before / After tone-study block rendered on the detail page.
   * Used by NyangTalk to narrate the cool-blue → warm-beige redesign.
   */
  toneStudy?: {
    beforeImage: string;
    afterImage: string;
    beforeLabel: string;
    afterLabel: string;
    story: string;
  };
  tags: string[];
  links: Partial<{
    live: string;
    github: string;
    behance: string;
    instagram: string;
    press: string;
  }>;
  /** Generative shape used by the detail-page hero before real images land */
  placeholder: {
    shape: WorkShape;
    palette: [string, string, string];
  };
  layout: WorkLayout;
  /**
   * Marks the work as a concept / proposal piece rather than a shipped
   * production site. The slider replaces the "PLATE N" footer with a
   * "PROPOSAL · YYYY" label so it reads as a different category.
   */
  isProposal?: boolean;
};

export const works: Work[] = [
  {
    id: "oculus",
    title: "Oculus",
    titleKo: "오쿨러스",
    year: "2026",
    medium: "Next.js · TypeScript · Framer Motion",
    thumbnail: "/works/oculus/thumb.jpg",
    images: [
      "/works/oculus/hero.jpg",
      "/works/oculus/detail-01.jpg",
    ],
    caption: "코드로 지어 올린 갤러리 — 빛이 머무는 자리.",
    description:
      "마리오 보타가 설계한 리움미술관 M1관의 로툰다 천창. 그 빛이 쏟아지는 원형 구조를 디지털 공간으로 옮겨왔다. 관람객은 화면 위에서 천창을 올려다보며, 미술관에 들어서듯 작품과 마주한다. 이 사이트 자체가 첫 번째 작품이며, 동시에 다른 작품들이 머무는 전시장이다. 코드로 지은 갤러리 — 빛이 머무는 자리.",
    tags: ["web", "portfolio", "gallery"],
    links: {
      live: "https://projectyoon.com",
      github: "https://github.com/yuneunmi814-cmyk/leeum",
    },
    placeholder: { shape: "grid", palette: ["#E6EDF2", "#B8C9D6", "#5C7180"] },
    // Wider tile, near-square portrait. Center crop holds the radial
    // oculus pattern + the centered "윤은미" name in frame.
    layout: { span: 7, aspect: "aspect-[4/5]" },
  },
  {
    id: "lumi-re",
    title: "Lumi-re",
    titleKo: "뤼미에르",
    year: "2026",
    medium: "Next.js · i18n · 브랜드 디자인",
    thumbnail: "/works/lumi-re/thumb.jpg",
    images: [
      "/works/lumi-re/hero.jpg",
      "/works/lumi-re/detail-01.jpg",
    ],
    caption: "한 사람의 시간을 격으로 채우는 부티크 브랜드.",
    description:
      "프랑스어 '빛(Lumière)'에서 이름을 가져온 프라이빗 안티에이징 클리닉. 시술이 아닌 결을 다듬는 시간을 파는 부티크 브랜드를 디자인했다. 일곱 가지 시그니처 처방의 명명, 한·영·일 다국어 후기 시스템, 단독룸 공간 큐레이션까지 — 한 사람의 시간을 어떻게 격으로 채울지에 대한 종합적 답변. 코드 위에 쌓아 올린 브랜드.",
    tags: ["web", "brand", "medical", "premium"],
    links: {
      live: "https://lumi-re.projectyoon.com",
    },
    placeholder: { shape: "rose", palette: ["#FFE8C9", "#E5A582", "#5C5045"] },
    // Narrower tile, taller portrait, baseline-broken with mt-24.
    // 30% horizontal crop puts the LUMI-RE wordmark + the start of the
    // serif "Antiaging" headline together — brand and typography in one
    // composition.
    layout: {
      span: 5,
      aspect: "aspect-[3/4]",
      offset: "md:mt-24",
      objectPosition: "30% center",
    },
  },
  {
    id: "campus-pass",
    title: "Campus Pass",
    titleKo: "제천 캠퍼스 라이프 패스",
    year: "2026",
    medium: "Policy Design · Civic UX",
    thumbnail: "/works/campus-pass/thumb.jpg",
    images: [
      "/works/campus-pass/thumb.jpg",
      "/works/campus-pass/hero.jpg",
      "/works/campus-pass/detail-01.jpg",
    ],
    caption: "단일 카드로 다섯 영역을 통합하는 청년 정주 정책 제안.",
    description:
      "인구 12만 도시의 청년 정주 문제를 정책 디자인으로 풀어낸 작품. 단일 카드(C 패스)로 다섯 영역의 혜택을 통합하는 시민 UX 설계. 대원대학교 × 제천시 협업 모델 제안.",
    tags: ["policy", "civic", "ux", "concept"],
    isProposal: true,
    links: {
      live: "https://cpass.projectyoon.com",
    },
    placeholder: { shape: "grid", palette: ["#EFEAE0", "#C7BBA4", "#5A5247"] },
    layout: {
      span: 12,
      aspect: "aspect-[16/10]",
      offset: "md:mt-20",
    },
  },
  {
    id: "nyangtalk",
    title: "NyangTalk",
    titleKo: "냥톡",
    year: "2026",
    medium: "iOS App · UX/UI Design · AI",
    thumbnail: "/works/nyangtalk/thumb.jpg",
    images: [
      "/works/nyangtalk/thumb.jpg",
      "/works/nyangtalk/02.jpg",
      "/works/nyangtalk/03.jpg",
      "/works/nyangtalk/04.jpg",
      "/works/nyangtalk/05.jpg",
      "/works/nyangtalk/06.jpg",
    ],
    caption: "고양이의 마음을 읽는 시간.",
    subtitle:
      "고양이 울음소리를 녹음하면 AI가 감정과 의미를 해석해주는 반려묘 커뮤니케이션 앱.",
    description:
      "야옹 한 마디에 담긴 마음을 읽는다. 사용자가 고양이의 울음을 녹음하면 AI가 음성을 분석해 평소·녹음중·분석중·배고픔·관심·만족 — 여섯 가지 감정 상태로 풀어내고, 치즈냥이 캐릭터의 표정과 애니메이션으로 그 결과를 건넨다.\n\n분석 카드는 SNS로 공유할 수 있고, 데일리 알림과 커스텀 멘트가 일상의 결을 따라 흐른다. 차가운 음성 인식 기술 위에 반려동물과 보호자 사이의 따뜻한 대화 한 조각을 얹은 작업.",
    highlights: [
      "음성 녹음 → AI 분석 → 6가지 감정 상태 해석 (평소·녹음중·분석중·배고픔·관심·만족)",
      "치즈냥이 캐릭터의 표정과 애니메이션으로 결과를 표현",
      "분석 결과를 SNS 공유 카드로 저장·공유",
      "데일리 알림과 커스텀 멘트로 일상 속 인터랙션 설계",
    ],
    toneStudy: {
      beforeImage: "/works/nyangtalk/before.jpg",
      afterImage: "/works/nyangtalk/thumb.jpg",
      beforeLabel: "Before · 블루 톤 (초기 시안)",
      afterLabel: "After · 웜 베이지 / 오렌지 톤 (최종)",
      story:
        "초기 시안은 음성 분석 앱이라는 기술 정체성에 충실한 블루 그라데이션이었다. 화면을 켤 때마다 차가운 인상이 먼저 닿았고, 반려묘를 향한 다정한 말 걸기라는 본래의 목적과는 거리가 있었다. 톤을 베이지와 오렌지의 웜 팔레트로 다시 짜고, 치즈냥이의 표정 톤도 함께 끌어올렸다. 차가운 기술감 → 반려동물 앱의 정서적 따뜻함. 같은 기능, 다른 온도.",
    },
    tags: ["ios", "app", "ai", "ux", "ui"],
    links: {},
    placeholder: { shape: "circle", palette: ["#FFE7CC", "#F2A66E", "#5A4736"] },
    layout: {
      span: 7,
      aspect: "aspect-[3/4]",
      offset: "md:mt-32",
    },
  },
];

export const worksById: Record<string, Work> = Object.fromEntries(
  works.map((w) => [w.id, w])
);

/** Returns the previous and next works in the array (wrapping at edges). */
export function getNeighbors(id: string): { prev: Work; next: Work } | null {
  const i = works.findIndex((w) => w.id === id);
  if (i === -1) return null;
  const prev = works[(i - 1 + works.length) % works.length];
  const next = works[(i + 1) % works.length];
  return { prev, next };
}

/** First sentence of the description — used as the hover preview line on the cards. */
export function firstSentence(text: string): string {
  return text.match(/^[^.!?。]+[.!?。]/)?.[0] ?? text;
}
