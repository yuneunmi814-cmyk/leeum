import Hero from "@/components/Hero";
import ChapterIndicator from "@/components/home/ChapterIndicator";
import CollectionChapter from "@/components/home/CollectionChapter";
import Corridor from "@/components/home/Corridor";
import InquiryChapter from "@/components/home/InquiryChapter";

/**
 * Home is a single-scroll exhibition: three chapters with corridors
 * between them — Entrance (skylight), the Collection (horizontal
 * gallery), and the Inquiry. /about and /guest live as their own
 * dedicated pages, not as chapters here.
 */
export default function Home() {
  return (
    <main className="relative">
      <ChapterIndicator />
      <Hero />
      <Corridor />
      <CollectionChapter />
      <Corridor />
      <InquiryChapter />
    </main>
  );
}
