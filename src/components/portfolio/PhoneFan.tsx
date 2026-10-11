import type { CSSProperties } from "react";
import Image from "next/image";
import { Tilt } from "@/components/ui/Tilt";
import { cn } from "@/lib/cn";
import type { CaseStudyFigure } from "@/types/content";

// Final (fanned) and initial (stacked) transforms for the left, centre and
// right screens. Each includes the centring translate.
const placements = [
  {
    to: "translate(-50%, -50%) translateX(-72%) translateZ(-80px) rotateY(26deg) rotateZ(-3deg)",
    from: "translate(-50%, -50%) translateY(10%) rotateX(18deg)",
    layer: "z-0",
  },
  {
    to: "translate(-50%, -50%) translateZ(40px)",
    from: "translate(-50%, -50%) translateY(16%) rotateX(18deg)",
    layer: "z-10",
  },
  {
    to: "translate(-50%, -50%) translateX(72%) translateZ(-80px) rotateY(-26deg) rotateZ(3deg)",
    from: "translate(-50%, -50%) translateY(10%) rotateX(18deg)",
    layer: "z-0",
  },
];

/**
 * Three real product screens fanned out in 3D. The fan opens as it scrolls
 * into view (CSS scroll timeline) and tilts with the pointer. Without
 * scroll-driven animation support, or under reduced motion, it renders
 * already open.
 */
export function PhoneFan({ figures, className }: { figures: CaseStudyFigure[]; className?: string }) {
  return (
    <Tilt max={8} glare={false} className={cn("relative mx-auto aspect-[5/4] w-full max-w-[40rem]", className)}>
      <div
        aria-hidden
        className="glow-pulse absolute inset-[12%] -z-10 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)] opacity-60 blur-2xl"
      />
      <ul className="absolute inset-0 transform-3d">
        {figures.slice(0, placements.length).map((figure, i) => {
          const placement = placements[i];
          if (!placement) return null;
          return (
            <li
              key={figure.image.src}
              className={cn("fan-phone absolute top-1/2 left-1/2 w-[34%]", placement.layer)}
              style={{ "--fan-to": placement.to, "--fan-from": placement.from } as CSSProperties}
            >
              <Image
                src={figure.image.src}
                alt={figure.image.alt}
                width={figure.image.width}
                height={figure.image.height}
                sizes="(min-width: 1024px) 14rem, 30vw"
                className="h-auto w-full rounded-[1.5rem] shadow-elevated"
              />
            </li>
          );
        })}
      </ul>
    </Tilt>
  );
}
