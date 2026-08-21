"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import {
  GraduationCap, Award, Sparkles, CheckCircle2, Code, ShieldCheck, Send, ArrowUpRight,
} from "lucide-react";

/* ── useInView ── */
function useInView(threshold = 0.15) {
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

/* ── Glowing icon orb ── */
function IconOrb({
  icon: Icon, color, glow, label,
}: { icon: React.ElementType; color: string; glow: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex flex-col items-center gap-2 cursor-default"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-400"
        style={{
          borderColor: `${glow}`,
          background: hov ? `${glow.replace("0.3", "0.15")}` : `${glow.replace("0.3", "0.06")}`,
          boxShadow: hov ? `0 0 20px ${glow}, 0 0 40px ${glow.replace("0.3", "0.1")}` : "none",
          transform: hov ? "scale(1.12) translateY(-2px)" : "scale(1)",
        }}
      >
        <Icon className="w-5 h-5 transition-all duration-300" style={{ color, filter: hov ? `drop-shadow(0 0 6px ${color})` : "none" }} />
      </div>
      <div className="font-mono text-[9px] text-[#6B6280] text-center leading-tight max-w-[60px]">{label}</div>
    </div>
  );
}

/* ── Cert card with left-border sweep ── */
function CertCard({ title, issuer, highlight, delay }: { title: string; issuer: string; highlight: string; delay: number }) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className="relative flex items-start gap-3 p-3 rounded-xl border border-[#231E38] overflow-hidden transition-all duration-500"
      style={{
        background: "#08070F",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Animated left border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-all duration-700"
        style={{
          background: "linear-gradient(to bottom, #7C3AED, #10B981)",
          boxShadow: "0 0 8px rgba(124,58,237,0.5)",
          transform: visible ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          transitionDelay: `${delay + 200}ms`,
        }}
      />
      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
      <div className="flex-1 pl-1">
        <div className="font-sans text-xs text-[#F5F5F0] font-semibold leading-snug">{title}</div>
        <div className="font-mono text-[10px] text-[#73737C] flex items-center justify-between mt-0.5 gap-2 flex-wrap">
          <span>{issuer}</span>
          <span style={{ color: "var(--accent)" }}>{highlight}</span>
        </div>
      </div>
    </div>
  );
}

export function AboutCreative() {
  const { ref: sectionRef, visible: sectionVisible } = useInView(0.1);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 md:py-36 border-t border-[#1E1830] relative bg-transparent overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute w-[500px] h-[400px] rounded-full top-0 right-0"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)", filter: "blur(50px)" }} />
        <div className="absolute w-[400px] h-[350px] rounded-full bottom-0 left-0"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)", filter: "blur(40px)" }} />
      </div>

      <Container>
        {/* ── Section Header ── */}
        <div
          ref={sectionRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 transition-all duration-700"
          style={{ opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase font-bold">
                05 / About &amp; Background
              </span>
              <div className="h-px w-12 bg-[var(--accent)]/40" />
            </div>
            <h2
              id="about-heading"
              className="font-display font-extrabold tracking-tight"
              style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
            >
              <span className="text-[#F5F5F0]">Philosophy </span>
              <span
                className="gradient-animate"
                style={{ backgroundImage: "linear-gradient(135deg,#7C3AED,#D946EF,#10B981,#7C3AED)" }}
              >
                &amp; Credentials
              </span>
            </h2>
          </div>
          <p className="font-sans text-sm text-[#6B6280] max-w-sm leading-relaxed">
            Computer science student, backend enthusiast, and full-stack software engineer.
          </p>
        </div>

        {/* ── 3-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* COL 1: Philosophy (5 cols) */}
          <div
            className="lg:col-span-5 p-8 flex flex-col justify-between rounded-2xl border border-[#231E38] transition-all duration-700 group relative overflow-hidden"
            style={{
              background: "#0B0917",
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "0.1s",
            }}
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(90deg,#7C3AED,#D946EF,#10B981)" }} />
            {/* Hover bloom */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{ background: "radial-gradient(500px circle at 50% 0%, rgba(124,58,237,0.07), transparent 60%)" }} />

            <div className="relative z-10">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase mb-4"
                style={{ color: "var(--accent)" }}>
                <Sparkles className="w-4 h-4" />
                Core Engineering Philosophy
              </div>

              <h3 className="font-display font-bold text-2xl text-[#F5F5F0] leading-snug mb-6">
                I build software that{" "}
                <span className="glow-text-pulse" style={{ color: "var(--accent)" }}>
                  solves real problems
                </span>{" "}
                — reliably, thoughtfully, and at production grade.
              </h3>

              <div className="space-y-4 font-sans text-[14px] text-[#A3A3A8] leading-relaxed">
                <p>
                  I am a third-year B.Tech Computer Science student at UPES Dehradun with hands-on commercial experience from two software engineering internships. My work spans full-stack web development, relational database architecture, and cross-platform native Android compilation.
                </p>
                <p>
                  I am particularly drawn to backend systems and data integrity — the architectural decisions that make applications scale reliably without downtime or data corruption.
                </p>
              </div>
            </div>

            {/* Micro highlight icon orbs */}
            <div className="relative z-10 flex flex-row justify-between pt-8 mt-6 border-t border-[#1E1830]">
              <IconOrb icon={Sparkles}    color="#F59E0B" glow="rgba(245,158,11,0.3)"   label="Clean Architecture"  />
              <IconOrb icon={CheckCircle2} color="#22C55E" glow="rgba(34,197,94,0.3)"    label="Type-Safe & Tested"  />
              <IconOrb icon={ShieldCheck}  color="#38BDF8" glow="rgba(56,189,248,0.3)"   label="Relational Integrity"/>
              <IconOrb icon={Code}         color="#A855F7" glow="rgba(168,85,247,0.3)"   label="PostgreSQL & RLS"    />
            </div>
          </div>

          {/* COL 2: Education + Certifications (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">

            {/* Education Card */}
            <div
              className="p-6 rounded-2xl border border-[#231E38] group relative overflow-hidden transition-all duration-700 hover:border-[var(--accent)]/40 hover:shadow-[0_0_30px_-8px_var(--accent-glow)]"
              style={{
                background: "#0B0917",
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "0.2s",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "linear-gradient(90deg,#7C3AED,#10B981)" }} />

              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#73737C] uppercase tracking-wider font-bold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                  Formal Education
                </span>
                <span
                  className="font-display font-black text-sm px-2.5 py-1 rounded-lg"
                  style={{
                    background: "rgba(124,58,237,0.12)",
                    color: "#A78BFA",
                    border: "1px solid rgba(124,58,237,0.25)",
                    textShadow: "0 0 10px rgba(124,58,237,0.5)",
                  }}
                >
                  8.24 CGPA
                </span>
              </div>
              <div className="font-display font-bold text-xl text-[#F5F5F0] mb-1">B.Tech Computer Science</div>
              <div className="font-mono text-xs text-[#A3A3A8]">UPES Dehradun · 2024–2028</div>
              <div className="pt-4 border-t border-[#1E1830] mt-4 flex items-center justify-between font-mono text-[10px] text-[#73737C]">
                <span>Status: In Progress (3rd Year)</span>
                <span className="text-[#22C55E]">Dehradun, India</span>
              </div>
            </div>

            {/* Certifications Card */}
            <div
              className="p-6 rounded-2xl border border-[#231E38] transition-all duration-700"
              style={{
                background: "#0B0917",
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "0.3s",
              }}
            >
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#73737C] uppercase tracking-wider font-bold mb-5">
                <Award className="w-4 h-4 text-[var(--accent)]" />
                Verified Certifications
              </div>
              <div className="space-y-3">
                <CertCard
                  title="Oracle Cloud Infrastructure Foundations Associate"
                  issuer="Oracle OCI Certified"
                  highlight="Cloud Architecture"
                  delay={400}
                />
                <CertCard
                  title="Google Cloud Study Jams 2025"
                  issuer="Google · 20 Skill Boost Badges"
                  highlight="GCP Lab Badges"
                  delay={520}
                />
                <CertCard
                  title="Business Etiquette & Workplace Communication"
                  issuer="University of Queensland"
                  highlight="Professional Skills"
                  delay={640}
                />
              </div>
            </div>
          </div>

          {/* COL 3: Contact CTA (3 cols) */}
          <div
            className="lg:col-span-3 transition-all duration-700"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "0.4s",
            }}
          >
            <div
              className="p-6 rounded-2xl border border-[#231E38] flex flex-col gap-5 group relative overflow-hidden h-full"
              style={{ background: "#0B0917" }}
            >
              {/* Animated gradient background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(400px circle at 50% 100%, rgba(124,58,237,0.1), transparent 70%)" }}
              />

              <div className="relative z-10 flex flex-col gap-5 h-full">
                <div>
                  <div className="font-mono text-[9px] text-[var(--accent)] uppercase tracking-widest font-bold mb-1">
                    In-Hire Connection
                  </div>
                  <div className="font-mono text-[10px] text-[#6B6280] uppercase tracking-wider">
                    2026 Opportunities
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-xl text-[#F0EEF8] leading-snug">
                  Let&apos;s build something{" "}
                  <span style={{ color: "var(--accent)" }} className="glow-text-pulse">
                    remarkable
                  </span>{" "}
                  together.
                </h3>

                <a
                  href={`mailto:${siteConfig.contact.email}?subject=Internship%20Opportunity`}
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white font-sans transition-all duration-300 hover:scale-105 hover:brightness-110"
                  style={{
                    background: "linear-gradient(135deg,#7C3AED,#6D28D9)",
                    boxShadow: "0 0 24px rgba(124,58,237,0.45)",
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  Send an Email
                </a>

                <div className="font-mono text-[10px] text-[#6B6280] break-all">{siteConfig.contact.email}</div>

                <div className="h-px bg-[#1E1830]" />

                <div className="space-y-3 mt-auto">
                  {[
                    { label: "GitHub", sub: "View Projects →", href: siteConfig.links.github },
                    { label: "LinkedIn", sub: "View Profile →", href: siteConfig.links.linkedin },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/s flex items-center gap-2.5 text-[#A3A3A8] hover:text-[#F0EEF8] transition-colors p-2 -mx-2 rounded-lg hover:bg-[var(--accent-dim)]"
                    >
                      <div className="flex flex-col flex-1">
                        <span className="font-display font-bold text-xs text-[#F0EEF8]">{s.label}</span>
                        <span className="font-mono text-[9px] text-[#6B6280] group-hover/s:text-[var(--accent)] transition-colors">{s.sub}</span>
                      </div>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 opacity-0 group-hover/s:opacity-100 transition-all duration-200 group-hover/s:translate-x-0.5 group-hover/s:-translate-y-0.5"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


