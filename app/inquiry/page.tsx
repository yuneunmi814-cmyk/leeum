import type { Metadata } from "next";
import Inquiry from "@/components/Inquiry";

export const metadata: Metadata = {
  title: "Inquiry — Oculus",
  description:
    "문의 — Where every project begins. 윤은미의 의뢰 안내, 진행 과정, 그리고 네 가지 약속.",
};

export default function InquiryPage() {
  return (
    <main className="relative bg-canvas pt-20">
      <Inquiry />
    </main>
  );
}
