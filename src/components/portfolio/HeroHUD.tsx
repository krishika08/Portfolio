"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Activity,
  Cpu,
  Clock,
  CheckCircle2,
  Send,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useTheme } from "../ui/ThemeContext";
import { sound } from "../ui/SoundEffects";
import { siteConfig } from "@/config/site";

export function HeroHUD() {
  const [activeTab, setActiveTab] = useState<"terminal" | "telemetry" | "specs">("terminal");
  const [time, setTime] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string; type?: "input" | "output" | "accent" | "success" | "error" }>>([
    { text: "Krishika System OS v2.6.4 initialized. Type 'help' for available commands.", type: "output" },
    { text: "System status: ALL SERVICES OPERATIONAL", type: "accent" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const { soundEnabled, setAccent } = useTheme();

  // Real-time IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-GB", options) + " IST");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === "terminal") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory, activeTab]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    if (soundEnabled) sound.playKey();

    const newHistory = [...terminalHistory, { text: `> ${inputVal}`, type: "input" as const }];

    switch (cmd) {
      case "help":
        newHistory.push(
          { text: "Available commands:", type: "output" },
          { text: "  projects   - List flagship & supporting builds", type: "accent" },
          { text: "  skills     - Display core stack proficiencies", type: "accent" },
          { text: "  experience - View internship history", type: "accent" },
          { text: "  contact    - Get direct email & links", type: "accent" },
          { text: "  hire       - Trigger immediate hire inquiry + confetti 🎉", type: "success" },
          { text: "  theme      - Cycle theme accent", type: "accent" },
          { text: "  quote      - View engineering philosophy", type: "output" },
          { text: "  clear      - Clear terminal screen", type: "output" }
        );
        break;

      case "projects":
        newHistory.push(
          { text: "1. VeyloPrep: Full-stack job tracker with signed Android APK (Next.js, Capacitor, PostgreSQL)", type: "accent" },
          { text: "2. Split-Sync: Real-time expense settlement engine (Supabase, Next.js)", type: "output" },
          { text: "3. Engineered.dev: SSR technical cloud publication (Payload CMS, Firebase)", type: "output" }
        );
        break;

      case "skills":
        newHistory.push(
          { text: "Languages: Java, Python, C, SQL, TypeScript, JavaScript", type: "output" },
          { text: "Frameworks: Next.js App Router, React 19, Tailwind CSS", type: "output" },
          { text: "Databases: PostgreSQL, MySQL, Supabase, MongoDB", type: "output" },
          { text: "Cloud: Google Cloud Platform (20 Skill Boost badges), Oracle OCI Certified", type: "accent" }
        );
        break;

      case "experience":
        newHistory.push(
          { text: "• Crobstacle Ventures LLP: Website Dev Intern (Next.js, TypeScript, PostgreSQL)", type: "accent" },
          { text: "• AAS Welfare Society: Frontend Dev Intern (React, CSS, Responsive UI)", type: "output" }
        );
        break;

      case "contact":
        newHistory.push(
          { text: `Email: ${siteConfig.contact.email}`, type: "accent" },
          { text: "LinkedIn: linkedin.com/in/krishika", type: "output" },
          { text: "GitHub: github.com/krishika", type: "output" }
        );
        break;

      case "hire":
        if (soundEnabled) sound.playSuccess();
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 },
        });
        newHistory.push(
          { text: "🚀 Ready to build exceptional systems together.", type: "success" },
          { text: `Direct dispatch: ${siteConfig.contact.email}`, type: "accent" }
        );
        break;

      case "theme":
        const themes = ["cobalt", "emerald", "violet", "amber", "crimson"] as const;
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        setAccent(randomTheme);
        newHistory.push({ text: `Theme switched to: ${randomTheme.toUpperCase()}`, type: "success" });
        break;

      case "quote":
        newHistory.push({
          text: '"Simplicity is prerequisite for reliability. Build systems that behave predictably under load."',
          type: "output",
        });
        break;

      case "clear":
        setTerminalHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          text: `Command not recognized: "${cmd}". Type 'help' for commands list.`,
          type: "error",
        });
        break;
    }

    setTerminalHistory(newHistory);
    setInputVal("");
  };

  return (
    <div className="relative w-full glass-elevated border border-[#23232B] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] card-3d">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0C0C10] border-b border-[#23232B]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block border border-white/10" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block border border-white/10" />
            <span className="w-3 h-3 rounded-full bg-[#22C55E]/80 inline-block border border-white/10" />
          </div>
          <span className="font-mono text-[10px] text-[#A3A3A8] uppercase tracking-wider font-semibold">
            KRISHIKA_WORKSPACE.sh
          </span>
        </div>

        {/* Real-time Telemetry badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#15151A] px-2.5 py-1 rounded-full border border-[#23232B]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="font-mono text-[9px] text-[#22C55E] font-bold">READY TO HIRE</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[#73737C] font-mono text-[10px]">
            <Clock className="w-3 h-3 text-[var(--accent)]" />
            <span>{time || "19:30 IST"}</span>
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center border-b border-[#23232B] bg-[#0F0F14] px-3 gap-1">
        <button
          onClick={() => {
            if (soundEnabled) sound.playClick();
            setActiveTab("terminal");
          }}
          className={`flex items-center gap-2 px-3.5 py-2 font-mono text-xs font-medium border-b-2 transition-all ${
            activeTab === "terminal"
              ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)]"
              : "border-transparent text-[#73737C] hover:text-[#F5F5F0]"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive Terminal</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) sound.playClick();
            setActiveTab("telemetry");
          }}
          className={`flex items-center gap-2 px-3.5 py-2 font-mono text-xs font-medium border-b-2 transition-all ${
            activeTab === "telemetry"
              ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)]"
              : "border-transparent text-[#73737C] hover:text-[#F5F5F0]"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>System Telemetry</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) sound.playClick();
            setActiveTab("specs");
          }}
          className={`flex items-center gap-2 px-3.5 py-2 font-mono text-xs font-medium border-b-2 transition-all ${
            activeTab === "specs"
              ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)]"
              : "border-transparent text-[#73737C] hover:text-[#F5F5F0]"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Profile Specs</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-5 min-h-[290px] max-h-[340px] flex flex-col justify-between overflow-hidden bg-[#08080A]/90">
        
        {/* TAB 1: Terminal */}
        {activeTab === "terminal" && (
          <div className="flex flex-col h-full justify-between">
            <div className="overflow-y-auto space-y-1.5 font-mono text-[11px] max-h-[220px] pr-2">
              {terminalHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    item.type === "input"
                      ? "text-[var(--accent)] font-semibold"
                      : item.type === "accent"
                      ? "text-[var(--accent)]"
                      : item.type === "success"
                      ? "text-[#22C55E]"
                      : item.type === "error"
                      ? "text-[#EF4444]"
                      : "text-[#A3A3A8]"
                  }`}
                >
                  {item.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Prompt input */}
            <form onSubmit={handleCommand} className="mt-3 pt-3 border-t border-[#23232B] flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--accent)] font-bold">visitor@krishika:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help', 'skills', 'hire'..."
                className="flex-1 bg-transparent font-mono text-xs text-[#F5F5F0] placeholder-[#73737C] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send command"
                className="p-1.5 rounded text-[var(--accent)] hover:bg-[var(--accent-dim)] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: Telemetry */}
        {activeTab === "telemetry" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#121217] border border-[#23232B] rounded-lg p-3">
                <div className="flex items-center justify-between font-mono text-[9px] text-[#73737C] uppercase mb-1">
                  <span>Backend Latency</span>
                  <span className="text-[#22C55E]">OPTIMAL</span>
                </div>
                <div className="font-mono text-xl font-bold text-[#F5F5F0]">12.4 ms</div>
                <div className="w-full bg-[#1F1F28] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[var(--accent)] h-full w-[94%] rounded-full animate-pulse" />
                </div>
              </div>

              <div className="bg-[#121217] border border-[#23232B] rounded-lg p-3">
                <div className="flex items-center justify-between font-mono text-[9px] text-[#73737C] uppercase mb-1">
                  <span>Skill Boost Badges</span>
                  <span className="text-[var(--accent)]">GOOGLE</span>
                </div>
                <div className="font-mono text-xl font-bold text-[var(--accent)]">20 Completed</div>
                <div className="w-full bg-[#1F1F28] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#22C55E] h-full w-[100%] rounded-full" />
                </div>
              </div>
            </div>

            {/* Radar matrix */}
            <div className="bg-[#121217] border border-[#23232B] rounded-lg p-3 space-y-2">
              <div className="font-mono text-[9px] text-[#73737C] uppercase tracking-wider">Engineering Architecture Focus</div>
              <div className="space-y-1.5">
                {[
                  { name: "Distributed Systems & REST APIs", level: 94 },
                  { name: "Relational Schema & PostgreSQL", level: 90 },
                  { name: "Cross-Platform & Capacitor Android", level: 88 },
                  { name: "Next.js App Router & SSR Engine", level: 92 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between font-mono text-[10px] text-[#A3A3A8] mb-0.5">
                      <span>{skill.name}</span>
                      <span className="text-[var(--accent)]">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#1F1F28] h-1 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Specs */}
        {activeTab === "specs" && (
          <div className="space-y-3 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#121217] border border-[#23232B] rounded-lg p-3">
                <div className="text-[9px] text-[#73737C] uppercase mb-1">Academic Result</div>
                <div className="text-lg font-bold text-[#F5F5F0]">8.24 / 10 CGPA</div>
                <div className="text-[9px] text-[var(--accent)]">UPES B.Tech CS (2024-28)</div>
              </div>

              <div className="bg-[#121217] border border-[#23232B] rounded-lg p-3">
                <div className="text-[9px] text-[#73737C] uppercase mb-1">Certifications</div>
                <div className="text-lg font-bold text-[#22C55E]">Oracle OCI</div>
                <div className="text-[9px] text-[#A3A3A8]">Foundations Associate</div>
              </div>
            </div>

            <div className="bg-[#121217] border border-[#23232B] rounded-lg p-3">
              <div className="text-[9px] text-[#73737C] uppercase mb-2">Flagship Artifact Highlights</div>
              <ul className="space-y-1 text-[11px] text-[#A3A3A8]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Native Android Signed APK compilation with Capacitor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Multi-tenant real-time balances using Supabase triggers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>2 Commercial production internship cycles</span>
                </li>
              </ul>
            </div>
          </div>
        )}

      </div>

      {/* Card Footer */}
      <div className="px-4 py-2.5 bg-[#0C0C10] border-t border-[#23232B] flex items-center justify-between font-mono text-[9px] text-[#73737C]">
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-[var(--accent)]" />
          <span>UPES DEHRADUN · IN</span>
        </div>
        <span className="text-[var(--accent)] font-semibold">BUILD v2026.8 · STABLE</span>
      </div>
    </div>
  );
}
