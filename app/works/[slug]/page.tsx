import Link from "next/link";
import { notFound } from "next/navigation";
import { getNeighbors, works, worksById } from "@/data/works";
import PlaceholderArt from "@/components/PlaceholderArt";
import DetailReveal from "./DetailReveal";
import ResilientImage from "./ResilientImage";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const work = worksById[params.slug];
  if (!work) return { title: "Not Found — Oculus" };
  return {
    title: `${work.titleKo} — Oculus`,
    description: work.caption,
  };
}

export default function WorkDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const work = worksById[params.slug];
  if (!work) notFound();

  const neighbors = getNeighbors(work.id)!;
  const { prev, next } = neighbors;
  const plateNumber = String(works.findIndex((w) => w.id === work.id) + 1).padStart(2, "0");
  const placeholder = (
    <div className="absolute inset-0">
      <PlaceholderArt
        shape={work.placeholder.shape}
        palette={work.placeholder.palette}
      />
    </div>
  );

  return (
    <main className="relative bg-canvas pb-32">
      {/* Top label strip — like a gallery wall plaque */}
      <div className="border-b border-concrete-200">
        <div className="mx-auto flex max-w-gallery items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
          <Link
            href="/#works"
            className="group inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-gallery text-concrete-500 transition-colors hover:text-ink"
          >
            <span className="block h-px w-6 bg-concrete-300 transition-all group-hover:w-10 group-hover:bg-ink" />
            Back to Galleries
          </Link>
          <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
            {work.year}
          </span>
        </div>
      </div>

      <DetailReveal>
        {/* Hero plate — full width, generous breathing room */}
        <section className="px-6 pt-16 sm:px-10 sm:pt-24 lg:px-16 lg:pt-32">
          <div className="mx-auto max-w-gallery">
            {/* Title block */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-3">
                <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                  Plate
                </span>
                <div className="mt-2 font-serif text-5xl text-ink/30 leading-none lg:text-6xl">
                  {plateNumber}
                </div>
              </div>
              <div className="lg:col-span-9">
                <h1 className="font-serif text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
                  {work.titleKo}
                </h1>
                <p className="mt-3 font-serif italic text-xl text-concrete-500 lg:text-2xl">
                  {work.title}
                </p>
                {work.subtitle && (
                  <p className="mt-6 max-w-2xl font-serif text-base leading-[1.85] text-concrete-700 text-balance sm:text-lg">
                    {work.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* The hero image */}
            <figure className="mt-16 lg:mt-24">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-concrete-200">
                <ResilientImage
                  src={work.thumbnail}
                  alt={`${work.titleKo} — hero plate`}
                  fallback={placeholder}
                  className="absolute inset-0 h-full w-full"
                  objectPosition={work.layout.objectPosition}
                />
                <div
                  className="absolute inset-0 concrete-grain opacity-25 mix-blend-multiply"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10"
                  aria-hidden
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                <span>Plate {plateNumber}</span>
                <span>{work.medium}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Description (left) + meta (right) */}
        <section className="px-6 pt-24 sm:px-10 lg:px-16 lg:pt-32">
          <div className="mx-auto grid max-w-gallery grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                Curatorial Note
              </span>
              {work.description.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className={`font-serif leading-[1.85] text-concrete-800 text-balance ${
                    i === 0 ? "mt-6 text-xl sm:text-2xl" : "mt-6 text-base sm:text-lg"
                  }`}
                >
                  {para}
                </p>
              ))}

              {work.highlights && work.highlights.length > 0 && (
                <div className="mt-12 border-t border-concrete-200 pt-8">
                  <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                    Highlights
                  </span>
                  <ol className="mt-6 space-y-5">
                    {work.highlights.map((line, i) => (
                      <li key={i} className="flex gap-5">
                        <span className="mt-1 shrink-0 font-sans text-[10px] uppercase tracking-gallery text-concrete-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-base leading-[1.8] text-concrete-800 text-balance sm:text-lg">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border-t border-concrete-200 pt-6">
                <Meta label="Year" value={work.year} />
                <Meta label="Medium" value={work.medium} />
                <Meta label="Tags" value={work.tags.join(" · ")} />
                {Object.entries(work.links).length > 0 && (
                  <div className="mt-8 border-t border-concrete-200 pt-6">
                    <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                      Links
                    </span>
                    <ul className="mt-3 space-y-2">
                      {Object.entries(work.links).map(([key, value]) => (
                        <li key={key}>
                          <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-baseline gap-3 font-sans text-sm text-ink hover:text-concrete-500 transition-colors"
                          >
                            <span className="font-serif italic capitalize">{key}</span>
                            <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-400 transition-transform group-hover:translate-x-1">
                              ↗
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* Tone Study — Before / After design decision */}
        {work.toneStudy && (
          <section className="px-6 pt-24 sm:px-10 lg:px-16 lg:pt-40">
            <div className="mx-auto max-w-gallery">
              <div className="flex items-center gap-4 font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                <span>Tone Study</span>
                <span aria-hidden className="block h-px w-12 bg-concrete-300" />
                <span>Design Decision</span>
              </div>
              <h2 className="mt-6 font-serif text-3xl font-light leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                같은 기능, 다른 온도
                <span className="text-concrete-300">.</span>
              </h2>

              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
                <figure>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-concrete-200">
                    <ResilientImage
                      src={work.toneStudy.beforeImage}
                      alt={`${work.titleKo} — before`}
                      fallback={placeholder}
                      className="absolute inset-0 h-full w-full"
                    />
                    <div
                      className="absolute inset-0 concrete-grain opacity-25 mix-blend-multiply"
                      aria-hidden
                    />
                  </div>
                  <figcaption className="mt-3 font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                    {work.toneStudy.beforeLabel}
                  </figcaption>
                </figure>
                <figure>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-concrete-200">
                    <ResilientImage
                      src={work.toneStudy.afterImage}
                      alt={`${work.titleKo} — after`}
                      fallback={placeholder}
                      className="absolute inset-0 h-full w-full"
                    />
                    <div
                      className="absolute inset-0 concrete-grain opacity-25 mix-blend-multiply"
                      aria-hidden
                    />
                  </div>
                  <figcaption className="mt-3 font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                    {work.toneStudy.afterLabel}
                  </figcaption>
                </figure>
              </div>

              <p className="mt-12 max-w-3xl font-serif text-base leading-[1.85] text-concrete-800 text-balance sm:text-lg">
                {work.toneStudy.story}
              </p>
            </div>
          </section>
        )}

        {/* Additional plates — gallery of detail images */}
        {work.images.length > 1 && (
          <section className="px-6 pt-24 sm:px-10 lg:px-16 lg:pt-40">
            <div className="mx-auto max-w-gallery">
              <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                Additional Plates · {work.images.length}
              </span>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
                {work.images.map((src, i) => (
                  <figure key={src + i}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-concrete-200">
                      <ResilientImage
                        src={src}
                        alt={`${work.titleKo} — plate ${i + 1}`}
                        fallback={placeholder}
                        className="absolute inset-0 h-full w-full"
                      />
                      <div
                        className="absolute inset-0 concrete-grain opacity-25 mix-blend-multiply"
                        aria-hidden
                      />
                    </div>
                    <figcaption className="mt-3 flex justify-between font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                      <span>Plate {String(i + 1).padStart(2, "0")}</span>
                      <span>{work.year}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Prev / Next */}
        <nav
          aria-label="Adjacent works"
          className="mt-32 border-t border-concrete-200 px-6 pt-12 sm:px-10 lg:px-16 lg:mt-40"
        >
          <div className="mx-auto grid max-w-gallery grid-cols-1 gap-8 sm:grid-cols-2">
            <Link
              href={`/works/${prev.id}`}
              data-cursor="view"
              className="group block"
            >
              <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                ← Previous Room
              </span>
              <div className="mt-3 font-serif text-2xl text-ink transition-[letter-spacing] duration-500 group-hover:tracking-wide sm:text-3xl">
                {prev.titleKo}
              </div>
              <div className="mt-1 font-serif italic text-sm text-concrete-500">
                {prev.title}
              </div>
            </Link>
            <Link
              href={`/works/${next.id}`}
              data-cursor="view"
              className="group block sm:text-right"
            >
              <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
                Next Room →
              </span>
              <div className="mt-3 font-serif text-2xl text-ink transition-[letter-spacing] duration-500 group-hover:tracking-wide sm:text-3xl">
                {next.titleKo}
              </div>
              <div className="mt-1 font-serif italic text-sm text-concrete-500">
                {next.title}
              </div>
            </Link>
          </div>
        </nav>
      </DetailReveal>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-6 first:mt-0">
      <dt className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
        {label}
      </dt>
      <dd className="mt-2 font-serif text-base text-ink leading-relaxed">
        {value}
      </dd>
    </div>
  );
}
