"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Briefcase,
  Layers,
  Sparkles,
  Mail,
  Palette,
  Volume2,
  VolumeX,
  Terminal,
  Check,
  Compass,
} from "lucide-react";
import { useTheme, ACCENT_OPTIONS } from "./ThemeContext";
import { sound } from "./SoundEffects";
import { siteConfig } from "@/config/site";

interface FloatingDockProps {
  onOpenCommandPalette?: () => void;
}

export function FloatingDock({ onOpenCommandPalette }: FloatingDockProps) {
  const { accent, setAccent, soundEnabled, toggleSound } = useTheme();
  const [copied, setCopied] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (soundEnabled) sound.playSuccess();

    navigator.clipboard.writeText(siteConfig.contact.email).catch(() => {});
    setCopied(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ["#4F7FFF", "#10B981", "#A855F7", "#F59E0B", "#EF4444"],
      disableForReducedMotion: true,
    });

    setTimeout(() => setCopied(false), 2400);
  };

  const handleNavClick = (id: string) => {
    if (soundEnabled) sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Quick Actions Dock"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 pointer-events-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div className="relative pointer-events-auto flex items-center gap-1.5 p-2 rounded-full glass-elevated border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        
        {/* Navigation Quick Jump */}
        <button
          onClick={() => handleNavClick("hero")}
          title="Scroll to Top"
          aria-label="Scroll to top"
          className="p-2.5 rounded-full text-[#A3A3A8] hover:text-[#F5F5F0] hover:bg-white/10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <Compass className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleNavClick("work")}
          title="Selected Work"
          aria-label="Selected work section"
          className="p-2.5 rounded-full text-[#A3A3A8] hover:text-[#F5F5F0] hover:bg-white/10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <Briefcase className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleNavClick("experience")}
          title="Career Journey"
          aria-label="Career journey section"
          className="p-2.5 rounded-full text-[#A3A3A8] hover:text-[#F5F5F0] hover:bg-white/10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleNavClick("skills")}
          title="Engineering Focus"
          aria-label="Engineering skills section"
          className="p-2.5 rounded-full text-[#A3A3A8] hover:text-[#F5F5F0] hover:bg-white/10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Command Palette Trigger */}
        {onOpenCommandPalette && (
          <button
            onClick={() => {
              if (soundEnabled) sound.playClick();
              onOpenCommandPalette();
            }}
            title="Command Menu (Cmd+K)"
            aria-label="Open command palette"
            className="p-2.5 rounded-full text-[#A3A3A8] hover:text-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Terminal className="w-4 h-4" />
          </button>
        )}

        {/* Theme Accent Customizer */}
        <div className="relative">
          <button
            onClick={() => {
              if (soundEnabled) sound.playClick();
              setShowPalette(!showPalette);
            }}
            title="Customize Accent Color"
            aria-label="Customize accent color"
            className="p-2.5 rounded-full text-[#A3A3A8] hover:text-[var(--accent)] hover:bg-white/10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Color Dropdown */}
          {showPalette && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 glass-elevated border border-white/15 rounded-2xl p-2.5 shadow-2xl flex items-center gap-2 animate-float-up">
              {ACCENT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAccent(opt.id);
                    if (soundEnabled) sound.playClick();
                    setShowPalette(false);
                  }}
                  title={opt.name}
                  aria-label={`Select ${opt.name} theme`}
                  className={`relative w-6 h-6 rounded-full transition-transform duration-200 hover:scale-125 focus-visible:outline-none ${
                    accent === opt.id ? "ring-2 ring-white scale-110 shadow-lg" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: opt.color }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={() => {
            toggleSound();
            if (!soundEnabled) sound.playSuccess();
          }}
          title={soundEnabled ? "Mute UI Sound Effects" : "Enable UI Sound Effects"}
          aria-label={soundEnabled ? "Mute UI Sound Effects" : "Enable UI Sound Effects"}
          className={`p-2.5 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
            soundEnabled ? "text-[var(--accent)] bg-[var(--accent-dim)]" : "text-[#73737C] hover:text-[#F5F5F0] hover:bg-white/10"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Copy Email Button with Celebration */}
        <button
          onClick={handleCopyEmail}
          title="Click to copy email address"
          aria-label="Click to copy email address"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent)] hover:brightness-110 text-white font-sans text-xs font-semibold shadow-[0_0_20px_var(--accent-dim)] transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white animate-bounce" />
              <span className="font-mono text-[11px]">Copied!</span>
            </>
          ) : (
            <>
              <Mail className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Contact</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
