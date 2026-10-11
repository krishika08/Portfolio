import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface ManifestoProps {
  text: string;
  /** Exact phrases in `text` (case-insensitive) set in the accent colour. */
  emphasis?: string[];
  className?: string;
}

/**
 * A statement in large display caps whose words brighten one after another
 * as it scrolls through view (CSS scroll timeline; see `.manifesto` in
 * globals.css). The text is unchanged and reads normally to assistive
 * technology; without scroll-driven animation it simply shows at full
 * strength.
 */
export function Manifesto({ text, emphasis = [], className }: ManifestoProps) {
  const lower = text.toLowerCase();
  const emphasised = new Array<boolean>(text.length).fill(false);
  for (const phrase of emphasis) {
    const needle = phrase.toLowerCase();
    for (let at = lower.indexOf(needle); at !== -1; at = lower.indexOf(needle, at + needle.length)) {
      emphasised.fill(true, at, at + needle.length);
    }
  }

  const words = [...text.matchAll(/\S+/g)];
  const last = Math.max(words.length - 1, 1);

  return (
    <p className={cn("manifesto font-display text-[clamp(2rem,1.1rem+3.4vw,4.25rem)] leading-[0.98] text-foreground", className)}>
      {words.map((match, i) => {
        const start = match.index ?? 0;
        return (
          <Fragment key={start}>
            <span
              className={cn("manifesto-word", emphasised[start] && "text-accent")}
              style={{ "--w": (i / last).toFixed(3) } as CSSProperties}
            >
              {match[0]}
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </p>
  );
}
