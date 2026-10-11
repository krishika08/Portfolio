import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

const ratios = {
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
} as const;

interface MediaProps {
  image: ImageAsset;
  /** Frame ratio; space is reserved before the image loads (no layout shift). */
  ratio?: keyof typeof ratios;
  /**
   * Rendered width hint for responsive srcset selection, e.g.
   * "(min-width: 1024px) 58vw, 100vw". Required so the browser does not
   * download an oversized image.
   */
  sizes: string;
  /** cover crops to fill the frame; contain shows the whole image (screenshots). */
  fit?: "cover" | "contain";
  /** Preload only for the single above-the-fold image of a page. */
  preload?: boolean;
  caption?: string;
  className?: string;
}

/** Framed, responsive image. Lazy-loaded unless `preload` is set. */
export function Media({
  image,
  ratio = "16/10",
  sizes,
  fit = "cover",
  preload = false,
  caption,
  className,
}: MediaProps) {
  const frame = (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-border-subtle bg-surface-secondary",
        ratios[ratio],
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={fit === "cover" ? "object-cover" : "object-contain"}
      />
    </div>
  );

  if (!caption) return <div className={className}>{frame}</div>;

  return (
    <figure className={className}>
      {frame}
      <figcaption className="mt-tight font-mono text-meta text-foreground-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
