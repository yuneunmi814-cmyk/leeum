import type { Metadata } from "next";
import Works from "@/components/Works";

export const metadata: Metadata = {
  title: "The Galleries",
  description:
    "Where the Light Stays — 네 개의 작품, 두 개의 방. Studies(자체 실험)와 Commissions(의뢰)으로 나누어 걸어 둔 컬렉션.",
  openGraph: {
    title: "The Galleries · Project Yoon",
    description:
      "Where the Light Stays — 네 개의 작품, 두 개의 방. Studies × Commissions.",
  },
};

export default function WorksPage() {
  return (
    <main className="relative bg-canvas pt-20">
      <Works />
    </main>
  );
}
