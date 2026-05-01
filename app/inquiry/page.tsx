import type { Metadata } from "next";
import Inquiry from "@/components/Inquiry";

export const metadata: Metadata = {
  title: "Inquiry",
  description:
    "머릿속에만 있던 것을 화면 위에 옮기는 일을 합니다. 윤은미의 의뢰 안내, 진행 과정, 그리고 네 가지 약속.",
  openGraph: {
    title: "Inquiry · Project Yoon",
    description: "Where every project begins.",
  },
};

export default function InquiryPage() {
  return (
    <main className="relative bg-canvas pt-20">
      <Inquiry />
    </main>
  );
}
