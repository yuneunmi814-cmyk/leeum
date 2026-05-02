import type { Metadata } from "next";
import { Inter, Noto_Serif_KR, Cormorant_Garamond } from "next/font/google";
import FloatingChat from "@/components/FloatingChat";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ViewCursor from "@/components/ViewCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://projectyoon.com"),
  title: {
    default: "Project Yoon — 빛이 머무는 자리",
    template: "%s · Project Yoon",
  },
  description:
    "코드로 지어 올린 디지털 갤러리. 두 개의 작품, 하나의 빛. 윤은미의 큐레이션 컬렉션과 웹 디자인 작업실.",
  keywords: [
    "포트폴리오",
    "웹 디자인",
    "갤러리",
    "윤은미",
    "Project Yoon",
    "Oculus",
    "Lumi-re",
  ],
  authors: [{ name: "윤은미", url: "https://projectyoon.com" }],
  creator: "윤은미",
  publisher: "Project Yoon",
  openGraph: {
    title: "Project Yoon — 빛이 머무는 자리",
    description:
      "코드로 지어 올린 디지털 갤러리. 두 개의 작품, 하나의 빛.",
    url: "https://projectyoon.com",
    siteName: "Project Yoon",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Yoon",
    description: "코드로 지어 올린 디지털 갤러리.",
    creator: "@projectyoon.studio",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://projectyoon.com" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    // app/apple-icon.tsx (edge runtime) auto-generates the PNG.
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${notoSerifKr.variable} ${cormorant.variable}`}
    >
      <body className="font-sans bg-canvas text-ink antialiased">
        <Header />
        <ViewCursor />
        {children}
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
