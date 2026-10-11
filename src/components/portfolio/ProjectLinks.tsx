import { CtaGroup } from "@/components/portfolio/CtaGroup";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/config/routes";
import { hasCaseStudy } from "@/lib/content";
import type { Project } from "@/types/content";

interface ProjectLinksProps {
  project: Project;
  /** Variant for the case-study link (primary for the flagship). */
  emphasis?: "primary" | "secondary";
  /** Hide the case-study link, e.g. on the case-study page itself. */
  showCaseStudy?: boolean;
  className?: string;
}

/**
 * A project's actions in hierarchy order — case study, live site, source —
 * rendered only for links present in the data. Visible labels stay short;
 * the project name completes each accessible name.
 */
export function ProjectLinks({ project, emphasis = "secondary", showCaseStudy = true, className }: ProjectLinksProps) {
  const { live, repository } = project.links;
  const caseStudy = showCaseStudy && hasCaseStudy(project);
  if (!live && !repository && !caseStudy) return null;

  const forProject = <span className="sr-only">: {project.name}</span>;

  return (
    <CtaGroup className={className}>
      {caseStudy && (
        <ButtonLink href={routes.project(project.slug)} variant={emphasis} size="sm">
          Read case study{forProject}
          <Icon name="arrow-right" />
        </ButtonLink>
      )}
      {live && (
        <ButtonLink href={live} newTab variant={caseStudy ? "text" : "secondary"} size="sm">
          Live site{forProject}
          <Icon name="arrow-up-right" />
        </ButtonLink>
      )}
      {repository && (
        <ButtonLink href={repository} newTab variant="text" size="sm">
          Source{forProject}
          <Icon name="arrow-up-right" />
        </ButtonLink>
      )}
    </CtaGroup>
  );
}
