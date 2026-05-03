import type { Metadata } from "next";
import Works from "@/components/Works";

export const metadata: Metadata = {
  title: "Collection 01",
  description:
    "Where the Light Stays · Collection 01 — 네 개의 작품, 하나의 빛. 코드로 지어 올린 공간·정책·앱을 한 자리에 모았다.",
  openGraph: {
    title: "Collection 01 · Project Yoon",
    description: "Where the Light Stays — 네 개의 작품, 하나의 빛.",
  },
};

export default function WorksPage() {
  return (
    <main className="relative bg-canvas pt-20">
      <Works />
    </main>
  );
}
