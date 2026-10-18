import { BaseLink } from "@/components/ui/BaseLink";
import type { Destination } from "@/config/navigation";
import { cn } from "@/lib/cn";
import styles from "./SectionRail.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

interface SectionRailProps {
  destinations: Destination[];
  /** The section under the reading line. */
  current: string | null;
}

/**
 * A slim numbered index along the left edge of the home page: one stop per
 * section, the current one ringed in mint. Each number is a link (its name is
 * the section's), and its label slides out on hover or focus. Shown only on
 * wide screens, in the margin beside the content (see the CSS Module).
 */
export function SectionRail({ destinations, current }: SectionRailProps) {
  return (
    <nav aria-label="Sections" className={styles.rail}>
      <ol className={styles.list}>
        {destinations.map((destination) => {
          const active = destination.id === current;
          return (
            <li key={destination.id}>
              <BaseLink
                href={destination.href}
                aria-current={active ? "location" : undefined}
                className={cn(styles.stop, active && styles.active)}
              >
                <span aria-hidden className={styles.number}>
                  {pad(destination.number)}
                </span>
                <span aria-hidden className={styles.dot} />
                <span className={styles.label}>{destination.label}</span>
              </BaseLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
