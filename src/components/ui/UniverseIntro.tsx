"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   UniverseIntro
   A full-screen canvas-driven "Big Bang" intro that plays once
   per session, then dissolves to reveal the site.

   Timeline:
   0.0 s  — black void
   0.3 s  — first particles ignite at center (singularity)
   0.8 s  — star field explodes outward (Big Bang)
   2.0 s  — nebula clouds bloom (purple / cyan / pink)
   3.0 s  — "K." brand mark forms from converging particles
   4.0 s  — full name "Krishika" + tagline revealed
   4.8 s  — iris-wipe dissolve → site is revealed
───────────────────────────────────────────────────────────── */

interface Star {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
  born: number; // ms timestamp
}

interface Nebula {
  x: number; y: number;
  r: number;
  color: string;
  opacity: number;
  growing: boolean;
  maxR: number;
  speed: number;
}

const STAR_COLORS = ["#ffffff", "#C4B5FD", "#93C5FD", "#F9A8D4", "#6EE7B7", "#FDE68A"];
const NEBULA_COLORS = [
  "rgba(124,58,237,",
  "rgba(217,70,239,",
  "rgba(56,189,248,",
  "rgba(16,185,129,",
  "rgba(236,72,153,",
];

export function UniverseIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);
  const [phase, setPhase] = useState<
    "void" | "bang" | "nebula" | "brand" | "name" | "dissolve" | "done"
  >("void");
  const [nameVisible, setNameVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const phaseRef = useRef<string>("void");

  /* track phase in ref for canvas loop */
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  /* ── Canvas animation loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;


    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    const cx = W / 2, cy = H / 2;

    /* seed nebulae */
    nebulaeRef.current = Array.from({ length: 6 }, (_, i) => ({
      x: cx + (Math.random() - 0.5) * W * 0.6,
      y: cy + (Math.random() - 0.5) * H * 0.5,
      r: 0,
      color: NEBULA_COLORS[i % NEBULA_COLORS.length],
      opacity: 0,
      growing: true,
      maxR: 200 + Math.random() * 300,
      speed: 0.8 + Math.random() * 0.8,
    }));

    startRef.current = performance.now();

    function spawnBang(t: number) {
      /* burst of 300 stars from center */
      const count = Math.min(300, starsRef.current.length < 300 ? 300 - starsRef.current.length : 0);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 3.5;
        starsRef.current.push({
          x: cx + (Math.random() - 0.5) * 40,
          y: cy + (Math.random() - 0.5) * 40,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 0.4 + Math.random() * 1.6,
          opacity: 0,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          twinkleSpeed: 0.5 + Math.random() * 1.5,
          twinkleOffset: Math.random() * Math.PI * 2,
          born: t,
        });
      }
    }

    let bangFired = false;
    let nebulaStarted = false;

    function draw(now: number) {
      const elapsed = now - startRef.current;
      const p = phaseRef.current;

      ctx.clearRect(0, 0, W, H);

      /* background */
      const bgAlpha = Math.min(1, elapsed / 400);
      ctx.fillStyle = `rgba(8,7,15,${bgAlpha})`;
      ctx.fillRect(0, 0, W, H);

      /* ── PHASE: void singularity glow ── */
      if (elapsed > 200) {
        const singR = Math.min(60, (elapsed - 200) / 10);
        const sAlpha = Math.min(0.7, (elapsed - 200) / 600);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, singR);
        grad.addColorStop(0, `rgba(255,255,255,${sAlpha})`);
        grad.addColorStop(0.3, `rgba(217,70,239,${sAlpha * 0.8})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, singR, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ── PHASE: Big Bang at 800ms ── */
      if (elapsed > 800 && !bangFired) {
        bangFired = true;
        spawnBang(now);

        /* shockwave ring */
        setTimeout(() => {
          /* extra 200 stars sprinkled across viewport */
          for (let i = 0; i < 200; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 100 + Math.random() * Math.max(W, H) * 0.6;
            starsRef.current.push({
              x: cx + Math.cos(angle) * dist * 0.05,
              y: cy + Math.sin(angle) * dist * 0.05,
              vx: Math.cos(angle) * (1 + Math.random() * 2),
              vy: Math.sin(angle) * (1 + Math.random() * 2),
              radius: 0.3 + Math.random() * 1.2,
              opacity: 0,
              color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
              twinkleSpeed: 0.3 + Math.random() * 1,
              twinkleOffset: Math.random() * Math.PI * 2,
              born: now,
            });
          }
        }, 80);
      }

      /* shockwave ring */
      if (elapsed > 800 && elapsed < 1600) {
        const ringT = (elapsed - 800) / 800;
        const ringR = ringT * Math.max(W, H) * 0.8;
        const ringAlpha = (1 - ringT) * 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(217,70,239,${ringAlpha})`;
        ctx.lineWidth = 3 - ringT * 2;
        ctx.stroke();
      }

      /* ── Nebulae at 2000ms ── */
      if (elapsed > 2000 && !nebulaStarted) {
        nebulaStarted = true;
      }
      if (nebulaStarted) {
        nebulaeRef.current.forEach((neb) => {
          if (neb.r < neb.maxR) neb.r += neb.speed;
          neb.opacity = Math.min(0.18, neb.r / neb.maxR * 0.18);
          const g = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.r);
          g.addColorStop(0, `${neb.color}${neb.opacity})`);
          g.addColorStop(0.5, `${neb.color}${neb.opacity * 0.4})`);
          g.addColorStop(1, `${neb.color}0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(neb.x, neb.y, neb.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      /* ── Stars ── */
      starsRef.current.forEach((s) => {
        const age = now - s.born;
        const fadeIn = Math.min(1, age / 600);
        const tw = Math.sin(now * 0.001 * s.twinkleSpeed + s.twinkleOffset) * 0.35 + 0.65;
        s.opacity = fadeIn * tw;

        /* slow drift deceleration */
        s.vx *= 0.998;
        s.vy *= 0.998;
        s.x += s.vx;
        s.y += s.vy;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.opacity * 0.85;
        /* small glow */
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.radius * 3;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      /* ── Grid overlay ── */
      if (elapsed > 2500) {
        const gAlpha = Math.min(0.04, (elapsed - 2500) / 5000 * 0.04);
        ctx.strokeStyle = `rgba(139,92,246,${gAlpha})`;
        ctx.lineWidth = 0.5;
        for (let gx = 0; gx < W; gx += 60) {
          ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
        }
        for (let gy = 0; gy < H; gy += 60) {
          ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    /* Phase transitions */
    const t1 = setTimeout(() => setPhase("bang"),   800);
    const t2 = setTimeout(() => setPhase("nebula"), 2000);
    const t3 = setTimeout(() => { setPhase("brand"); setBrandVisible(true); }, 3000);
    const t4 = setTimeout(() => { setPhase("name");  setNameVisible(true); },  3800);
    const t5 = setTimeout(() => setPhase("dissolve"), 5000);
    const t6 = setTimeout(() => { setPhase("done"); onComplete(); }, 6200);

    return () => {
      cancelAnimationFrame(rafRef.current);
      [t1,t2,t3,t4,t5,t6].forEach(clearTimeout);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const dissolving = phase === "dissolve";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: "#08070F",
        transition: dissolving ? "opacity 1.2s cubic-bezier(0.4,0,0.2,1)" : "none",
        opacity: dissolving ? 0 : 1,
        pointerEvents: dissolving ? "none" : "all",
      }}
    >
      {/* Canvas universe */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      />

      {/* Center overlay: brand + name */}
      <div
        className="relative z-10 flex flex-col items-center gap-4 text-center select-none pointer-events-none"
        style={{ perspective: "600px" }}
      >
        {/* "K." brand mark — forms from center */}
        <div
          className="font-display font-black"
          style={{
            fontSize: "clamp(5rem,15vw,10rem)",
            lineHeight: 1,
            opacity: brandVisible ? 1 : 0,
            transform: brandVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.6)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            background: "linear-gradient(135deg, #9333EA 0%, #EC4899 40%, #F43F5E 70%, #FBBF24 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: brandVisible ? "drop-shadow(0 0 40px rgba(147,51,234,0.8)) drop-shadow(0 0 80px rgba(236,72,153,0.4))" : "none",
          }}
        >
          K.
        </div>

        {/* Full name */}
        <div
          style={{
            opacity: nameVisible ? 1 : 0,
            transform: nameVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          <div
            className="font-display font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2rem,6vw,4.5rem)",
              background: "linear-gradient(135deg, #F0EEF8, #C4B5FD)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            Krishika
          </div>
          <div
            className="font-mono text-[11px] tracking-[0.4em] uppercase mt-2"
            style={{
              color: "rgba(167,139,250,0.7)",
              opacity: nameVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.4s",
            }}
          >
            Full-Stack Developer · CS Engineer
          </div>
        </div>

        {/* Loading bar */}
        {!dissolving && (
          <div className="mt-8 w-40 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #7C3AED, #EC4899, #10B981)",
                animation: "intro-load-bar 4.8s cubic-bezier(0.4,0,0.2,1) forwards",
              }}
            />
          </div>
        )}
      </div>

      {/* Corner version stamp */}
      <div
        className="absolute bottom-8 right-8 font-mono text-[10px] tracking-[0.2em] uppercase pointer-events-none"
        style={{
          color: "rgba(107,98,128,0.6)",
          opacity: nameVisible ? 1 : 0,
          transition: "opacity 0.6s ease 0.5s",
        }}
      >
        Portfolio 2026
      </div>
    </div>
  );
}
