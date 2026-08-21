"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Briefcase,
  Layers,
  Sparkles,
  User,
  Mail,
  FileText,
  Code2,
  X,
  Volume2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useTheme, ACCENT_OPTIONS } from "./ThemeContext";
import { sound } from "./SoundEffects";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/portfolio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Actions" | "Themes";
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setAccent, soundEnabled, toggleSound } = useTheme();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  };

  const scrollTo = (id: string) => {
    handleClose();
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contact.email).catch(() => {});
    if (soundEnabled) sound.playSuccess();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
    handleClose();
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-hero",
      title: "Go to Home / Hero",
      category: "Navigation",
      icon: <User className="w-4 h-4" />,
      action: () => scrollTo("hero"),
    },
    {
      id: "nav-work",
      title: "Go to Selected Work",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4" />,
      action: () => scrollTo("work"),
    },
    {
      id: "nav-experience",
      title: "Go to Experience & Timeline",
      category: "Navigation",
      icon: <Layers className="w-4 h-4" />,
      action: () => scrollTo("experience"),
    },
    {
      id: "nav-skills",
      title: "Go to Engineering Focus / Skills",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4" />,
      action: () => scrollTo("skills"),
    },
    {
      id: "nav-about",
      title: "Go to About & Philosophy",
      category: "Navigation",
      icon: <User className="w-4 h-4" />,
      action: () => scrollTo("about"),
    },
    {
      id: "nav-contact",
      title: "Go to Contact",
      category: "Navigation",
      icon: <Mail className="w-4 h-4" />,
      action: () => scrollTo("contact"),
    },

    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.slug}`,
      title: `Project: ${p.name} — ${p.tagline}`,
      category: "Projects" as const,
      icon: <Code2 className="w-4 h-4 text-[var(--accent)]" />,
      action: () => {
        handleClose();
        router.push(`/projects/${p.slug}`);
      },
    })),

    // Actions
    {
      id: "act-email",
      title: "Copy Email Address (with Confetti)",
      category: "Actions",
      icon: <Mail className="w-4 h-4 text-[var(--accent)]" />,
      action: copyEmail,
      shortcut: "Copy",
    },
    {
      id: "act-resume",
      title: "Request Official Resume",
      category: "Actions",
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        handleClose();
        const a = document.createElement("a");
        a.href = `mailto:${siteConfig.contact.email}?subject=Resume%20Request`;
        a.click();
      },
      shortcut: "Email",
    },
    {
      id: "act-sound",
      title: soundEnabled ? "Mute UI Sound Effects" : "Enable UI Sound Effects",
      category: "Actions",
      icon: <Volume2 className="w-4 h-4" />,
      action: () => {
        toggleSound();
        handleClose();
      },
    },

    // Themes
    ...ACCENT_OPTIONS.map((opt) => ({
      id: `theme-${opt.id}`,
      title: `Theme: ${opt.name}`,
      category: "Themes" as const,
      icon: (
        <span
          className="w-3.5 h-3.5 rounded-full inline-block"
          style={{ backgroundColor: opt.color }}
        />
      ),
      action: () => {
        setAccent(opt.id);
        if (soundEnabled) sound.playSuccess();
        handleClose();
      },
    })),
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#08080A]/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl glass-elevated border border-white/15 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-float-up">
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#23232B] gap-3">
          <Search className="w-5 h-5 text-[var(--accent)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, project, or theme..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent font-sans text-sm text-[#F5F5F0] placeholder-[#73737C] focus:outline-none"
          />
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-[#73737C] hover:text-[#F5F5F0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#181820]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-[#73737C]">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, idx) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-xs transition-colors ${
                  idx === selectedIndex
                    ? "bg-[var(--accent-dim)] text-[var(--accent)] font-semibold"
                    : "text-[#A3A3A8] hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="shrink-0">{cmd.icon}</span>
                  <span className="font-sans text-sm text-[#F5F5F0]">{cmd.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#73737C] bg-[#15151A] px-2 py-0.5 rounded border border-[#23232B]">
                    {cmd.category}
                  </span>
                  {cmd.shortcut && (
                    <span className="font-mono text-[9px] text-[var(--accent)]">
                      {cmd.shortcut}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#0F0F12] border-t border-[#23232B] flex items-center justify-between font-mono text-[10px] text-[#73737C]">
          <span>Navigation: ↑ ↓ to navigate · ↵ to select</span>
          <span className="bg-[#15151A] px-2 py-0.5 rounded border border-[#23232B]">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
