"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "@/components/ui/ThemeContext";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { UniverseIntro } from "@/components/ui/UniverseIntro";
import { CyberneticCockpit } from "@/components/ui/CyberneticCockpit";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { Cpu, Sparkles } from "lucide-react";
import { sound } from "@/components/ui/SoundEffects";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [cockpitOpen, setCockpitOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [siteReady, setSiteReady] = useState(false);

  /* Show intro only once per browser session */
  useEffect(() => {
    const shown = sessionStorage.getItem("universe-intro-shown");
    if (!shown) {
      setIntroVisible(true);
      /* Lock scroll during intro */
      document.body.style.overflow = "hidden";
    } else {
      setSiteReady(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("universe-intro-shown", "1");
    setIntroVisible(false);
    document.body.style.overflow = "";
    /* Slight delay so dissolve finishes before site animates in */
    setTimeout(() => setSiteReady(true), 100);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === "g" && !commandPaletteOpen && !introVisible) {
        // Press 'G' for God Mode / Cockpit
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag !== "input" && activeTag !== "textarea") {
          setCockpitOpen((prev) => !prev);
        }
      }
    };

    const handleOpenCockpit = () => {
      setCockpitOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-cockpit", handleOpenCockpit);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-cockpit", handleOpenCockpit);
    };
  }, [commandPaletteOpen, introVisible]);

  return (
    <ThemeProvider>
      {/* Universe intro — mounts above everything on first load */}
      {introVisible && <UniverseIntro onComplete={handleIntroComplete} />}

      {/* Site content — fades in after intro */}
      <div
        style={{
          opacity: siteReady ? 1 : 0,
          transform: siteReady ? "translateY(0)" : "translateY(12px)",
          transition: siteReady
            ? "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)"
            : "none",
        }}
      >
        {children}
      </div>

      {/* Bottom Floating Quick Actions Dock */}
      {siteReady && (
        <FloatingDock onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      )}

      {/* Floating Recruiter Cyber Cockpit Launcher Pill (Bottom-Right) */}
      {siteReady && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              sound.playPowerUp();
              setCockpitOpen(true);
            }}
            title="Launch Recruiter Cockpit / God Mode [Press G]"
            className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#9333EA]/50 bg-[#0C091A]/90 backdrop-blur-xl shadow-[0_0_25px_rgba(147,51,234,0.35)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] hover:border-[#C084FC] hover:scale-105 transition-all duration-300"
          >
            {/* Pulsing indicator */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EC4899] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D946EF]"></span>
            </span>

            <span className="font-mono text-xs font-bold text-[#F5F5F0] group-hover:text-[#E9D5FF] transition-colors">
              ⚡ RECRUITER COCKPIT
            </span>

            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#9333EA]/20 text-[#C084FC] border border-[#9333EA]/40">
              [G]
            </span>
          </button>
        </div>
      )}

      {/* Cybernetic Cockpit Modal */}
      <CyberneticCockpit
        isOpen={cockpitOpen}
        onClose={() => setCockpitOpen(false)}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </ThemeProvider>
  );
}
