import { InlineText } from "@/components/case-study/InlineText";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { CaseStudyPoint } from "@/types/content";

const pad = (n: number) => String(n).padStart(2, "0");

/** Numbered decisions or challenges: a short title and its explanation. */
export function CaseStudyPoints({ points }: { points: CaseStudyPoint[] }) {
  return (
    <ol>
      {points.map((point, i) => (
        <li
          key={point.title}
          className="reveal group grid gap-tight border-t border-border py-cluster transition-colors first:border-t-0 first:pt-0 hover:border-accent md:grid-cols-[3rem_1fr]"
        >
          <span aria-hidden className="font-display text-h3 text-accent">
            {pad(i + 1)}
          </span>
          <div>
            <Heading level={3}>{point.title}</Heading>
            <Text tone="secondary" className="mt-tight max-w-reading">
              <InlineText text={point.detail} />
            </Text>
          </div>
        </li>
      ))}
    </ol>
  );
}
