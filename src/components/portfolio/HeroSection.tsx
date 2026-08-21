"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeContext";
import { sound } from "@/components/ui/SoundEffects";

/* ── Typewriter for role cycle ── */
const ROLES = [
  "Full-Stack Developer",
  "Software Engineer",
  "CS Student @ UPES",
  "Backend Enthusiast",
  "React / Next.js Builder",
];

function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    const target = ROLES[roleIdx];
    if (!deleting) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLES.length);
      }
    }
  }, [displayed, deleting, paused, roleIdx]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-[var(--accent)]">{displayed}</span>
      <span
        className="inline-block w-[2px] h-[1.1em] bg-[var(--accent)] ml-0.5 cursor-blink"
        aria-hidden
      />
    </span>
  );
}

/* ── Animated stat counter ── */
function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center py-4 md:py-0 w-full transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div
        className="font-display text-4xl font-extrabold gradient-animate"
        style={{ backgroundImage: "linear-gradient(135deg,#9333EA,#EC4899,#F43F5E,#9333EA)" }}
      >
        {value}
      </div>
      <div className="font-sans text-xs text-[#94A3B8] font-medium mt-2">{label}</div>
    </div>
  );
}

/* ── Floating particle dots ── */
const PARTICLES = [
  { top: "15%", left: "8%",  dur: "7s",  delay: "0s",   color: "#7C3AED", size: 5 },
  { top: "70%", left: "5%",  dur: "9s",  delay: "1s",   color: "#D946EF", size: 3 },
  { top: "40%", left: "12%", dur: "6s",  delay: "2s",   color: "#38BDF8", size: 4 },
  { top: "85%", left: "18%", dur: "11s", delay: "0.5s", color: "#10B981", size: 3 },
  { top: "25%", left: "92%", dur: "8s",  delay: "1.5s", color: "#7C3AED", size: 4 },
  { top: "55%", left: "88%", dur: "10s", delay: "3s",   color: "#EC4899", size: 3 },
  { top: "75%", left: "94%", dur: "7s",  delay: "2.5s", color: "#38BDF8", size: 5 },
  { top: "10%", left: "80%", dur: "9s",  delay: "0.8s", color: "#F59E0B", size: 3 },
];

export function HeroSection() {
  const { soundEnabled } = useTheme();

  /* Letter-stagger for name */
  const name = "Krishika";
  const letters = name.split("");

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[#08070F]"
    >
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Radial orbs */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: "-20%", left: "-15%",
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)",
            filter: "blur(60px)",
            animation: "blob-drift-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            bottom: "-10%", right: "0%",
            background: "radial-gradient(circle, rgba(217,70,239,0.12) 0%, transparent 60%)",
            filter: "blur(50px)",
            animation: "blob-drift-2 24s ease-in-out infinite",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Scanline sweep */}
        <div
          className="absolute left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.04), transparent)",
            animation: "scanline 8s linear infinite",
          }}
        />
        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top, left: p.left,
              width: p.size, height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              opacity: 0.6,
              animation: `particle-drift ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      <Container className="relative z-20 pt-[80px] pb-16 lg:pt-[60px] lg:pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[70vh]">

          {/* ── Left Column: Text & CTA ── */}
          <div className="flex flex-col gap-5 z-10 w-full lg:w-[52%] pt-10">

            {/* Eyebrow badge */}
            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border text-xs font-mono font-bold animate-float-up"
              style={{
                borderColor: "rgba(124,58,237,0.35)",
                background: "rgba(124,58,237,0.08)",
                color: "#A78BFA",
                animationDelay: "0s",
              }}
            >
              <span className="relative flex w-2 h-2">
                <span className="ping-ring" style={{ color: "#22C55E" }} />
                <span className="relative w-2 h-2 rounded-full bg-[#22C55E]" />
              </span>
              Open to Internships &amp; Full-Time Roles
            </div>

            {/* Hi + Name with letter stagger */}
            <div className="flex flex-col gap-1 animate-float-up" style={{ animationDelay: "0.08s", animationFillMode: "both" }}>
              <span className="font-sans text-[1.5rem] text-[#94A3B8] font-medium tracking-tight">
                Hi, I&apos;m
              </span>
              <h1
                className="font-display font-extrabold leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
                aria-label="Krishika"
              >
                {letters.map((ch, i) => (
                  <span
                    key={i}
                    className="letter-reveal-char"
                    style={{
                      animationDelay: `${0.12 + i * 0.06}s`,
                      background: "linear-gradient(135deg, #9333EA 0%, #EC4899 50%, #F43F5E 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </h1>
            </div>

            {/* Typewriter role */}
            <p
              className="font-display text-[1.2rem] lg:text-[1.45rem] text-[#E2E8F0] leading-snug animate-float-up"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              <TypewriterRole />
            </p>

            {/* Bio */}
            <p
              className="font-sans text-[0.95rem] leading-relaxed text-[#94A3B8] max-w-[480px] animate-float-up"
              style={{ animationDelay: "0.72s", animationFillMode: "both" }}
            >
              A Computer Science Engineer passionate about crafting clean, production-grade code and meaningful digital solutions.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-wrap items-center gap-3.5 mt-2 animate-float-up"
              style={{ animationDelay: "0.85s", animationFillMode: "both" }}
            >
              <a
                href="#work"
                onClick={() => { if (soundEnabled) sound.playClick(); }}
                className="btn-shimmer inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white font-sans transition-all duration-300 hover:scale-105 hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #7C3AED 0%, #D946EF 100%)",
                  boxShadow: "0 10px 30px -5px rgba(124,58,237,0.5), 0 0 0 1px rgba(217,70,239,0.2)",
                }}
              >
                Explore My Work
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Recruiter Cockpit Launch Button */}
              <button
                onClick={() => {
                  sound.playPowerUp();
                  window.dispatchEvent(new CustomEvent("open-cockpit"));
                }}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-mono font-bold text-[#E9D5FF] transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(147,51,234,0.15) 0%, rgba(236,72,153,0.15) 100%)",
                  border: "1px solid rgba(192,132,252,0.4)",
                  boxShadow: "0 0 20px rgba(147,51,234,0.25)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EC4899] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D946EF]"></span>
                </span>
                <span>⚡ Recruiter Cockpit</span>
                <span className="text-[10px] text-[#A78BFA] px-1.5 py-0.5 rounded bg-[#9333EA]/30 border border-[#9333EA]/50">
                  [G]
                </span>
              </button>

              <a
                href={`mailto:krishikarajput10111@gmail.com`}
                onClick={() => { if (soundEnabled) sound.playClick(); }}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-[#CBD5E1] font-sans border transition-all duration-300 hover:scale-105 hover:text-white"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              >
                Let&apos;s Talk
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform text-[#94A3B8]" />
              </a>
            </div>

            {/* Social links row */}
            <div
              className="flex items-center gap-4 pt-2 animate-float-up"
              style={{ animationDelay: "1s", animationFillMode: "both" }}
            >
              <span className="font-mono text-[10px] text-[#4A3F6B] uppercase tracking-widest">Find me on</span>
              {[
                { label: "GitHub", href: "https://github.com/krishikarajput" },
                { label: "LinkedIn", href: "https://linkedin.com/in/krishikarajput" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#6B6280] hover:text-[var(--accent)] transition-colors duration-200 draw-underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right Column: Hero Image ── */}
          <div className="relative w-full lg:w-[48%] flex justify-end items-center h-[440px] lg:h-[660px] -mr-8 lg:-mr-20">
            {/* Glow halo behind image */}
            <div
              className="absolute inset-0 rounded-l-[3rem] pointer-events-none"
              style={{
                background: "radial-gradient(60% 60% at 60% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)",
              }}
            />
            <div
              className="relative w-full h-full rounded-l-[3rem] overflow-hidden float-y"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 15%, black 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 100%)",
                animationDuration: "6s",
              }}
            >
              <img
                src="/images/profile/krishu.jpeg"
                alt="Krishika Portrait"
                className="w-full h-full object-cover object-top"
              />
              {/* Subtle overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(8,7,15,0.5) 0%, transparent 40%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="mt-8 lg:mt-4 w-full relative z-20 animate-float-up" style={{ animationDelay: "1.1s", animationFillMode: "both" }}>
          <div
            className="border border-[#231E38] rounded-2xl flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.05)] overflow-hidden"
            style={{
              background: "rgba(13,10,26,0.7)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)",
              animation: "border-glow-pulse 4s ease-in-out infinite",
            }}
          >
            <StatCounter value="3+" label="Years Learning" />
            <StatCounter value="10+" label="Projects Built" />
            <StatCounter value="250+" label="GitHub Contributions" />
            <StatCounter value="25+" label="Technologies" />
          </div>
        </div>
      </Container>
    </section>
  );
}
