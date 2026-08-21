"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { socialLinks } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import {
  Copy, Check, ArrowUpRight, MapPin, Send, Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useTheme } from "@/components/ui/ThemeContext";
import { sound } from "@/components/ui/SoundEffects";

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

/* ── Live clock ── */
function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const update = () =>
      setT(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-[10px] text-[#6B6280]">{t} IST</span>;
}

export function ContactCreative() {
  const [copied, setCopied] = useState(false);
  const { soundEnabled } = useTheme();
  const { ref: sectionRef, visible } = useInView(0.1);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (soundEnabled) sound.playSuccess();
    navigator.clipboard.writeText(siteConfig.contact.email).catch(() => {});
    setCopied(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { x, y },
      colors: ["#7C3AED", "#10B981", "#EC4899", "#F59E0B", "#38BDF8"],
    });
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 md:py-36 border-t border-[#1E1830] relative overflow-hidden bg-transparent"
    >
      {/* ── Background ambience ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute w-[800px] h-[600px] rounded-full"
          style={{
            bottom: "-30%", left: "50%", transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 60%)",
            filter: "blur(60px)",
            animation: "blob-drift-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            top: "10%", right: "-5%",
            background: "radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(rgba(139,92,246,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Main spotlight card */}
        <div
          ref={sectionRef}
          className="relative rounded-3xl border border-[#231E38] overflow-hidden transition-all duration-700 group"
          style={{
            background: "linear-gradient(135deg, #0B0917 0%, #0D0A1A 50%, #0A0815 100%)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.08)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          {/* Top glow edge */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, #7C3AED 30%, #D946EF 50%, #10B981 70%, transparent)",
              boxShadow: "0 0 20px rgba(124,58,237,0.6)",
            }}
          />

          {/* Hover inner glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: "radial-gradient(800px circle at 50% 100%, rgba(124,58,237,0.06), transparent 60%)",
            }}
          />

          <div className="relative z-10 p-8 md:p-14 lg:p-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* ── Left Column ── */}
            <div className="lg:col-span-7 space-y-7">
              {/* Badge */}
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border"
                  style={{
                    color: "var(--accent)",
                    borderColor: "rgba(var(--accent-rgb),0.3)",
                    background: "rgba(var(--accent-rgb),0.08)",
                  }}
                >
                  <Zap className="w-3 h-3" />
                  Initiate Connection
                </span>
                <span className="font-mono text-[10px] text-[#73737C] uppercase tracking-wider">
                  2026 Opportunities
                </span>
              </div>

              {/* Heading */}
              <h2
                id="contact-heading"
                className="font-display font-extrabold tracking-tight leading-[1.05]"
                style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
              >
                <span className="text-[#F5F5F0]">Let&apos;s build</span>
                <br />
                <span
                  className="gradient-animate"
                  style={{
                    backgroundImage: "linear-gradient(135deg,#7C3AED,#D946EF,#EC4899,#7C3AED)",
                  }}
                >
                  something remarkable
                </span>
                <br />
                <span className="text-[#F5F5F0]">together.</span>
              </h2>

              <p className="font-sans text-base text-[#A3A3A8] max-w-xl leading-relaxed">
                Whether you have an internship role, an engineering problem to discuss, or a full-stack opportunity, my inbox is always open.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href={`mailto:${siteConfig.contact.email}`}
                  variant="primary"
                  className="btn-shimmer shadow-[0_0_30px_var(--accent-dim)] text-sm px-7 py-3.5 hover:scale-105 hover:shadow-[0_0_40px_var(--accent-glow)]"
                >
                  Send an Email
                  <Send className="ml-2 w-4 h-4" />
                </Button>

                <button
                  onClick={handleCopy}
                  className="group relative inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-mono text-xs font-semibold border transition-all duration-300 hover:scale-105 overflow-hidden"
                  style={{
                    background: "#08070F",
                    color: "#F5F5F0",
                    borderColor: copied ? "#22C55E" : "#231E38",
                    boxShadow: copied ? "0 0 20px rgba(34,197,94,0.3)" : "none",
                  }}
                  onMouseEnter={e => { if (!copied) e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
                  onMouseLeave={e => { if (!copied) e.currentTarget.style.borderColor = "#231E38"; }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#22C55E]" />
                      <span className="text-[#22C55E]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[var(--accent)]" />
                      <span>{siteConfig.contact.email}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ── Right Column ── */}
            <div className="lg:col-span-5 space-y-4">

              {/* Availability status */}
              <div
                className="rounded-2xl border border-[#231E38] p-5 space-y-3 relative overflow-hidden"
                style={{ background: "#08070F" }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{ background: "linear-gradient(90deg, transparent, #22C55E, transparent)", opacity: 0.4 }} />
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#73737C] uppercase tracking-wider">Current Status</span>
                  <span className="text-[#22C55E] flex items-center gap-1.5 font-bold uppercase">
                    {/* Triple-ping dot */}
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="ping-ring" style={{ color: "#22C55E", animationDelay: "0s" }} />
                      <span className="ping-ring" style={{ color: "#22C55E", animationDelay: "0.5s", opacity: 0.5 }} />
                      <span className="relative w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                    </span>
                    Actively Interviewing
                  </span>
                </div>
                <div className="font-sans text-xs text-[#A3A3A8] leading-relaxed">
                  Available for Summer 2026 software engineering internships, backend development roles, and full-stack positions.
                </div>
              </div>

              {/* Social links */}
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, i) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { if (soundEnabled) sound.playClick(); }}
                    className="group relative rounded-xl border border-[#231E38] p-4 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:scale-105"
                    style={{
                      background: "#0D0A1A",
                      transitionDelay: `${i * 60}ms`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(124,58,237,0.2)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#231E38";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-center justify-between text-[#73737C] group-hover:text-[var(--accent)] transition-colors mb-2">
                      <span className="font-mono text-xs uppercase font-bold">{link.platform}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <span className="font-mono text-[10px] text-[#A3A3A8] group-hover:text-[#F0EEF8] transition-colors">
                      View Profile ↗
                    </span>
                  </a>
                ))}
              </div>

              {/* Location + time */}
              <div
                className="rounded-xl border border-[#231E38] p-4 flex items-center justify-between"
                style={{ background: "#08070F" }}
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span className="font-mono text-[10px] text-[#73737C]">Dehradun, India</span>
                </div>
                <LiveClock />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
