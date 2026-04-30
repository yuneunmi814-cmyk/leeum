import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Works from "@/components/Works";
import GuestBook from "@/components/GuestBook";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Intro />
      <Works />
      <GuestBook />
    </main>
  );
}
