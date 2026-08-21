"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

const COLORS = [
  "#A855F7", // Purple
  "#EC4899", // Pink
  "#38BDF8", // Cyan
  "#FBBF24", // Gold
  "#10B981", // Emerald
];

export function CosmicCursorTrail({ enabled = true }: { enabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; lastX: number; lastY: number }>({
    x: -100,
    y: -100,
    lastX: -100,
    lastY: -100,
  });
  const { soundEnabled } = useTheme();

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    let animId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseRef.current.lastX;
      const dy = e.clientY - mouseRef.current.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Spawn stardust based on motion
      const count = Math.min(4, Math.max(1, Math.floor(dist / 12)));
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const maxLife = 25 + Math.random() * 20;

        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed - dx * 0.05,
          vy: Math.sin(angle) * speed - dy * 0.05 - 0.2, // subtle gravity float up
          size: 1.5 + Math.random() * 2.5,
          color,
          alpha: 1,
          life: maxLife,
          maxLife,
        });
      }

      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      // Supernova mini shockwave
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2 + Math.random() * 0.2;
        const speed = 2 + Math.random() * 4;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const maxLife = 35 + Math.random() * 25;

        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2.5 + Math.random() * 3,
          color,
          alpha: 1,
          life: maxLife,
          maxLife,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 1;

        p.alpha = Math.max(0, p.life / p.maxLife);

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha * 0.8;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    />
  );
}
