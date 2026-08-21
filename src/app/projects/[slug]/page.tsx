import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getAllProjectSlugs, getProjectsSorted } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { VeyloPrepCaseStudy } from "@/components/portfolio/VeyloPrepCaseStudy";
import { SplitSyncCaseStudy } from "@/components/portfolio/SplitSyncCaseStudy";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} — Architecture & Technical Case Study`,
    description: project.tagline,
    openGraph: {
      type: "website",
      url: `${siteConfig.url}/projects/${project.slug}`,
      title: `${project.name} | Technical Case Study`,
      description: project.tagline,
    },
    alternates: {
      canonical: `${siteConfig.url}/projects/${project.slug}`,
    },
  };
}

function CaseRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 py-12 border-b border-[#181820] last:border-b-0">
      <div className="lg:col-span-3">
        <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-[0.2em] font-bold">
          {label}
        </span>
      </div>
      <div className="lg:col-span-9">{children}</div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = getProjectsSorted();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const { name, tagline, description, technologies, role, links, tier, caseStudy } = project;

  return (
    <div className="bg-[#08080A] min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        aria-label={`${name} — Project Detail`}
        className="relative pt-28 pb-16 md:pb-24 overflow-hidden border-b border-[#181820]"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none bg-grid opacity-50"
          aria-hidden="true"
        />
        <div
          className="blob blob-1 w-[500px] h-[500px] -top-20 -right-20 opacity-20"
          style={{ background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)" }}
        />

        {/* Large watermark text */}
        <span
          aria-hidden="true"
          className="absolute right-8 top-20 select-none pointer-events-none leading-none opacity-5 font-display font-extrabold text-[clamp(100px,16vw,240px)] text-white"
        >
          {name}
        </span>

        <Container className="relative z-10">
          {/* Back link */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#A3A3A8] hover:text-[var(--accent)] transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </Link>

          {/* Tier badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="accent-badge">
              <Sparkles className="w-3 h-3" />
              {tier.toUpperCase()} ARCHITECTURE
            </span>
          </div>

          {/* Project title */}
          <h1
            className="font-display font-extrabold leading-[0.94] tracking-tight text-[#F5F5F0] mb-6 text-[clamp(2.5rem,7vw,5rem)]"
          >
            {name}
          </h1>

          <p className="font-sans text-xl text-[#A3A3A8] max-w-2xl leading-relaxed mb-12">
            {tagline}
          </p>

          {/* Meta row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-[#181820]">
            <div className="bg-[#121218] p-4 rounded-lg border border-[#23232B]">
              <div className="font-mono text-[10px] text-[#73737C] uppercase tracking-wider mb-1">Developer Role</div>
              <div className="font-sans text-sm text-[#F5F5F0] font-semibold">{role}</div>
            </div>

            <div className="bg-[#121218] p-4 rounded-lg border border-[#23232B] sm:col-span-2">
              <div className="font-mono text-[10px] text-[#73737C] uppercase tracking-wider mb-2">Technology Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Case Study Body ────────────────────────────────────────── */}
      <section aria-labelledby="case-study-heading" className="py-16 md:py-24">
        <Container>
          <h2 id="case-study-heading" className="sr-only">Case Study Details</h2>

          {slug === "veyloprep" ? (
            <VeyloPrepCaseStudy />
          ) : slug === "split-sync" || slug === "splitsync" ? (
            <SplitSyncCaseStudy />
          ) : (
            <>
              {/* Premium 3D Project Image Mockup */}
              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl mb-20 animate-float-up">
                {/* The 3D rotating container */}
                <div className="card-3d w-full h-full relative border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden bg-[#0D0A1A] group">
                  
                  {/* Animated Light Sweep Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 z-10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(139,92,246,0.15)] to-transparent -translate-x-full group-hover:animate-[packet-flow-x_2s_ease-in-out_infinite]"></div>
                  </div>

                  {/* The Image */}
                  <img 
                    src={`/images/projects/${slug}.jpg`} 
                    alt={`${name} Interface`} 
                    className="w-full h-full object-cover object-top filter brightness-[0.85] contrast-[1.1] group-hover:brightness-100 transition-all duration-700"
                  />
                </div>
                
                {/* Ambient Glow behind the card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent)] to-[#D946EF] opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 -z-10 rounded-[3rem]"></div>
              </div>

              {/* Overview */}
              <CaseRow label="Overview">
                <p className="font-sans text-base text-[#A3A3A8] leading-relaxed max-w-3xl">
                  {description}
                </p>
              </CaseRow>

              {caseStudy ? (
                <>
                  {caseStudy.problemContext && (
                    <CaseRow label="Problem & Context">
                      <p className="font-sans text-base text-[#A3A3A8] leading-relaxed max-w-3xl">
                        {caseStudy.problemContext}
                      </p>
                    </CaseRow>
                  )}

                  {caseStudy.solution && (
                    <CaseRow label="Engineered Solution">
                      <p className="font-sans text-base text-[#A3A3A8] leading-relaxed max-w-3xl">
                        {caseStudy.solution}
                      </p>
                    </CaseRow>
                  )}

                  {caseStudy.architectureDescription && (
                    <CaseRow label="System Architecture">
                      <p className="font-sans text-base text-[#A3A3A8] leading-relaxed max-w-3xl mb-6">
                        {caseStudy.architectureDescription}
                      </p>
                      {caseStudy.architectureItems && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {caseStudy.architectureItems.map((item, i) => (
                            <SpotlightCard
                              key={i}
                              className="flex items-start gap-3.5 p-4 border border-[#23232B]"
                            >
                              <span className="font-mono text-xs text-[var(--accent)] font-bold shrink-0 mt-0.5">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="font-mono text-xs text-[#F5F5F0]">{item}</span>
                            </SpotlightCard>
                          ))}
                        </div>
                      )}
                    </CaseRow>
                  )}

                  {caseStudy.decisions && caseStudy.decisions.length > 0 && (
                    <CaseRow label="Key Decisions">
                      <div className="space-y-6">
                        {caseStudy.decisions.map((dec, i) => (
                          <div
                            key={i}
                            className="bg-[#121218] border-l-4 border-[var(--accent)] p-5 rounded-r-lg border-y border-r border-[#23232B]"
                          >
                            <h3 className="font-display font-bold text-lg text-[#F5F5F0] mb-2 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-[var(--accent)]" />
                              <span>{dec.title}</span>
                            </h3>
                            <p className="font-sans text-sm text-[#A3A3A8] leading-relaxed max-w-3xl">
                              {dec.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CaseRow>
                  )}

                  {caseStudy.challenges && caseStudy.challenges.length > 0 && (
                    <CaseRow label="Challenges Overcome">
                      <div className="space-y-6">
                        {caseStudy.challenges.map((ch, i) => (
                          <div
                            key={i}
                            className="bg-[#121218] border-l-4 border-[#F59E0B] p-5 rounded-r-lg border-y border-r border-[#23232B]"
                          >
                            <h3 className="font-display font-bold text-lg text-[#F5F5F0] mb-2 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                              <span>{ch.title}</span>
                            </h3>
                            <p className="font-sans text-sm text-[#A3A3A8] leading-relaxed max-w-3xl">
                              {ch.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CaseRow>
                  )}

                  {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
                    <CaseRow label="Key Outcomes">
                      <ul className="space-y-4">
                        {caseStudy.outcomes.map((out, i) => (
                          <li key={i} className="flex items-start gap-3 bg-[#121218] p-3.5 rounded-lg border border-[#23232B]">
                            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                            <span className="font-sans text-sm text-[#F5F5F0] leading-relaxed max-w-3xl">{out}</span>
                          </li>
                        ))}
                      </ul>
                    </CaseRow>
                  )}

                  {caseStudy.learnings && caseStudy.learnings.length > 0 && (
                    <CaseRow label="Core Learnings">
                      <ul className="space-y-4">
                        {caseStudy.learnings.map((ln, i) => (
                          <li key={i} className="flex items-start gap-3 bg-[#121218] p-3.5 rounded-lg border border-[#23232B]">
                            <ArrowRight className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                            <span className="font-sans text-sm text-[#A3A3A8] leading-relaxed max-w-3xl">{ln}</span>
                          </li>
                        ))}
                      </ul>
                    </CaseRow>
                  )}
                </>
              ) : (
                <CaseRow label="Case Study">
                  <p className="font-display text-xl font-bold text-[#F5F5F0] mb-2">Coming soon</p>
                  <p className="font-sans text-sm text-[#73737C] max-w-md leading-relaxed">
                    A detailed engineering breakdown will be published here.
                  </p>
                </CaseRow>
              )}

              {/* Action CTAs */}
              <div className="pt-12 flex flex-wrap gap-4">
                {links?.live && (
                  <Button href={links.live} variant="primary" external>
                    Live Project ↗
                  </Button>
                )}
                {links?.github && (
                  <Button href={links.github} variant="secondary" external>
                    View Source ↗
                  </Button>
                )}
                {!links?.live && !links?.github && (
                  <span className="inline-flex items-center font-mono text-xs text-[#73737C] border border-[#23232B] px-4 py-2 rounded-lg bg-[#121218]">
                    Repository Private · Commercial Production Code
                  </span>
                )}
              </div>
            </>
          )}

        </Container>
      </section>

      {/* ── Next Project Navigator ─────────────────────────────────── */}
      <section
        aria-label="Next project"
        className="border-t border-[#181820] py-20 bg-[#060608]"
      >
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] text-[#73737C] uppercase tracking-widest block mb-1">
                Next Case Study
              </span>
              <span className="font-mono text-xs text-[var(--accent)]">
                {nextProject.tagline}
              </span>
            </div>
            
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg p-3 bg-[#121218] border border-[#23232B] hover:border-[var(--accent)] transition-all"
            >
              <span className="font-display font-extrabold text-2xl md:text-3xl text-[#F5F5F0] group-hover:text-[var(--accent)] transition-colors tracking-tight">
                {nextProject.name}
              </span>
              <ArrowRight className="w-5 h-5 text-[var(--accent)] transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
