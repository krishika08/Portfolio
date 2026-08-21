import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { InteractiveProjectShowcase } from "@/components/portfolio/InteractiveProjectShowcase";
import { ExperienceCircuit } from "@/components/portfolio/ExperienceCircuit";
import { SkillsBentoGrid } from "@/components/portfolio/SkillsBentoGrid";
import { AboutCreative } from "@/components/portfolio/AboutCreative";
import { ContactCreative } from "@/components/portfolio/ContactCreative";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-transparent">
      
      {/* 01 / HERO */}
      <HeroSection />

      {/* 02 / SELECTED WORK */}
      <InteractiveProjectShowcase />

      {/* 03 / EXPERIENCE */}
      <ExperienceCircuit />

      {/* 04 / ENGINEERING FOCUS & SKILLS */}
      <SkillsBentoGrid />

      {/* 05 / ABOUT & CREDENTIALS */}
      <AboutCreative />

      {/* 06 / CONTACT */}
      <ContactCreative />

      {/* FOOTER */}
      <footer className="border-t border-[#1E1830] py-12 relative overflow-hidden" style={{ background: "#08070F" }}>
        {/* Gradient top divider */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6) 30%, rgba(217,70,239,0.6) 50%, rgba(16,185,129,0.5) 70%, transparent)" }}
        />
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(124,58,237,0.04), transparent 60%)" }}
        />
        <Container>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-mono text-[#6B6280]">
            <div className="flex items-center gap-3">
              <span
                className="font-display font-extrabold text-base gradient-animate"
                style={{ backgroundImage: "linear-gradient(135deg,#9333EA,#EC4899,#F43F5E,#9333EA)" }}
              >
                Krishika.
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping-ring" style={{ color: "#22C55E", animationDuration: "2s" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22C55E]" />
              </span>
              <span className="text-[#4B4860]">Software Engineer &amp; Systems Builder</span>
            </div>
            <div className="text-[#3B3850]">
              UPES Dehradun · 2026 · Built with Next.js 16 &amp; React ❤️
            </div>
          </div>
        </Container>
      </footer>

    </div>
  );
}
