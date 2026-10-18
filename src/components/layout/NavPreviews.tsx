import type { ReactNode } from "react";
import Image from "next/image";
import { sectionIds } from "@/config/navigation";
import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { formatMonthRange } from "@/lib/format";
import { getCapabilityClusters, getExperience, getProjects, getSocialLinks } from "@/lib/content";
import { displayHref } from "@/lib/url";
import styles from "./NavIndex.module.css";

/**
 * What each Index row previews. Real images (the owner's portraits and the
 * projects' own covers) and text that already exists on the page; nothing
 * here is written for the preview. Keys are destination ids.
 */
export function buildNavPreviews(): Record<string, ReactNode> {
  const previews: Record<string, ReactNode> = {};
  const hero = profile.portraits?.hero;
  const about = profile.portraits?.about;
  const projects = getProjects();
  const [first, second] = projects.flatMap((project) =>
    project.assets?.cover ? [project.assets.cover] : [],
  );
  const [degree] = education;

  previews[sectionIds.home] = (
    <>
      <div className={styles.pvCenter}>
        {hero && (
          <Image src={hero.src} alt="" width={hero.width} height={hero.height} sizes="20rem" className={styles.pvPortrait} />
        )}
      </div>
      <p className={styles.caption}>
        {profile.name}, {profile.role.toLowerCase()}.
      </p>
    </>
  );

  previews[sectionIds.work] = (
    <>
      <div className={styles.pvCovers}>
        {first && (
          <Image
            src={first.src}
            alt=""
            width={first.width}
            height={first.height}
            sizes="22rem"
            className={`${styles.pvCover} ${styles.pvCoverA}`}
          />
        )}
        {second && (
          <Image
            src={second.src}
            alt=""
            width={second.width}
            height={second.height}
            sizes="22rem"
            className={`${styles.pvCover} ${styles.pvCoverB}`}
          />
        )}
      </div>
      <p className={styles.caption}>{projects.map((project) => project.name).join(" · ")}</p>
    </>
  );

  previews[sectionIds.experience] = (
    <ol className={styles.pvList}>
      {getExperience().map((role) => {
        const dates = formatMonthRange(role.dates);
        return (
          <li key={role.id}>
            <span className={styles.pvTitle}>{role.role}</span>
            <span className={styles.pvMeta}>
              {role.organization} · {dates.start} — {dates.end}
            </span>
          </li>
        );
      })}
    </ol>
  );

  previews[sectionIds.focus] = (
    <ul className={styles.pvList}>
      {getCapabilityClusters().map((cluster) => (
        <li key={cluster.id}>
          <span className={styles.pvTitle}>{cluster.label}</span>
          <span className={styles.pvMeta}>
            {cluster.capabilities
              .slice(0, 4)
              .map((capability) => capability.name)
              .join(" · ")}
          </span>
        </li>
      ))}
    </ul>
  );

  if (degree) {
    previews[sectionIds.education] = (
      <div className={styles.pvList}>
        <span>
          <span className={styles.pvTitle}>{degree.degree}</span>
          <span className={styles.pvMeta}>
            {degree.institution}
            {degree.location && `, ${degree.location}`}
          </span>
        </span>
        <span className={styles.pvMeta}>
          {degree.dates.start}–{degree.dates.end ?? "Present"}
          {degree.result && ` · ${degree.result.label} ${degree.result.value}`}
        </span>
      </div>
    );
  }

  if (about) {
    previews[sectionIds.about] = (
      <>
        <Image src={about.src} alt="" width={about.width} height={about.height} sizes="22rem" className={styles.pvSquare} />
        <p className={styles.caption}>Current direction</p>
      </>
    );
  }

  previews[sectionIds.leetcode] = (
    <div className={styles.pvSheet}>
      <span className="block w-44 rounded-sm border border-border-strong bg-surface p-4">
        <span className="flex items-center justify-between text-caption font-mono text-accent">
          <span>LEETCODE / DSA</span>
          <span>● ACTIVE</span>
        </span>
        <span className="mt-2 block text-body-sm font-medium text-foreground">
          The Problem-Solving Lab
        </span>
        <span className="mt-2.5 flex flex-wrap gap-1">
          {["Arrays", "Trees", "Graphs", "DP"].map((topic) => (
            <span key={topic} className="rounded bg-surface-elevated px-1.5 py-0.5 text-[10px] text-muted">
              {topic}
            </span>
          ))}
        </span>
      </span>
    </div>
  );

  previews[sectionIds.community] = (
    <div className={styles.pvSheet}>
      <span className="block w-48 rounded-sm border border-border-strong bg-surface p-4">
        <span className="flex items-center justify-between text-caption font-mono text-accent">
          <span>COMMUNITY</span>
          <span>● AWS 2025/2026</span>
        </span>
        <span className="mt-2 block text-body-sm font-medium text-foreground">
          AWS Community Day
        </span>
        <span className="mt-2 block text-caption text-secondary">
          Dehradun · Cloud Community
        </span>
      </span>
    </div>
  );

  if (profile.resume) {
    previews[sectionIds.resume] = (
      <div className={styles.pvSheet}>
        <span className="block w-40 rounded-sm border border-border-strong bg-surface p-5">
          <span className="block h-1.5 w-10 bg-accent" />
          <span className="mt-4 block space-y-2">
            {[100, 86, 94, 62, 100, 78].map((width, i) => (
              <span key={i} className="block h-px bg-border-strong" style={{ width: `${width}%` }} />
            ))}
          </span>
        </span>
      </div>
    );
  }

  previews[sectionIds.contact] = (
    <ul className={styles.pvList}>
      {getSocialLinks().map((link) => (
        <li key={link.id}>
          <span className={styles.pvTitle}>{link.label}</span>
          <span className={styles.pvMeta}>{displayHref(link.href)}</span>
        </li>
      ))}
    </ul>
  );

  return previews;
}
