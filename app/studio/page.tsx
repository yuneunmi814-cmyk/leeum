import type { Metadata } from "next";
import Studio from "@/components/Studio";

export const metadata: Metadata = {
  title: "Studio — Oculus",
  description:
    "작업실 — Where ideas become websites. 윤은미의 의뢰 안내, 진행 과정, 그리고 네 가지 약속.",
};

export default function StudioPage() {
  return (
    <main className="relative bg-canvas pt-20">
      <Studio />
    </main>
  );
}
