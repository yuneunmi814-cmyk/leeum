/**
 * Works data — single source of truth for the gallery + detail pages.
 * Note: per spec the file was hinted as src/data/works.ts; project uses
 * root-level app/ + components/, so data/ at root keeps things consistent.
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
  /** Path to a real thumbnail (when available) */
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
  /** Generative placeholder used until thumbnail/images are real */
  placeholder: {
    shape: WorkShape;
    palette: [string, string, string];
  };
  layout: WorkLayout;
};

export const works: Work[] = [
  {
    id: "column-at-noon",
    title: "Column at Noon",
    titleKo: "정오의 기둥",
    year: "2024",
    medium: "Pigment print on cotton paper, 1200 × 900 mm",
    thumbnail: "/works/column-at-noon/cover.jpg",
    images: [
      "/works/column-at-noon/01.jpg",
      "/works/column-at-noon/02.jpg",
      "/works/column-at-noon/03.jpg",
    ],
    caption:
      "정오에 가까울수록 빛은 곧게 떨어지고, 그 흔적은 짧아집니다.",
    description:
      "정오에 가까울수록 빛은 곧게 떨어지고, 그 흔적은 짧아집니다. 작가는 이 짧은 순간을 기둥의 형태로 응축했습니다.\n\n작품은 한낮의 정적을 1.2미터 높이의 종이 위에 옮긴 것입니다. 인화의 단계마다 노출 시간을 1초씩 줄여, 끝내 빛이 종이의 결만큼 얇아지는 지점을 찾았습니다. 관람객은 이 작품 앞에서 자신의 그림자가 가장 짧아지는 순간을 떠올리게 됩니다.",
    tags: ["Photography", "Light", "Print"],
    links: { press: "https://example.com/press/column-at-noon" },
    placeholder: { shape: "circle", palette: ["#F1F0EC", "#A8A49C", "#373531"] },
    layout: { span: 7, aspect: "aspect-[4/5]" },
  },
  {
    id: "thickness-of-grey",
    title: "Thickness of Grey",
    titleKo: "회색의 두께",
    year: "2023",
    medium: "Concrete relief, mixed media, 1800 × 600 × 80 mm",
    thumbnail: "/works/thickness-of-grey/cover.jpg",
    images: [
      "/works/thickness-of-grey/01.jpg",
      "/works/thickness-of-grey/02.jpg",
    ],
    caption:
      "회색은 한 가지 색이 아닙니다. 다섯 단계의 농도가 벽 위에서 경계를 지웁니다.",
    description:
      "회색은 한 가지 색이 아닙니다. 다섯 단계의 농도가 벽 위에서 서로의 경계를 부드럽게 지웁니다.\n\n작가는 콘크리트를 건조시키는 시간을 의도적으로 흩뜨려, 같은 배합에서도 서로 다른 무게를 가진 회색을 얻었습니다. 표면은 매끄럽지만, 손을 대면 어느 단계에서 다음 단계로 넘어가는지 알 수 있습니다.",
    tags: ["Sculpture", "Material", "Concrete"],
    links: {},
    placeholder: { shape: "slab", palette: ["#E2E0D9", "#8B8680", "#373531"] },
    layout: { span: 5, aspect: "aspect-[3/4]", offset: "md:mt-24" },
  },
  {
    id: "echoes-of-the-oculus",
    title: "Echoes of the Oculus",
    titleKo: "오쿨러스의 반향",
    year: "2025",
    medium: "Generative SVG, web installation",
    thumbnail: "/works/echoes-of-the-oculus/cover.jpg",
    images: [
      "/works/echoes-of-the-oculus/01.jpg",
      "/works/echoes-of-the-oculus/02.jpg",
    ],
    caption:
      "원형 천창을 24개의 호흡으로 나눈 작업. 관람객의 움직임에 따라 빛은 미세하게 회전합니다.",
    description:
      "원형 천창을 24개의 호흡으로 나눈 작업입니다. 관람객의 움직임에 따라 빛은 미세하게 회전합니다.\n\n이 전시 페이지의 헤더에 자리한 오쿨러스가 바로 그 작업의 일부입니다. 화면을 가로지르는 마우스의 좌표는 빛의 입사각이 되어, 콘크리트로 상상된 림 위에 매번 다른 그림자를 떨굽니다. 같은 화면을 두 번 보더라도, 같은 빛은 두 번 보이지 않습니다.",
    tags: ["Web", "Generative", "Light"],
    links: {
      live: "https://example.com/oculus",
      github: "https://github.com/example/oculus",
    },
    placeholder: { shape: "grid", palette: ["#E6EDF2", "#B8C9D6", "#5C7180"] },
    layout: { span: 12, aspect: "aspect-[16/9]" },
  },
  {
    id: "a-quiet-sentence",
    title: "A Quiet Sentence",
    titleKo: "낮은 문장",
    year: "2022",
    medium: "Editorial design, 96pp, offset on Munken Pure",
    thumbnail: "/works/a-quiet-sentence/cover.jpg",
    images: [
      "/works/a-quiet-sentence/01.jpg",
      "/works/a-quiet-sentence/02.jpg",
      "/works/a-quiet-sentence/03.jpg",
    ],
    caption:
      "활자는 조용히 발음됩니다. 페이지의 여백이 그 발음의 길이를 결정합니다.",
    description:
      "활자는 조용히 발음됩니다. 페이지의 여백은 그 발음의 길이를 결정합니다.\n\n96쪽으로 구성된 이 책은 본문이 없는 책입니다. 모든 페이지에는 단 하나의 문장만이 인쇄되어 있고, 그 문장은 페이지의 흰 부분이 끝나는 자리에서 멎습니다. 어떤 페이지는 한 문장이 두 번 호흡할 수 있을 만큼 길고, 어떤 페이지는 그 호흡을 끊어야 할 만큼 짧습니다.",
    tags: ["Editorial", "Typography", "Print"],
    links: { behance: "https://example.com/a-quiet-sentence" },
    placeholder: { shape: "line", palette: ["#FAFAF7", "#C9C6BD", "#52504B"] },
    layout: { span: 5, aspect: "aspect-square" },
  },
  {
    id: "the-last-room",
    title: "The Last Room",
    titleKo: "마지막 방",
    year: "2026",
    medium: "Spatial typography, in progress",
    thumbnail: "/works/the-last-room/cover.jpg",
    images: ["/works/the-last-room/01.jpg"],
    caption: "이 방은 아직 비어 있습니다. 그러나 빈 방은 결코 비어 있지 않습니다.",
    description:
      "이 방은 아직 비어 있습니다. 그러나 빈 방은 결코 비어 있지 않다는 것이, 이 전시의 결론입니다.\n\n작가는 이 방의 도면을 그리지 않았습니다. 다만 천장의 높이와 바닥의 재질, 그리고 입구의 각도만을 명세했습니다. 나머지는 관람객의 발걸음이 그릴 것이라고, 작가는 적어 두었습니다.",
    tags: ["Spatial", "Typography", "WIP"],
    links: {},
    placeholder: { shape: "arch", palette: ["#FAFAF7", "#A8A49C", "#1A1A1A"] },
    layout: { span: 7, aspect: "aspect-[16/10]", offset: "md:mt-32" },
  },
  // ── new dummies ──────────────────────────────────────────────────
  {
    id: "crossing",
    title: "Crossing",
    titleKo: "횡단",
    year: "2024",
    medium: "Single-channel video, 4K, 6′12″",
    thumbnail: "/works/crossing/cover.jpg",
    images: ["/works/crossing/01.jpg", "/works/crossing/02.jpg"],
    caption: "지평선이 한 사람의 걸음으로 두 번 끊어집니다.",
    description:
      "지평선이 한 사람의 걸음으로 두 번 끊어집니다. 영상은 6분 12초 동안 한 번도 컷되지 않으며, 카메라는 움직이지 않습니다.\n\n작가는 이 작품에서 ‘건너간다’는 말의 무게를 다룹니다. 한 사람이 화면의 왼쪽에서 오른쪽으로 걸어가는 동안, 그 사람이 지나간 자리는 지평선이 끊어졌다가 다시 이어지는 두 번의 흔적으로 남습니다.",
    tags: ["Video", "Landscape", "Time"],
    links: { live: "https://example.com/crossing" },
    placeholder: { shape: "horizon", palette: ["#E6EDF2", "#8AA2B5", "#373531"] },
    layout: { span: 4, aspect: "aspect-[4/5]" },
  },
  {
    id: "weight-of-type",
    title: "Weight of Type",
    titleKo: "활자의 무게",
    year: "2023",
    medium: "Variable typeface, OpenType",
    thumbnail: "/works/weight-of-type/cover.jpg",
    images: ["/works/weight-of-type/01.jpg"],
    caption:
      "한 글자가 다음 글자를 어떻게 누르는지에 관한 짧은 연구.",
    description:
      "한 글자가 다음 글자를 어떻게 누르는지에 관한 짧은 연구입니다. 가변 서체는 굵기 한 축이 아닌, 무게의 분포를 두 축으로 다룹니다.\n\n같은 단어를 같은 굵기로 쓰더라도, 무게가 어디로 쏠리는지에 따라 단어의 의미는 미세하게 달라집니다.",
    tags: ["Typography", "Variable", "Type Design"],
    links: { github: "https://github.com/example/weight-of-type" },
    placeholder: { shape: "line", palette: ["#F1F0EC", "#A8A49C", "#1A1A1A"] },
    layout: { span: 4, aspect: "aspect-square", offset: "md:mt-20" },
  },
  {
    id: "before-sunrise",
    title: "Before Sunrise",
    titleKo: "일출 이전",
    year: "2025",
    medium: "Risograph, 2-color (concrete + sky), edition of 80",
    thumbnail: "/works/before-sunrise/cover.jpg",
    images: [
      "/works/before-sunrise/01.jpg",
      "/works/before-sunrise/02.jpg",
    ],
    caption: "해가 뜨기 직전의 30분, 그것이 가장 긴 순간입니다.",
    description:
      "해가 뜨기 직전의 30분, 그것이 가장 긴 순간입니다. 작가는 이 시간대의 하늘을 80장의 리소그래프로 옮겼습니다.\n\n각 인쇄물은 두 가지 색만을 사용합니다 — 콘크리트 회색과 천창의 푸른빛. 그 두 색이 만나는 자리에서 하루가 시작됩니다.",
    tags: ["Risograph", "Print", "Edition"],
    links: { instagram: "https://instagram.com/example" },
    placeholder: { shape: "rose", palette: ["#FAFAF7", "#B8C9D6", "#5C7180"] },
    layout: { span: 4, aspect: "aspect-[3/4]" },
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
