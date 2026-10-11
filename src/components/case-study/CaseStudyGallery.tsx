import { CaseStudyFigure } from "@/components/case-study/CaseStudyFigure";
import { cn } from "@/lib/cn";
import type { CaseStudyFigure as Figure } from "@/types/content";

/**
 * Product screens. Composition follows the media itself: portrait (phone)
 * screens sit three across, landscape (desktop) screens two across. In a
 * mixed gallery a portrait screen keeps a narrower width so it does not
 * tower over its neighbours. On phones everything stacks.
 */
export function CaseStudyGallery({ figures }: { figures: Figure[] }) {
  const portrait = figures.every((figure) => figure.image.height > figure.image.width);

  return (
    <ul className={cn("grid gap-x-grid gap-y-block", portrait ? "sm:grid-cols-3" : "md:grid-cols-2")}>
      {figures.map((figure) => (
        <li
          key={figure.image.src}
          className={cn(
            "reveal",
            portrait && "max-sm:max-w-80",
            !portrait && figure.image.height > figure.image.width && "max-w-88",
          )}
        >
          <CaseStudyFigure
            figure={figure}
            sizes={portrait ? "(min-width: 640px) 30vw, 20rem" : "(min-width: 768px) 45vw, 100vw"}
          />
        </li>
      ))}
    </ul>
  );
}
