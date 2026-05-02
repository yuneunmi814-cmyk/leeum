"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  fallback: React.ReactNode;
  className?: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
};

/**
 * Renders an <img> that gracefully swaps to a generative fallback if the
 * source 404s. Lets detail-page figures show real plates when they ship
 * and degrade to placeholder art when they don't.
 */
export default function ResilientImage({
  src,
  alt,
  fallback,
  className,
  objectPosition,
  objectFit = "cover",
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={className}
      style={{
        objectFit,
        objectPosition: objectPosition ?? "center",
      }}
      loading="lazy"
      decoding="async"
    />
  );
}
