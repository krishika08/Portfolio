"use client";

import React, { useRef, useState, useCallback } from "react";
import { Container } from "@/components/layout/Container";
import { skills } from "@/data/portfolio";
import { Award, CheckCircle2, Code2, Atom, Database, Cloud, Cpu } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeContext";
import { sound } from "@/components/ui/SoundEffects";

/* ─────── Category config ─────── */
const CAT_CONFIG: Record<string, {
  icon: React.ElementType;
  color: string;
  glow: string;
  gradient: string;
  dimBg: string;
}> = {
  languages:    { icon: Code2,     color: "#FBBF24", glow: "rgba(251,191,36,0.25)",  gradient: "from-[#FBBF24] to-[#F97316]", dimBg: "rgba(251,191,36,0.06)" },
  frameworks:   { icon: Atom,      color: "#E2B2FF", glow: "rgba(226,178,255,0.22)", gradient: "from-[#A855F7] to-[#7C3AED]", dimBg: "rgba(168,85,247,0.06)" },
  databases:    { icon: Database,  color: "#FCD34D", glow: "rgba(252,211,77,0.2)",   gradient: "from-[#F59E0B] to-[#EF4444]", dimBg: "rgba(252,211,77,0.06)" },
  "cloud-devops": { icon: Cloud,   color: "#38BDF8", glow: "rgba(56,189,248,0.22)", gradient: "from-[#38BDF8] to-[#6366F1]", dimBg: "rgba(56,189,248,0.06)" },
  foundations:  { icon: Cpu,       color: "#4ADE80", glow: "rgba(74,222,128,0.22)", gradient: "from-[#4ADE80] to-[#06B6D4]", dimBg: "rgba(74,222,128,0.06)" },
};

/* ─────── Magnetic Spotlight Card ─────── */
function MagneticCard({
  children,
  color,
  glow,
  dimBg,
  className = "",
}: {
  children: React.ReactNode;
  color: string;
  glow: string;
  dimBg: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`group relative overflow-hidden rounded-2xl border border-[#231E38] transition-all duration-400 cursor-default ${className}`}
      style={{
        background: "#0B0917",
        boxShadow: hov ? `0 0 40px -10px ${glow}, 0 0 0 1px ${glow}` : "none",
        borderColor: hov ? `${glow}` : "#231E38",
      }}
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: hov ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${dimBg}, transparent 60%)`,
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hov ? 0.8 : 0,
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, ${glow}, transparent 50%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─────── Skill pill ─────── */
function SkillPill({ label, color, glow }: { label: string; color: string; glow: string }) {
  return (
    <span
      className="inline-flex items-center font-mono text-[11px] tracking-wide px-3 py-1.5 rounded-full border transition-all duration-250 hover:scale-105 hover:brightness-125"
      style={{
        background: `${glow.replace("0.22", "0.08").replace("0.25", "0.08").replace("0.2", "0.08")}`,
        color,
        borderColor: `${glow.replace("0.22", "0.3").replace("0.25", "0.3").replace("0.2", "0.3")}`,
      }}
    >
      {label}
    </span>
  );
}

/* ─────── MAIN COMPONENT ─────── */
export function SkillsBentoGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { soundEnabled } = useTheme();

  const categories = [
    { id: "all", label: "All" },
    { id: "languages", label: "Languages" },
    { id: "frameworks", label: "Frameworks" },
    { id: "databases", label: "Databases" },
    { id: "cloud-devops", label: "Cloud" },
    { id: "foundations", label: "Foundations" },
  ];

  const filtered =
    activeCategory === "all" ? skills : skills.filter((s) => s.id === activeCategory);

  const handleTabClick = (id: string) => {
    if (soundEnabled) sound.playClick();
    setActiveCategory(id);
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-32 md:py-44 border-t border-[#1E1830] relative bg-transparent overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute rounded-full"
          style={{
            width: 800, height: 600,
            top: "-30%", right: "-20%",
            background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 500,
            bottom: "-20%", left: "-10%",
            background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        {/* Diagonal scanlines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, transparent 1px, transparent 40px, rgba(255,255,255,0.5) 41px)",
          }}
        />
      </div>

      <Container>
        {/* ── Label ── */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase font-bold">
            04 / Engineering Focus
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent)]/40 to-transparent" />
        </div>

        {/* ── Heading row ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <h2
            id="skills-heading"
            className="font-display font-black leading-[0.9] tracking-tighter"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            <span className="text-[#F5F5F0]">Technical </span>
            <span
              style={{
                background: "linear-gradient(135deg,#A855F7 0%,#38BDF8 60%,#4ADE80 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Stack
            </span>
            <br />
            <span className="text-[#F5F5F0]">&amp; Mastery</span>
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const cfg = CAT_CONFIG[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabClick(cat.id)}
                  aria-pressed={isActive}
                  className="font-mono text-[11px] font-bold px-4 py-2 rounded-full border transition-all duration-250 hover:scale-105"
                  style={{
                    background: isActive
                      ? cfg ? `${cfg.glow}` : "var(--accent-dim)"
                      : "transparent",
                    color: isActive
                      ? cfg ? cfg.color : "var(--accent)"
                      : "#6B6280",
                    borderColor: isActive
                      ? cfg ? cfg.color : "var(--accent)"
                      : "#231E38",
                    boxShadow: isActive && cfg ? `0 0 12px ${cfg.glow}` : "none",
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((cat, idx) => {
            const cfg = CAT_CONFIG[cat.id] ?? {
              icon: Cpu,
              color: "var(--accent)",
              glow: "var(--accent-glow)",
              gradient: "from-[var(--accent)] to-[var(--accent-hover)]",
              dimBg: "var(--accent-dim)",
            };
            const Icon = cfg.icon;
            const isCloud = cat.id === "cloud-devops";

            // make full-width if it's the last item and there's an odd count
            const isLast = idx === filtered.length - 1;
            const isOdd = filtered.length % 3 !== 0;

            return (
              <MagneticCard
                key={cat.id}
                color={cfg.color}
                glow={cfg.glow}
                dimBg={cfg.dimBg}
                className={isLast && isOdd && filtered.length > 1 ? "xl:col-span-1" : ""}
              >
                {/* Top gradient bar */}
                <div
                  className={`h-[3px] w-full bg-gradient-to-r ${cfg.gradient}`}
                  style={{ boxShadow: `0 0 12px ${cfg.glow}` }}
                />

                <div className="p-6 flex flex-col gap-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Icon orb */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                        style={{
                          background: cfg.dimBg,
                          borderColor: `${cfg.glow.replace("0.22", "0.3").replace("0.25", "0.3").replace("0.2", "0.3")}`,
                          boxShadow: `0 0 16px ${cfg.glow}`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: cfg.color }} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-[#F5F5F0] text-lg leading-tight">
                          {cat.category}
                        </h3>
                        {isCloud && (
                          <span
                            className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider mt-0.5"
                            style={{ color: cfg.color }}
                          >
                            <Award className="w-2.5 h-2.5" />
                            20 Badges Verified
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Skill count badge */}
                    <span
                      className="font-mono text-[10px] px-2 py-1 rounded-md border shrink-0"
                      style={{
                        color: cfg.color,
                        background: cfg.dimBg,
                        borderColor: `${cfg.glow.replace("0.22", "0.25").replace("0.25", "0.25").replace("0.2", "0.25")}`,
                      }}
                    >
                      {cat.skills.length}
                    </span>
                  </div>

                  {/* Description */}
                  {cat.description && (
                    <p className="font-sans text-xs text-[#6B6280] leading-relaxed">
                      {cat.description}
                    </p>
                  )}

                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <SkillPill key={s} label={s} color={cfg.color} glow={cfg.glow} />
                    ))}
                  </div>

                  {/* Evidence footer */}
                  {cat.evidence && (
                    <div
                      className="flex items-start gap-2.5 pt-4 border-t"
                      style={{ borderColor: "#1E1830" }}
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: "#22C55E" }}
                      />
                      <span className="font-mono text-[10px] text-[#5A5870] leading-relaxed">
                        {cat.evidence}
                      </span>
                    </div>
                  )}
                </div>
              </MagneticCard>
            );
          })}
        </div>

        {/* ── Bottom summary bar ── */}
        <div
          className="mt-10 rounded-2xl border border-[#231E38] overflow-hidden"
          style={{ background: "#0B0917" }}
        >
          <div className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-[#1E1830]">
            {[
              { label: "Total Skills", value: skills.reduce((a, c) => a + c.skills.length, 0) + "+" },
              { label: "Skill Categories", value: skills.length },
              { label: "Cloud Certifications", value: "2" },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center py-5 px-4 gap-1">
                <span className="font-display font-black text-3xl text-[#F0EEF8] tracking-tight">
                  {item.value}
                </span>
                <span className="font-mono text-[9px] text-[#4B4860] uppercase tracking-widest">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
