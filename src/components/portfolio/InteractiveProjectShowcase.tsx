"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Link } from "@/components/ui/Link";
import { ArrowRight, ArrowUpRight, Sparkles, Database, Globe } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeContext";
import { sound } from "@/components/ui/SoundEffects";

/* ── scroll-triggered visibility hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── project card ── */
interface ProjectCardProps {
  image: string;
  imageAlt: string;
  badge?: React.ReactNode;
  role: string;
  title: string;
  description: string;
  quote?: string;
  tags: string[];
  href: string;
  cta: string;
  accentFrom: string;
  accentTo: string;
  accentGlow: string;
  delay: number;
}

function ProjectCard({
  image, imageAlt, badge, role, title, description, quote,
  tags, href, cta, accentFrom, accentTo, accentGlow, delay,
}: ProjectCardProps) {
  const { ref, visible } = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="relative flex flex-col rounded-2xl border border-[#231E38] overflow-hidden group"
      style={{
        background: "#0B0917",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, box-shadow 0.35s ease, border-color 0.35s ease`,
        boxShadow: hovered ? `0 0 40px -10px ${accentGlow}` : "none",
        borderColor: hovered ? `${accentGlow}` : "#231E38",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})`,
          boxShadow: `0 0 10px ${accentGlow}`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Hover background bloom */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${accentGlow.replace("0.35", "0.08")}, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Image area */}
      <div className="relative aspect-[16/10] bg-[#05040A] border-b border-[#231E38] overflow-hidden flex items-center justify-center p-3">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-contain transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.8))" }}
        />
        {/* Shimmer overlay on hover */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 40%, ${accentGlow.replace("0.35", "0.06")} 60%, transparent 80%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>

      {/* Body */}
      <div className="relative z-10 p-6 flex flex-col flex-1 gap-4">
        {/* Header row */}
        <div className="flex items-center justify-between gap-2">
          {badge ?? null}
          <span className="font-mono text-[10px] text-[#6B6280] uppercase tracking-wider">{role}</span>
        </div>

        {/* Title + desc */}
        <div>
          <h3
            className="font-display font-extrabold text-2xl mb-1.5 transition-colors duration-300"
            style={{ color: hovered ? accentTo : "#F0EEF8" }}
          >
            {title}
          </h3>
          <p className="font-sans text-[13px] text-[#A89EC0] leading-relaxed">{description}</p>
          {quote && (
            <p className="font-sans text-[12px] italic mt-2 transition-colors duration-300" style={{ color: accentFrom }}>
              &ldquo;{quote}&rdquo;
            </p>
          )}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2.5 py-1 rounded-md border transition-all duration-300"
              style={{
                borderColor: hovered ? `${accentGlow.replace("0.35", "0.4")}` : "#231E38",
                background: hovered ? `${accentGlow.replace("0.35", "0.08")}` : "transparent",
                color: hovered ? accentTo : "#A89EC0",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-1">
          <Link
            href={href}
            onClick={() => { if (typeof window !== "undefined") {} }}
            className="group/btn w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden"
            style={{
              color: hovered ? "#fff" : "#F0EEF8",
              background: hovered ? `linear-gradient(135deg, ${accentFrom}, ${accentTo})` : "#0D0A1A",
              border: `1px solid ${hovered ? accentGlow : "#231E38"}`,
              boxShadow: hovered ? `0 0 20px ${accentGlow}` : "none",
            }}
          >
            {cta}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function InteractiveProjectShowcase() {
  const { soundEnabled } = useTheme();
  const { ref: headerRef, visible: headerVisible } = useInView(0.2);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-32 md:py-44 border-t border-[#1E1830] relative bg-transparent overflow-hidden"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute w-[600px] h-[600px] top-1/4 -right-40 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(rgba(139,92,246,0.8) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <Container className="relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase font-bold">
                02 / Selected Works
              </span>
              <div
                className="h-px flex-1 max-w-[60px] transition-all duration-700"
                style={{
                  background: "var(--accent)",
                  transform: headerVisible ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transitionDelay: "0.3s",
                  opacity: 0.5,
                }}
              />
            </div>
            <h2
              id="work-heading"
              className="font-display font-extrabold tracking-tight"
              style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
            >
              <span className="text-[#F5F5F0]">Engineered </span>
              <span
                className="gradient-animate"
                style={{
                  backgroundImage: "linear-gradient(135deg,#7C3AED,#EC4899,#F43F5E,#7C3AED)",
                }}
              >
                for Production
              </span>
            </h2>
          </div>
          <Link
            href="/projects"
            onClick={() => { if (soundEnabled) sound.playClick(); }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold text-[#F0EEF8] border border-[#231E38] bg-[#0D0A1A] hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all duration-300 hover:shadow-[0_0_15px_var(--accent-glow)]"
          >
            View All Projects
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <ProjectCard
            image="/showcase/veylo-prep-hero.png"
            imageAlt="VeyloPrep Screenshot"
            badge={
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[9px] uppercase font-bold"
                style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", color: "#A78BFA" }}>
                <Sparkles className="w-2.5 h-2.5" /> Flagship Build
              </span>
            }
            role="Full-Stack Developer"
            title="VeyloPrep"
            description="Application and opportunity tracking platform with career resources and modular workflows."
            quote="Application and opportunity tracking, built for job seekers."
            tags={["Next.js", "TypeScript", "PostgreSQL", "Capacitor"]}
            href="/projects/veyloprep"
            cta="Full Case Study"
            accentFrom="#7C3AED"
            accentTo="#C084FC"
            accentGlow="rgba(124,58,237,0.35)"
            delay={80}
          />

          <ProjectCard
            image="/images/projects/splitsync.jpg"
            imageAlt="Split-Sync Mockup"
            badge={
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[9px] uppercase font-bold"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34D399" }}>
                <Database className="w-2.5 h-2.5" /> Real-Time DB
              </span>
            }
            role="Full-Stack Developer"
            title="Split-Sync"
            description="Group expense management application with real-time balances and settlements."
            tags={["Next.js", "React", "Supabase", "Tailwind CSS"]}
            href="/projects/split-sync"
            cta="Explore Case Study"
            accentFrom="#10B981"
            accentTo="#06B6D4"
            accentGlow="rgba(16,185,129,0.35)"
            delay={180}
          />

          <ProjectCard
            image="/images/projects/engineereddev.jpg"
            imageAlt="Engineered.dev Mockup"
            badge={
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[9px] uppercase font-bold"
                style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", color: "#38BDF8" }}>
                <Globe className="w-2.5 h-2.5" /> Content Platform
              </span>
            }
            role="Full-Stack Developer"
            title="Engineered.dev"
            description="Technical publication platform for cloud computing, backend engineering, and system design."
            tags={["Next.js", "React", "Firebase", "PayloadCMS"]}
            href="/projects/engineered-dev"
            cta="Explore Case Study"
            accentFrom="#38BDF8"
            accentTo="#6366F1"
            accentGlow="rgba(56,189,248,0.3)"
            delay={280}
          />
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-12 flex items-center justify-center gap-3 pt-8 border-t border-[#1E1830]"
          style={{ opacity: 0, animation: "card-enter 0.65s cubic-bezier(0.16,1,0.3,1) 0.5s forwards" }}
        >
          <span className="font-mono text-xs text-[#4B4860]">More projects available on</span>
          <a
            href="https://github.com/krishikarajput"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] hover:brightness-125 transition-all draw-underline"
          >
            GitHub ↗
          </a>
        </div>
      </Container>
    </section>
  );
}
