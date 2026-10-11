import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CtaGroupProps {
  children: ReactNode;
  /** Stack full-width below sm for larger touch targets. */
  stackOnMobile?: boolean;
  className?: string;
}

/**
 * Row of CTAs in hierarchy order: at most one primary, then secondary,
 * then text actions.
 */
export function CtaGroup({ children, stackOnMobile = false, className }: CtaGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-group gap-y-tight",
        stackOnMobile && "max-sm:flex-col max-sm:items-stretch",
        className,
      )}
    >
      {children}
    </div>
  );
}
