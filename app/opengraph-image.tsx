import { renderOG } from "@/lib/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project Yoon — 빛이 머무는 자리";

export default async function OGImage() {
  return renderOG({
    title: "Project Yoon",
    subtitle: "빛이 머무는 자리",
  });
}
