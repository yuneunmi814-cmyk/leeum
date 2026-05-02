import { renderOG } from "@/lib/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "II. The Collection — Where the Light Stays";

export default async function OGImage() {
  return renderOG({
    number: "II.",
    topLabel: "The Collection",
    title: "Where the Light Stays",
    subtitle: "빛이 머무는 공간 · Collection 01",
  });
}
