import type { CSSProperties } from "react";
import Image from "next/image";
import { Media } from "@/components/ui/Media";
import { Tilt } from "@/components/ui/Tilt";
import { cn } from "@/lib/cn";
import type { CaseStudyFigure, ImageAsset } from "@/types/content";

// Open (resting) and stacked (before reveal) transforms for the left, centre
// and right screens, anchored to the bottom edge of the stage.
const placements = [
  {
    to: "translateX(-158%) translateZ(-20px) rotateY(24deg) rotate(-3deg)",
    from: "translateX(-60%) translateY(10%) translateZ(-40px)",
    layer: "z-10",
  },
  {
    to: "translateX(-50%) translateY(-5%) translateZ(80px)",
    from: "translateX(-50%) translateY(14%)",
    layer: "z-20",
  },
  {
    to: "translateX(58%) translateZ(-20px) rotateY(-24deg) rotate(3deg)",
    from: "translateX(-40%) translateY(10%) translateZ(-40px)",
    layer: "z-10",
  },
];

interface ProductStageProps {
  /** The project's own cover image: the back plane of the scene. */
  cover: ImageAsset;
  /** Real product screens, fanned across the front. */
  screens: CaseStudyFigure[];
  className?: string;
}

/**
 * A project shown in layered 3D: its cover as the back plane, three real
 * product screens fanned in front on a perspective floor. The whole stage
 * tilts with the pointer, the layers sit at different depths, and the fan
 * opens as it scrolls into view. Without motion (reduced motion, or before
 * the script runs) it simply renders open.
 */
export function ProductStage({ cover, screens, className }: ProductStageProps) {
  return (
    <Tilt max={6} glare={false} className={cn("relative mx-auto aspect-[8/7] w-full max-w-[44rem]", className)}>
      <div data-fan className="absolute inset-0 transform-3d">
        <div aria-hidden className="stage-floor" />
        <div className="corner-marks absolute inset-x-0 top-0" style={{ transform: "translateZ(-70px) scale(1.07)" }}>
          <Media image={cover} ratio="intrinsic" sizes="(min-width: 1024px) 44rem, 100vw" />
        </div>
        <ul className="absolute inset-0 transform-3d">
          {screens.slice(0, placements.length).map((figure, i) => {
            const placement = placements[i];
            if (!placement) return null;
            return (
              <li
                key={figure.image.src}
                className={cn("fan-phone absolute bottom-0 left-1/2 w-[26%]", placement.layer)}
                style={{ "--fan-to": placement.to, "--fan-from": placement.from } as CSSProperties}
              >
                {/* Decorative here: the project cover carries this section; each screen
                    is described in full on the case-study page. */}
                <Image
                  src={figure.image.src}
                  alt=""
                  width={figure.image.width}
                  height={figure.image.height}
                  sizes="(min-width: 1024px) 11.5rem, 26vw"
                  className="h-auto w-full rounded-[1.25rem] shadow-elevated"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Tilt>
  );
}
