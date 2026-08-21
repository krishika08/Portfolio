"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Zap, 
  X, 
  Sparkles, 
  Rocket, 
  ShieldCheck, 
  Terminal, 
  Volume2, 
  Radio, 
  Cpu, 
  Send, 
  CheckCircle2, 
  RefreshCw, 
  Maximize2,
  Atom,
  Flame,
  Award,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "./SoundEffects";
import { useTheme } from "./ThemeContext";
import { siteConfig } from "@/config/site";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
}

const PALETTES = [
  ["#9333EA", "#EC4899", "#38BDF8", "#FBBF24", "#34D399"],
  ["#06B6D4", "#3B82F6", "#6366F1", "#8B5CF6", "#EC4899"],
  ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#38BDF8"],
  ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#F43F5E"]
];

export function CyberneticCockpit({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"gravity" | "recruiter" | "hologram" | "synth">("recruiter");
  const [warpMode, setWarpMode] = useState(false);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [stampVerified, setStampVerified] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isDown: boolean }>({ x: 0, y: 0, isDown: false });
  const animRef = useRef<number>(0);
  const { soundEnabled } = useTheme();

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Recruiter scan sequence
  const startRecruiterScan = useCallback(() => {
    if (isScanning) return;
    setIsScanning(true);
    setScanComplete(false);
    setScanStep(0);
    if (soundEnabled) sound.playPowerUp();

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (soundEnabled) sound.playKey();
        if (prev >= 4) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          if (soundEnabled) sound.playSuccess();
          return 5;
        }
        return prev + 1;
      });
    }, 450);
  }, [isScanning, soundEnabled]);

  // Particle Physics Canvas
  useEffect(() => {
    if (!isOpen || activeTab !== "gravity") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const W = canvas.width;
    const H = canvas.height;
    const currentColors = PALETTES[paletteIndex];

    // Seed 250 physics particles
    particlesRef.current = Array.from({ length: 220 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.8;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        baseRadius: 1 + Math.random() * 2.5,
        color: currentColors[Math.floor(Math.random() * currentColors.length)],
      };
    });

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - r.left;
      mouseRef.current.y = e.clientY - r.top;
    };

    const handleCanvasMouseDown = () => {
      mouseRef.current.isDown = true;
      if (soundEnabled) sound.playHover();
    };

    const handleCanvasMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    canvas.addEventListener("mousemove", handleCanvasMouseMove);
    canvas.addEventListener("mousedown", handleCanvasMouseDown);
    window.addEventListener("mouseup", handleCanvasMouseUp);

    const render = () => {
      if (warpMode) {
        ctx.fillStyle = "rgba(8, 7, 15, 0.25)";
      } else {
        ctx.fillStyle = "rgba(8, 7, 15, 0.4)";
      }
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isMouseDown = mouseRef.current.isDown;

      particlesRef.current.forEach((p) => {
        // Gravitational Attraction to cursor if mouse down / hovered
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (isMouseDown) {
          // Intense Black Hole Vortex
          const force = Math.min(6, 1200 / (dist * dist + 100));
          const angle = Math.atan2(dy, dx) + Math.PI / 2.5; // Swirl
          p.vx += Math.cos(angle) * force + (dx / dist) * force * 0.8;
          p.vy += Math.sin(angle) * force + (dy / dist) * force * 0.8;
        } else if (dist < 150) {
          // Gentle ambient gravitational pull
          const force = (150 - dist) * 0.0015;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Warp speed multiplier
        const speedMult = warpMode ? 3.5 : 1;
        p.x += p.vx * speedMult;
        p.y += p.vy * speedMult;

        // Friction / drag
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Bounce / Wrap
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = warpMode ? 10 : 4;

        if (warpMode) {
          // Draw streak
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 6, p.y - p.vy * 6);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.baseRadius * 1.5;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleCanvasMouseMove);
      canvas.removeEventListener("mousedown", handleCanvasMouseDown);
      window.removeEventListener("mouseup", handleCanvasMouseUp);
    };
  }, [isOpen, activeTab, warpMode, paletteIndex, soundEnabled]);

  // Supernova blast trigger
  const triggerSupernova = () => {
    if (soundEnabled) sound.playLaser();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    particlesRef.current.forEach((p) => {
      const angle = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 0.5;
      const blastSpeed = 8 + Math.random() * 12;
      p.vx = Math.cos(angle) * blastSpeed;
      p.vy = Math.sin(angle) * blastSpeed;
    });

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#A855F7", "#EC4899", "#38BDF8", "#FBBF24"],
    });
  };

  // Generate 1-Click Interview Offer
  const handleShortlistCandidate = () => {
    if (soundEnabled) sound.playSuccess();
    setStampVerified(true);

    confetti({
      particleCount: 90,
      spread: 100,
      origin: { x: 0.5, y: 0.6 },
      colors: ["#7C3AED", "#10B981", "#EC4899", "#F59E0B", "#38BDF8"],
    });

    setTimeout(() => {
      const mailto = `mailto:${siteConfig.contact.email}?subject=Invitation%20for%20Interview%20%7C%20Software%20Engineer%20Role&body=Hi%20Krishika,%0D%0A%0D%0AWe%20reviewed%20your%20portfolio%20and%20were%20extremely%20impressed%20by%20your%20work%20on%20VeyloPrep,%20Split-Sync,%20and%20your%20systems%20engineering%20experience.%0D%0A%0D%0AWe%20would%20love%20to%20schedule%20a%20technical%20interview%20with%20you.%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20Name%20/%20Company]`;
      window.open(mailto, "_blank");
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Ambient Backdrop with Blur */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-[#05040A]/90 backdrop-blur-2xl transition-opacity animate-fade-in"
      />

      {/* Cybernetic Cockpit Window */}
      <div 
        className="relative z-10 w-full max-w-4xl bg-[#090714] border border-[rgba(147,51,234,0.4)] rounded-3xl shadow-[0_0_80px_rgba(124,58,237,0.35)] overflow-hidden flex flex-col max-h-[90vh] animate-float-up"
      >
        {/* Top Glowing HUD Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#231E38] bg-[#0D0A1A]/80 backdrop-blur-md relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9333EA] to-transparent shadow-[0_0_12px_#9333EA]" />
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[rgba(147,51,234,0.15)] border border-[#9333EA]/40 flex items-center justify-center text-[#C084FC]">
              <Cpu className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm text-[#F5F5F0] tracking-wide">
                  KRISHIKA-OS // RECRUITER COCKPIT
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  SYSTEM ONLINE
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#6B6280]">
                v4.0.26 · Neural Telemetry &amp; Interactive Sandbox
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (soundEnabled) sound.playClick();
              onClose();
            }}
            className="p-2 rounded-full text-[#A3A3A8] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-[#1E1830] bg-[#070510] overflow-x-auto">
          {[
            { id: "recruiter", label: "⚡ Candidate Scanner", icon: ShieldCheck },
            { id: "gravity", label: "🪐 Anti-Gravity Physics", icon: Atom },
            { id: "hologram", label: "🪪 Holographic ID", icon: Award },
            { id: "synth", label: "🔊 Audio Synthesizer", icon: Volume2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (soundEnabled) sound.playClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[rgba(147,51,234,0.2)] text-[#E9D5FF] border border-[#9333EA]/50 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                    : "text-[#73737C] hover:text-[#F5F5F0] hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: RECRUITER 10-SEC TELEMETRY SCANNER */}
          {activeTab === "recruiter" && (
            <div className="space-y-6">
              <div className="bg-[#05040D] border border-[#231E38] rounded-2xl p-5 relative overflow-hidden font-mono text-xs text-[#94A3B8]">
                <div className="flex items-center justify-between border-b border-[#1E1830] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[var(--accent)]" />
                    <span className="text-[#F0EEF8] font-bold">AUTOMATED CANDIDATE AUDIT</span>
                  </div>
                  <button
                    onClick={startRecruiterScan}
                    disabled={isScanning}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(147,51,234,0.2)] border border-[#9333EA]/40 text-[#C084FC] hover:bg-[rgba(147,51,234,0.3)] transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isScanning ? "animate-spin" : ""}`} />
                    <span>{isScanning ? "Scanning..." : "Run Fast Scan"}</span>
                  </button>
                </div>

                <div className="space-y-2.5 min-h-[140px]">
                  <div className="text-emerald-400">&gt; Target: Krishika Rajput // UPES Computer Science (2024–2028)</div>
                  {scanStep >= 1 && (
                    <div className="flex items-center gap-2 text-[#CBD5E1]">
                      <span className="text-emerald-400">[VERIFIED]</span>
                      <span>Formal Education: B.Tech CSE · 8.24 CGPA · UPES Dehradun</span>
                    </div>
                  )}
                  {scanStep >= 2 && (
                    <div className="flex items-center gap-2 text-[#CBD5E1]">
                      <span className="text-emerald-400">[VERIFIED]</span>
                      <span>Cloud Certifications: Oracle OCI Foundations Associate + Google Cloud 20 Badges</span>
                    </div>
                  )}
                  {scanStep >= 3 && (
                    <div className="flex items-center gap-2 text-[#CBD5E1]">
                      <span className="text-emerald-400">[VERIFIED]</span>
                      <span>Commercial Internships: 2 Completed (Full-Stack Web, PostgreSQL RLS, React Architecture)</span>
                    </div>
                  )}
                  {scanStep >= 4 && (
                    <div className="flex items-center gap-2 text-[#CBD5E1]">
                      <span className="text-emerald-400">[VERIFIED]</span>
                      <span>Flagship Shipments: VeyloPrep (Opportunity Platform), Split-Sync (Realtime DB), Engineered.dev</span>
                    </div>
                  )}
                  {scanStep >= 5 && (
                    <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-between">
                      <span>✓ MATCH SCORE: 99.8% · IDEAL CANDIDATE FOR INTERNSHIP / FULL-STACK</span>
                      <span className="px-2 py-0.5 bg-emerald-500 text-black font-extrabold rounded text-[10px]">READY TO HIRE</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Stamp Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#0D0A1A] border border-[#231E38] flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-[#F5F5F0] text-base mb-1">
                      1-Click Recruiter Shortlist
                    </h4>
                    <p className="font-sans text-xs text-[#8B8A9A]">
                      Pre-populates an interview invitation email and triggers immediate candidate alert.
                    </p>
                  </div>
                  <button
                    onClick={handleShortlistCandidate}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold text-white transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED 0%, #10B981 100%)",
                      boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Shortlist &amp; Send Interview Invite
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D0A1A] border border-[#231E38] flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-[#F5F5F0] text-base mb-1">
                      Candidate Direct Line
                    </h4>
                    <p className="font-sans text-xs text-[#8B8A9A]">
                      Direct communication channel for engineering managers &amp; technical leads.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="flex-1 text-center py-3 rounded-xl border border-[#231E38] hover:border-[var(--accent)] bg-[#070510] text-[#F0EEF8] font-mono text-xs font-semibold transition-all hover:bg-[var(--accent-dim)]"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANTI-GRAVITY PHYSICS PLAYGROUND */}
          {activeTab === "gravity" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <span className="text-[#A3A3A8]">
                  💡 <strong>Click &amp; hold on canvas</strong> to spawn a Black Hole Gravity Vortex!
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={triggerSupernova}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/20 border border-pink-500/40 text-pink-300 hover:scale-105 transition-all"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    Supernova Blast
                  </button>

                  <button
                    onClick={() => {
                      if (soundEnabled) sound.playWarp();
                      setWarpMode(!warpMode);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                      warpMode
                        ? "bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                        : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                    }`}
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    {warpMode ? "Hyperdrive: ON" : "Warp Speed"}
                  </button>

                  <button
                    onClick={() => {
                      if (soundEnabled) sound.playClick();
                      setPaletteIndex((i) => (i + 1) % PALETTES.length);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#CBD5E1] hover:bg-white/10 transition-all"
                  >
                    Color Shift 🎨
                  </button>
                </div>
              </div>

              {/* Interactive Canvas */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#231E38] shadow-inner bg-[#05040A]">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full cursor-crosshair"
                />
                <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] text-[#554D6B]">
                  PHYSICS: NEWTONIAN GRAVITATIONAL VORTEX ENGINE
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 3D HOLOGRAPHIC CYBER ID CARD */}
          {activeTab === "hologram" && (
            <div className="flex flex-col items-center justify-center py-6">
              <div 
                className="relative w-full max-w-sm rounded-2xl p-6 border border-[#9333EA]/40 overflow-hidden group shadow-[0_0_50px_rgba(147,51,234,0.25)]"
                style={{
                  background: "linear-gradient(135deg, #0E0B1F 0%, #150F2C 50%, #0A0815 100%)",
                }}
              >
                {/* Hologram Light Reflection */}
                <div 
                  className="absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 20%, rgba(217,70,239,0.15) 40%, rgba(56,189,248,0.2) 60%, transparent 80%)",
                  }}
                />

                {/* Top ID Bar */}
                <div className="flex items-center justify-between border-b border-[#2A2345] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#A78BFA] font-bold">
                      VERIFIED DEVELOPER BADGE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6B6280]">LVL-3 SECURITY</span>
                </div>

                {/* Portrait + Info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#9333EA]/60 shadow-[0_0_15px_rgba(147,51,234,0.4)] shrink-0">
                    <img 
                      src="/images/profile/krishu.jpeg" 
                      alt="Krishika Rajput" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-[#F0EEF8]">
                      Krishika Rajput
                    </h3>
                    <p className="font-mono text-xs text-[#38BDF8]">
                      Full-Stack &amp; Systems Engineer
                    </p>
                    <p className="font-mono text-[10px] text-[#73737C] mt-0.5">
                      UPES Dehradun · Class of 2028
                    </p>
                  </div>
                </div>

                {/* Chips */}
                <div className="space-y-2 font-mono text-[10px] text-[#A89EC0] bg-[#070510]/80 p-3 rounded-xl border border-[#1E1830]">
                  <div className="flex justify-between">
                    <span className="text-[#6B6280]">SPECIALIZATION</span>
                    <span className="text-[#F0EEF8] font-bold">Cloud Architectures &amp; Backend RLS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6280]">CERTIFICATION</span>
                    <span className="text-emerald-400 font-bold">Oracle OCI Certified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6280]">COMMERCIAL INTERNSHIPS</span>
                    <span className="text-[#C084FC] font-bold">2 Completed</span>
                  </div>
                </div>

                {/* Bottom Hologram Stamp */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#2A2345]">
                  <div className="font-mono text-[8px] text-[#4A3F6B] tracking-widest">
                    ID-KSH-2026-UPES-VERIFIED
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    AUTHORIZED
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SCI-FI SOUND SYNTHESIZER */}
          {activeTab === "synth" && (
            <div className="space-y-4">
              <p className="font-sans text-xs text-[#8B8A9A]">
                Procedural Web Audio API sound generators running in real-time without external sound files. Click any generator to listen:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: "Laser Cannon", fn: () => sound.playLaser(), color: "from-pink-600 to-rose-600" },
                  { name: "Warp Sweep", fn: () => sound.playWarp(), color: "from-cyan-600 to-blue-600" },
                  { name: "Power Up", fn: () => sound.playPowerUp(), color: "from-purple-600 to-indigo-600" },
                  { name: "Matrix Glitch", fn: () => sound.playGlitch(), color: "from-emerald-600 to-teal-600" },
                ].map((s) => (
                  <button
                    key={s.name}
                    onClick={s.fn}
                    className={`p-4 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-br ${s.color} hover:scale-105 active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center gap-2`}
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1E1830] bg-[#070510] flex items-center justify-between text-[11px] font-mono text-[#5A5370]">
          <span>⚡ PRESS [ESC] TO CLOSE COCKPIT</span>
          <span className="text-[#C084FC]">KRISHIKA RAJPUT · PORTFOLIO MATRIX</span>
        </div>
      </div>
    </div>
  );
}
