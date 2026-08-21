"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { experience } from "@/data/portfolio";

/* ─────── Intersection reveal hook ─────── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────── Animated number counter ─────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let cur = 0;
      const step = to / 50;
      const id = setInterval(() => {
        cur += step;
        if (cur >= to) { setVal(to); clearInterval(id); }
        else setVal(Math.floor(cur));
      }, 28);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────── Tech pill with colour coding ─────── */
const CHIP_MAP: Record<string, { bg: string; text: string; glow: string }> = {
  "Next.js":      { bg: "#18181b", text: "#ffffff", glow: "rgba(255,255,255,0.18)" },
  "React":        { bg: "#0e2a36", text: "#61DAFB", glow: "rgba(97,218,251,0.2)" },
  "React.js":     { bg: "#0e2a36", text: "#61DAFB", glow: "rgba(97,218,251,0.2)" },
  "TypeScript":   { bg: "#0d1f3c", text: "#60A5FA", glow: "rgba(49,120,198,0.25)" },
  "PostgreSQL":   { bg: "#0c1f2e", text: "#93C5FD", glow: "rgba(51,103,145,0.25)" },
  "Tailwind CSS": { bg: "#0b2230", text: "#38BDF8", glow: "rgba(56,189,248,0.2)" },
  "CSS":          { bg: "#0d1f3c", text: "#93C5FD", glow: "rgba(21,114,182,0.2)" },
  "HTML":         { bg: "#2a0e08", text: "#FCA5A5", glow: "rgba(227,79,38,0.2)" },
};

function TechPill({ label }: { label: string }) {
  const c = CHIP_MAP[label] ?? { bg: "rgba(124,58,237,0.12)", text: "var(--accent)", glow: "rgba(124,58,237,0.25)" };
  return (
    <span
      className="inline-flex items-center font-mono text-[11px] tracking-wide px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105"
      style={{
        background: c.bg,
        color: c.text,
        borderColor: `${c.glow}`,
        boxShadow: `0 0 10px ${c.glow}`,
      }}
    >
      {label}
    </span>
  );
}

/* ─────── Shutter wipe overlay ─────── */
function ShutterCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView(0.15);
  const BLADES = 8;
  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl">
      {children}
      {/* blades sweep from right → left as they disappear */}
      {Array.from({ length: BLADES }).map((_, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute inset-x-0"
          style={{
            top: `${(i / BLADES) * 100}%`,
            height: `${100 / BLADES + 0.3}%`,
            background: "linear-gradient(90deg,#0D0A1A,#08070F)",
            transformOrigin: "right center",
            transform: visible ? "scaleX(0)" : "scaleX(1)",
            transition: `transform 0.55s cubic-bezier(0.77,0,0.175,1)`,
            transitionDelay: visible ? `${delay + i * 60}ms` : "0ms",
            zIndex: 30,
          }}
        />
      ))}
    </div>
  );
}

/* ─────── MAIN COMPONENT ─────── */
export function ExperienceCircuit() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-32 md:py-44 border-t border-[#1E1830] relative overflow-hidden bg-transparent"
    >
      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute rounded-full"
          style={{
            width: 700, height: 600,
            top: "-20%", left: "-15%",
            background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            bottom: "-10%", right: "-10%",
            background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Scanline grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(139,92,246,0.6) 40px)",
          }}
        />
      </div>

      <Container>
        {/* ── Section label ── */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase font-bold">
            03 / Career Milestones
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent)]/40 to-transparent" />
        </div>

        {/* ── Giant heading ── */}
        <div className="mb-16">
          <h2
            id="experience-heading"
            className="font-display font-black leading-[0.9] tracking-tighter"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="text-[#F5F5F0]">Production </span>
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg,#7C3AED 0%,#C084FC 50%,#10B981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Engineering
            </span>
            <br />
            <span className="text-[#F5F5F0]">Journey</span>
          </h2>
          <p className="mt-5 font-sans text-base text-[#6B6280] max-w-sm leading-relaxed">
            Commercial internships delivering production web architectures and responsive interfaces.
          </p>
        </div>

        {/* ── Stat pills ── */}
        <div className="flex flex-wrap gap-4 mb-20">
          {[
            { value: 2, suffix: "", label: "Internships Completed" },
            { value: 14, suffix: " mo", label: "Industry Exposure" },
            { value: 8, suffix: "+", label: "Technologies Used" },
          ].map((s, i) => (
            <div
              key={i}
              className="group flex items-center gap-3 px-5 py-3 rounded-full border border-[#231E38] bg-[#0D0A1A] hover:border-[var(--accent)]/60 transition-all duration-300 hover:shadow-[0_0_20px_var(--accent-glow)]"
            >
              <span className="font-display font-black text-2xl text-[#F0EEF8]">
                <Counter to={s.value} suffix={s.suffix} />
              </span>
              <span className="font-mono text-[10px] text-[#6B6280] uppercase tracking-widest">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Experience Cards ── */}
        <div className="flex flex-col gap-6">
          {experience.map((exp, index) => {
            const accent = index === 0
              ? { from: "#7C3AED", to: "#C084FC", glow: "rgba(124,58,237,0.35)" }
              : { from: "#10B981", to: "#06B6D4", glow: "rgba(16,185,129,0.3)" };

            return (
              <ShutterCard key={exp.id || index} delay={index * 120}>
                <article
                  className="group relative border border-[#231E38] bg-[#0B0917] overflow-hidden"
                  style={{ borderRadius: "1.5rem" }}
                >
                  {/* Gradient top edge */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                      boxShadow: `0 0 16px ${accent.glow}`,
                    }}
                  />

                  {/* Hover spotlight glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(600px circle at 0% 50%, ${accent.glow} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Watermark number */}
                  <div
                    className="absolute right-6 top-1/2 -translate-y-1/2 font-display font-black select-none pointer-events-none leading-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500"
                    style={{ fontSize: "clamp(6rem,14vw,12rem)", color: accent.to }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10 flex flex-col lg:flex-row">

                    {/* ── LEFT PANEL ── */}
                    <div
                      className="lg:w-80 shrink-0 flex flex-col justify-between p-8 lg:p-10 lg:border-r border-[#1E1830]"
                    >
                      {/* Index + date */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase"
                            style={{ color: accent.from }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="h-px flex-1 bg-[#1E1830]" />
                        </div>

                        {/* Company */}
                        <h3
                          className="font-display font-extrabold text-2xl sm:text-3xl leading-tight"
                          style={{
                            background: `linear-gradient(135deg, #F0EEF8, ${accent.to})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {exp.organization}
                        </h3>

                        {/* Role */}
                        <div
                          className="inline-flex font-mono text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-lg border"
                          style={{
                            color: accent.to,
                            borderColor: `${accent.glow}`,
                            background: `${accent.glow.replace("0.3", "0.08")}`,
                          }}
                        >
                          {exp.role}
                        </div>
                      </div>

                      {/* Duration badge */}
                      <div className="mt-8 flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ background: accent.from, boxShadow: `0 0 6px ${accent.from}` }}
                        />
                        <span className="font-mono text-[11px] text-[#6B6280]">
                          {exp.dates.start} — {exp.dates.end ?? "Present"}
                        </span>
                      </div>
                    </div>

                    {/* ── RIGHT PANEL ── */}
                    <div className="flex-1 flex flex-col justify-between p-8 lg:p-10 gap-6">
                      {/* Contributions */}
                      {exp.contributions && exp.contributions.length > 0 && (
                        <ul className="space-y-4" aria-label={`Contributions at ${exp.organization}`}>
                          {exp.contributions.map((item, ci) => (
                            <li key={ci} className="group/li flex items-start gap-4">
                              {/* Animated line marker */}
                              <div className="shrink-0 mt-2 flex items-center gap-1">
                                <div
                                  className="h-[2px] transition-all duration-500 group-hover/li:w-6"
                                  style={{
                                    width: "12px",
                                    background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                                    boxShadow: `0 0 6px ${accent.glow}`,
                                  }}
                                />
                              </div>
                              <p className="font-sans text-sm text-[#8B8A9A] leading-relaxed group-hover/li:text-[#D1CFE0] transition-colors duration-300">
                                {item}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech row */}
                      <div className="space-y-3 pt-5 border-t border-[#1E1830]">
                        <span className="font-mono text-[9px] text-[#4B4860] uppercase tracking-[0.2em]">
                          Stack
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((t) => (
                            <TechPill key={t} label={t} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </ShutterCard>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 relative overflow-hidden rounded-2xl">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(16,185,129,0.05) 100%)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: "1rem",
            }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-6">
            <div>
              <p className="font-display font-bold text-lg text-[#F0EEF8]">Open to new opportunities</p>
              <p className="font-sans text-sm text-[#6B6280] mt-1">Internships · Full-time · Contract</p>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-mono text-sm font-bold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #10B981)",
                boxShadow: "0 0 24px rgba(124,58,237,0.4)",
              }}
            >
              Get in touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8.5 3.5 12 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
