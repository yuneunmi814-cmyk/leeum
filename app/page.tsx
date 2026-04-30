import Hero from "@/components/Hero";
import ArtistChapter from "@/components/home/ArtistChapter";
import ChapterIndicator from "@/components/home/ChapterIndicator";
import CollectionChapter from "@/components/home/CollectionChapter";
import Corridor from "@/components/home/Corridor";
import GuestChapter from "@/components/home/GuestChapter";
import InquiryChapter from "@/components/home/InquiryChapter";

/**
 * Home is a single-scroll exhibition: five chapters with corridors
 * (50vh / 30vh on mobile) between them. Each chapter is self-contained
 * but pairs with a dedicated /<route> for the full version.
 */
export default function Home() {
  return (
    <main className="relative">
      <ChapterIndicator />
      <Hero />
      <Corridor />
      <ArtistChapter />
      <Corridor />
      <CollectionChapter />
      <Corridor />
      <InquiryChapter />
      <Corridor />
      <GuestChapter />
    </main>
  );
}
