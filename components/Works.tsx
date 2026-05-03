"use client";

import { motion } from "framer-motion";
import { worksById, type Work } from "@/data/works";
import Tile from "./Tile";

type Room = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  subtitleKo: string;
  caption: string;
  slugs: string[];
};

const ROOMS: Room[] = [
  {
    id: "studies",
    number: "II.",
    eyebrow: "Collection I · Studies",
    title: "Where the Light Stays",
    subtitleKo: "빛이 머무는 공간",
    caption:
      "의뢰 없이 스스로에게 던진 질문에서 시작된 작업들. 윤은미라는 작은 실험실 안에서, 빛이 화면에 어떻게 머무는지 시험한 두 점.",
    slugs: ["oculus", "lumi-re"],
  },
  {
    id: "commissions",
    number: "III.",
    eyebrow: "Collection II · Commissions",
    title: "When the Light Travels",
    subtitleKo: "빛이 닿는 곳",
    caption:
      "외부의 요청과 제약 안에서 만들어진 작업들. 한 도시의 청년 정주, 그리고 반려묘 보호자의 마음 — 두 의뢰자의 결을 그대로 담은 두 점.",
    slugs: ["campus-pass", "nyangtalk"],
  },
];

export default function Works() {
  return (
    <section
      id="works"
      className="relative bg-canvas px-6 pt-32 sm:px-10 sm:pt-40 lg:px-16"
    >
      {/* Collection opener */}
      <div className="mx-auto max-w-gallery">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9 }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500"
        >
          <span>I.</span>
          <span className="block h-px w-12 bg-concrete-300" />
          <span>The Galleries · Two Rooms</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 font-serif text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          Where the Light Stays<span className="text-concrete-300">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="mt-8 font-serif text-lg italic text-concrete-500 sm:text-xl"
        >
          빛이 머무는 공간 ·{" "}
          <span className="not-italic font-sans text-[10px] uppercase tracking-gallery align-middle">
            Two Collections
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="mt-10 max-w-xl font-serif text-base leading-[1.85] text-concrete-700 text-balance sm:text-lg"
        >
          네 개의 작품, 두 개의 방. 스스로에게 던진 질문(Studies)과 외부에서
          맡겨진 일(Commissions)을 따로 걸어 두었다.
        </motion.p>
      </div>

      {ROOMS.map((room) => (
        <Room key={room.id} room={room} />
      ))}

      {/* End plate */}
      <div className="mx-auto mt-32 max-w-gallery pb-24 sm:mt-40">
        <div className="border-t border-concrete-200 pt-8">
          <p className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            End of the Galleries
          </p>
          <p className="mt-2 font-serif italic text-concrete-700">
            More rooms are being prepared.
          </p>
        </div>
      </div>
    </section>
  );
}

function Room({ room }: { room: Room }) {
  const items = room.slugs
    .map((slug) => worksById[slug])
    .filter((w): w is Work => Boolean(w));
  if (!items.length) return null;

  return (
    <div className="mx-auto mt-28 max-w-gallery sm:mt-40 lg:mt-48">
      {/* Room header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="border-t border-concrete-200 pt-12"
      >
        <div className="flex items-center gap-4 font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
          <span>{room.number}</span>
          <span aria-hidden className="block h-px w-12 bg-concrete-300" />
          <span>{room.eyebrow}</span>
        </div>
        <h3 className="mt-6 font-serif text-3xl font-light leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {room.title}
          <span className="text-concrete-300">.</span>
        </h3>
        <p className="mt-4 font-serif italic text-base text-concrete-500 sm:text-lg">
          {room.subtitleKo}
        </p>
        <p className="mt-8 max-w-xl font-serif text-base leading-[1.85] text-concrete-700 text-balance">
          {room.caption}
        </p>
      </motion.div>

      {/* Asymmetric grid for this room */}
      <div className="mt-16 sm:mt-20">
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-24 lg:gap-x-10">
          {items.map((work, i) => (
            <Tile key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
