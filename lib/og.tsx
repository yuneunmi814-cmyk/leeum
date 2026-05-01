import { ImageResponse } from "next/og";

// NB: opengraph-image.tsx files must declare `runtime`, `size`, and
// `contentType` as literal exports — Next.js parses them statically and
// rejects identifier references. Constants here are documentation only.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#0F0F0E";
const INK = "#FAFAF7";
const DIM = "#8B8680";

/**
 * Fetch a Google Font as a binary at build time. We pass `text=` so
 * Google subsets the font to just the glyphs we render — keeps the
 * payload small and avoids Korean fallbacks. Format pulled out of the
 * returned CSS, then the binary itself is fetched.
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer> {
  const fam = family.replace(/ /g, "+");
  const url = `https://fonts.googleapis.com/css2?family=${fam}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, {
    headers: {
      // older UA → Google returns a TTF the Satori renderer can read
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
    },
  }).then((r) => r.text());
  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)\s*format\(['"]([^'"]+)['"]\)/);
  if (!match) throw new Error(`Google font URL not found for ${family}`);
  const fontUrl = match[1];
  const res = await fetch(fontUrl);
  return res.arrayBuffer();
}

type RenderOpts = {
  /** "II.", "III.", etc — omitted on the home OG */
  number?: string;
  /** big serif title */
  title: string;
  /** italic subtitle below the title */
  subtitle?: string;
  /** small label sitting beside the brand wordmark up top */
  topLabel?: string;
};

/**
 * Renders a 1200×630 OG image with the gallery palette + Noto Serif
 * (for Korean) and Cormorant Garamond (for italic English).
 */
export async function renderOG(opts: RenderOpts): Promise<ImageResponse> {
  const { number, title, subtitle, topLabel } = opts;

  const koreanText = `${title}${subtitle ?? ""}${topLabel ?? ""}빛이 머무는 자리`;
  const latinText =
    `${title}${subtitle ?? ""}${number ?? ""}${topLabel ?? ""}` +
    " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789·.,—↗";

  // Both fonts loaded in parallel; failures fall back to system fonts.
  let koSerif: ArrayBuffer | null = null;
  let enItalic: ArrayBuffer | null = null;
  try {
    [koSerif, enItalic] = await Promise.all([
      loadGoogleFont("Noto Serif KR", 400, koreanText),
      loadGoogleFont("Cormorant Garamond", 400, latinText),
    ]);
  } catch {
    /* fall back to defaults */
  }

  const fonts: ConstructorParameters<typeof ImageResponse>[1] extends infer O
    ? O extends { fonts?: infer F }
      ? F
      : never
    : never = [];
  if (koSerif) {
    fonts.push({
      name: "NotoSerifKR",
      data: koSerif,
      style: "normal",
      weight: 400,
    });
  }
  if (enItalic) {
    fonts.push({
      name: "Cormorant",
      data: enItalic,
      style: "italic",
      weight: 400,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          color: INK,
          padding: 60,
          fontFamily: "NotoSerifKR, serif",
          position: "relative",
        }}
      >
        {/* Top row: brand · domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 18,
            letterSpacing: 6,
            color: DIM,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ color: INK, letterSpacing: 4 }}>PROJECT YOON</span>
            {topLabel && <span>· {topLabel}</span>}
          </div>
          <div>projectyoon.com</div>
        </div>

        {/* Center: chapter mark + title + subtitle */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {number && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                fontSize: 22,
                letterSpacing: 8,
                color: DIM,
                marginBottom: 36,
                textTransform: "uppercase",
              }}
            >
              <span>{number}</span>
              <span
                style={{
                  display: "block",
                  height: 1,
                  width: 60,
                  background: DIM,
                }}
              />
            </div>
          )}

          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 400,
              lineHeight: 1,
              color: INK,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>

          {subtitle && (
            <div
              style={{
                display: "flex",
                marginTop: 30,
                fontSize: 36,
                fontStyle: "italic",
                color: DIM,
                fontFamily: "Cormorant, NotoSerifKR, serif",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Bottom rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 14,
            letterSpacing: 4,
            color: DIM,
            textTransform: "uppercase",
            borderTop: `1px solid ${DIM}`,
            paddingTop: 18,
          }}
        >
          <span>An exhibition of work</span>
          <span>윤은미 / Yoon Eun-mi</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
