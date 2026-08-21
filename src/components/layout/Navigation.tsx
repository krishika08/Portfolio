"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/components/ui/Link";
import { navigationItems } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import { useTheme } from "@/components/ui/ThemeContext";
import { sound } from "@/components/ui/SoundEffects";
import { Terminal, User, Briefcase, Zap, Compass, MessageSquare, Home } from "lucide-react";

const NAV_LINKS = navigationItems;

const getIconForLabel = (label: string) => {
  switch (label.toLowerCase()) {
    case 'home': return <Home size={16} />;
    case 'works': return <Briefcase size={16} />;
    case 'skills': return <Zap size={16} />;
    case 'journey': return <Compass size={16} />;
    case 'about': return <User size={16} />;
    case 'contact': return <MessageSquare size={16} />;
    default: return <Terminal size={16} />;
  }
};

// Client-only nav with active hash tracking — avoids SSR hydration mismatch
function ActiveNav() {
  const { soundEnabled } = useTheme();
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const update = () => setActiveHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("scroll", () => {
      // Update active based on which section is in view
      const sections = ["hero", "work", "skills", "experience", "about", "contact"];
      const scrollPos = window.scrollY + 120;
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveHash(`#${id}`);
          break;
        }
      }
    }, { passive: true });
    return () => {};
  }, []);

  return (
    <nav className="flex flex-col gap-1 flex-1" aria-label="Main Navigation">
      {NAV_LINKS.map((link) => {
        const hash = link.href.split("#")[1] || "";
        const isActive = activeHash === `#${hash}`;
        return (
          <a
            key={link.label}
            href={link.href}
            onClick={() => { if (soundEnabled) sound.playClick(); }}
            className={`group flex items-center gap-3 font-sans text-[13px] font-medium transition-all duration-200 px-4 py-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
              isActive
                ? "nav-active-bar bg-gradient-to-r from-[#2e1d5e] to-[#1c1242] text-white shadow-[0_0_15px_rgba(124,58,237,0.2)] border border-[#7C3AED]/30 font-semibold"
                : "text-[#7A7090] hover:text-[#F0EEF8] hover:bg-[var(--accent-dim)] border border-transparent hover:tracking-wide"
            }`}
          >
            <span className={`shrink-0 transition-colors ${isActive ? "text-[var(--accent)]" : "text-[#4A3F6B] group-hover:text-[var(--accent)]"}`}>
              {getIconForLabel(link.label)}
            </span>
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { soundEnabled } = useTheme();

  // Update time for the terminal status
  const [time, setTime] = useState<string>("20:28:01 IST");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false });
      setTime(`${timeString} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentMenu = menuRef.current;
    if (isMobileMenuOpen && currentMenu) {
      const focusableElements = currentMenu.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
          return;
        }
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      currentMenu.addEventListener("keydown", handleKeyDown);
      firstElement?.focus();
      return () => currentMenu.removeEventListener("keydown", handleKeyDown);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex flex-col w-[220px] lg:w-[240px] h-[100dvh] sticky top-0 border-r border-[#1E1830] bg-[#0D0A1A] shrink-0 py-7 px-4 z-40 overflow-hidden">
        {/* Subtle top-glow line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40" />

        {/* Decorative planet background */}
        <div 
          className="absolute bottom-[-60px] left-[-60px] w-[180px] h-[180px] rounded-full pointer-events-none opacity-25"
          style={{
            background: "radial-gradient(circle at center, #7C3AED 0%, #3B82F6 50%, transparent 80%)",
            filter: "blur(12px)",
            boxShadow: "0 0 40px rgba(124,58,237,0.3)"
          }}
        />
        
        {/* Brand */}
        <div className="mb-10 px-2">
          <Link
            href="/"
            onClick={() => {
              if (soundEnabled) sound.playClick();
            }}
            className="font-display font-extrabold text-lg text-[#F0EEF8] tracking-tight hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm flex items-center gap-1.5"
          >
            <span className="text-3xl">K</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D946EF] shadow-[0_0_8px_#D946EF] mt-3" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ActiveNav />

        {/* Bottom Widgets */}
        <div className="mt-6 flex flex-col gap-3">
          {/* Status Module */}
          <div className="p-3 rounded-xl border border-[#1E1830] bg-[#0A0815] flex flex-col gap-2 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[1px] opacity-50"
              style={{ background: "linear-gradient(90deg, transparent, #22C55E, transparent)" }}
            />
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#4A3F6B]">OPEN TO WORK</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="ping-ring" style={{ color: "#22C55E", animationDuration: "1.6s" }} />
                <span className="ping-ring" style={{ color: "#22C55E", animationDuration: "1.6s", animationDelay: "0.5s", opacity: 0.4 }} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
              </span>
              <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider">READY TO HIRE</span>
            </div>
            <div className="font-mono text-[9px] text-[#4A3F6B] pt-1 border-t border-[#1E1830]">
              {time}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { if (soundEnabled) sound.playClick(); }}
              className="flex items-center gap-2.5 px-3 py-2 text-[#7A7090] hover:text-[#F0EEF8] transition-colors rounded-lg hover:bg-[var(--accent-dim)] text-[12px]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span className="font-mono text-[10px] flex-1 uppercase tracking-wider">GitHub</span>
              <span className="text-[10px] opacity-50">↗</span>
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { if (soundEnabled) sound.playClick(); }}
              className="flex items-center gap-2.5 px-3 py-2 text-[#7A7090] hover:text-[#F0EEF8] transition-colors rounded-lg hover:bg-[var(--accent-dim)] text-[12px]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span className="font-mono text-[10px] flex-1 uppercase tracking-wider">LinkedIn</span>
              <span className="text-[10px] opacity-50">↗</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* ── MOBILE TOP NAVIGATION ── */}
      <header className={`md:hidden fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 py-4 transition-all duration-300 ${isScrolled ? "bg-[#08080A]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <Link
          href="/"
          onClick={() => {
            if (soundEnabled) sound.playClick();
          }}
          className="font-display font-bold text-lg text-[#F5F5F0] tracking-tight hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm flex items-center gap-1.5"
        >
          <span className="text-xl">K</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D946EF] shadow-[0_0_8px_#D946EF] mt-1.5" />
        </Link>
        <button
          ref={triggerRef}
          className="p-2 -mr-2 text-[#F5F5F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-full"
          onClick={() => {
            if (soundEnabled) sound.playClick();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-[9px]" : "w-6"}`} />
            <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 w-6" : "w-4"}`} />
            <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-[9px]" : "w-5"}`} />
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out pointer-events-auto ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
        ref={menuRef}
      >
        <div
          className="absolute inset-0 bg-[#08080A]/95 backdrop-blur-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`relative flex flex-col h-full p-8 pt-24 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <button
            className="absolute top-6 right-6 p-2 text-[#A3A3A8] hover:text-[#F5F5F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <nav className="flex flex-col gap-6 flex-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-display text-4xl font-bold text-[#F5F5F0] hover:text-[var(--accent)] hover:no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm opacity-0 ${
                  isMobileMenuOpen ? "animate-float-up" : ""
                }`}
                style={{ animationDelay: `${i * 0.06}s`, animationFillMode: "both" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-4 w-full" />
            <Link
              href={`mailto:${siteConfig.contact.email}?subject=Resume%20Request`}
              className="font-display text-2xl font-bold text-[var(--accent)] hover:brightness-110 hover:no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request Resume ↗
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
