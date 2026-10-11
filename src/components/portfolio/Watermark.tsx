import { cn } from "@/lib/cn";

interface WatermarkProps {
  text: string;
  className?: string;
}

/**
 * Giant ghost copy of a section title, spanning the section and drifting
 * sideways as it scrolls past. Decorative: hidden from assistive technology.
 * Place as the first child of a `relative isolate` section.
 */
export function Watermark({ text, className }: WatermarkProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 -z-10 overflow-hidden select-none", className)}>
      {/* Drawn by ::before from data-text: ghost type is pure decoration, so it
          stays out of the text content that audits and assistive tech read. */}
      <span className="watermark drift block text-center" data-text={text} />
    </div>
  );
}
