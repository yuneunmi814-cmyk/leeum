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
  /** Tailwind aspect-ratio class suffix */
  aspect:
    | "aspect-[4/5]"
    | "aspect-[3/4]"
    | "aspect-square"
    | "aspect-[16/10]"
    | "aspect-[16/9]"
    | "aspect-[5/6]";
  /** Optional vertical offset to break the row baseline (md+ only) */
  offset?: "md:mt-12" | "md:mt-20" | "md:mt-24" | "md:mt-32";
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
    layout: { span: 5, aspect: "aspect-[3/4]", offset: "md:mt-24" },
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
