import { BaseLink } from "@/components/ui/BaseLink";
import { Icon } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";
import type { CaseStudyFigure as Figure } from "@/types/content";

interface CaseStudyFigureProps {
  figure: Figure;
  sizes: string;
  /** Adds a link to the full-size file — for diagrams whose detail is small on phones. */
  expandable?: boolean;
  className?: string;
}

/**
 * A real image with its caption and, for diagrams, a visible text
 * equivalent so the content never depends on reading the image.
 */
export function CaseStudyFigure({ figure, sizes, expandable = false, className }: CaseStudyFigureProps) {
  return (
    // Never wider than the source image, so nothing is upscaled.
    <figure className={className} style={{ maxWidth: figure.image.width }}>
      <Media image={figure.image} ratio="intrinsic" sizes={sizes} />
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
