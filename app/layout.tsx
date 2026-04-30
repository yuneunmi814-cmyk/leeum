import type { Metadata } from "next";
import { Inter, Noto_Serif_KR, Cormorant_Garamond } from "next/font/google";
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
  title: "Oculus — Portfolio",
  description:
    "리움미술관 M1관 로툰다 천창에서 영감 받은 포트폴리오. 위에서 쏟아지는 빛, 그리고 작품들.",
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
      </body>
    </html>
  );
}
