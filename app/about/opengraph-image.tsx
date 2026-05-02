import { renderOG } from "@/lib/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The Artist · Project Yoon";

export default async function OGImage() {
  return renderOG({
    topLabel: "The Artist",
    title: "The Artist",
    subtitle: "한 사람의 시선이 머무른 자리",
  });
}
