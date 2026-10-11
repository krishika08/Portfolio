import { BaseLink } from "@/components/ui/BaseLink";
import { Icon } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";
import { Tilt } from "@/components/ui/Tilt";
import type { CaseStudyFigure as Figure } from "@/types/content";

interface CaseStudyFigureProps {
  figure: Figure;
  sizes: string;
  /** Adds a link to the full-size file — for diagrams whose detail is small on phones. */
  expandable?: boolean;
  /** Pointer-driven 3D tilt on the image. */
  tilt?: boolean;
  className?: string;
}

/**
 * A real image with its caption and, for diagrams, a visible text
 * equivalent so the content never depends on reading the image.
 */
export function CaseStudyFigure({ figure, sizes, expandable = false, tilt = false, className }: CaseStudyFigureProps) {
  const media = <Media image={figure.image} ratio="intrinsic" sizes={sizes} />;
  return (
    // Never wider than the source image, so nothing is upscaled.
    <figure className={className} style={{ maxWidth: figure.image.width }}>
      {tilt ? <Tilt className="corner-marks rounded-md">{media}</Tilt> : media}
      <figcaption className="mt-group flex flex-col gap-tight">
        <span className="text-body-sm text-foreground">{figure.caption}</span>
        {figure.description && (
          <span className="block max-w-reading text-body-sm text-foreground-secondary">{figure.description}</span>
        )}
        {expandable && (
          <BaseLink
            href={figure.image.src}
            newTab
            className="inline-flex min-h-11 w-fit items-center gap-micro rounded-sm text-label text-foreground hover:text-accent"
          >
            View full size
            <Icon name="arrow-up-right" />
          </BaseLink>
        )}
      </figcaption>
    </figure>
  );
}
