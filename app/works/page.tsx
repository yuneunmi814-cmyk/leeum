import type { Metadata } from "next";
import Works from "@/components/Works";

export const metadata: Metadata = {
  title: "Works — Oculus",
  description:
    "Where the Light Stays · Collection 01 — 두 개의 작품, 하나의 빛.",
};

export default function WorksPage() {
  return (
    <main className="relative bg-canvas pt-20">
      <Works />
    </main>
  );
}
