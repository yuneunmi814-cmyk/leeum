import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon (180×180). Same simplified oculus the SVG
 * favicon uses, just rendered to PNG so older iOS versions that don't
 * accept SVG masks still get a clean icon.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0F0F0E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32">
          <g stroke="#FAFAF7" fill="none" strokeLinecap="round">
            <circle cx="16" cy="16" r="11" strokeWidth="1.2" />
            <line x1="16" y1="5" x2="16" y2="27" strokeWidth="0.5" strokeOpacity="0.65" />
            <line x1="5" y1="16" x2="27" y2="16" strokeWidth="0.5" strokeOpacity="0.65" />
            <line x1="8.2" y1="8.2" x2="23.8" y2="23.8" strokeWidth="0.4" strokeOpacity="0.45" />
            <line x1="23.8" y1="8.2" x2="8.2" y2="23.8" strokeWidth="0.4" strokeOpacity="0.45" />
            <circle cx="16" cy="16" r="6" strokeWidth="0.5" strokeOpacity="0.55" />
          </g>
          <circle cx="16" cy="16" r="1.6" fill="#FAFAF7" />
        </svg>
      </div>
    ),
    size
  );
}
