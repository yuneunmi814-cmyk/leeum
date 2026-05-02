import { renderOG } from "@/lib/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "III. The Inquiry — Where every project begins";

export default async function OGImage() {
  return renderOG({
    number: "III.",
    topLabel: "The Inquiry",
    title: "The Inquiry",
    subtitle: "Where every project begins.",
  });
}
