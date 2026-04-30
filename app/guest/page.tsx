import type { Metadata } from "next";
import GuestBook from "@/components/GuestBook";

export const metadata: Metadata = {
  title: "Guest — Oculus",
  description: "방명록 · 한 줄 남겨 주세요. Open 24/7 · Online.",
};

export default function GuestPage() {
  return (
    <main className="relative bg-canvas pt-20">
      <GuestBook />
    </main>
  );
}
