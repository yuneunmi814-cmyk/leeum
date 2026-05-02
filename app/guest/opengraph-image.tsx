import { renderOG } from "@/lib/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The Guest Book — Voices from the gallery";

export default async function OGImage() {
  return renderOG({
    topLabel: "The Guest Book",
    title: "The Guest Book",
    subtitle: "Voices from the gallery.",
  });
}
