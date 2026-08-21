"use client";

import React from "react";
import { 
  ExternalLink, 
  Terminal, 
  CheckCircle2, 
  Circle, 
  Smartphone, 
  Layers, 
  Database, 
  Sparkles, 
  Code2, 
  ShieldCheck, 
  Cpu, 
  KeyRound, 
  Globe 
} from "lucide-react";

export function VeyloPrepCaseStudy() {
  return (
    <div className="space-y-16 text-[#CBD5E1] font-sans">
      
      {/* ── HERO BANNER ────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden border border-[#231E38] bg-[#0D0A1A] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <img
          src="/showcase/veylo-prep-hero.png"
          alt="VeyloPrep — Your Placement Journey, Organised"
          className="w-full h-auto object-cover rounded-2xl"
        />
      </div>

      {/* ── HEADER & QUICK LINKS ────────────────────────────── */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#F8FAFC] tracking-tight">
          VeyloPrep
        </h1>
        <p className="font-display text-xl sm:text-2xl text-[var(--accent)] font-semibold">
          Your Placement Journey, Organised.
        </p>
        <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
          A mobile-first career-readiness workspace for managing applications, placement milestones, job portals, resumes, certificates and professional information — all in one place.
        </p>

        {/* Quick Nav Pill Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <a
            href="https://veylo-prep.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-bold text-white bg-[linear-gradient(135deg,#7C3AED_0%,#9333EA_100%)] shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:brightness-110 transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            Live App
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="#product-showcase"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-medium text-[#CBD5E1] bg-[#121218] border border-[#23232B] hover:border-[var(--accent)] hover:text-white transition-colors"
          >
            Showcase
          </a>
          <a
            href="#system-architecture"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-medium text-[#CBD5E1] bg-[#121218] border border-[#23232B] hover:border-[var(--accent)] hover:text-white transition-colors"
          >
            Architecture
          </a>
          <a
            href="#getting-started"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-medium text-[#CBD5E1] bg-[#121218] border border-[#23232B] hover:border-[var(--accent)] hover:text-white transition-colors"
          >
            Run Locally
          </a>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── OVERVIEW ────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            01 / Introduction
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Overview
        </h2>

        <div className="bg-[#0D0A1A]/80 border border-[#231E38] rounded-2xl p-6 sm:p-8 space-y-4 leading-relaxed text-[#A3A3A8] text-base">
          <p className="font-display text-lg sm:text-xl text-[#F1F5F9] font-medium">
            Placement preparation rarely happens in one place.
          </p>
          <p>
            Applications live in spreadsheets. Interview dates sit in calendars. Resumes and certificates are scattered across folders. Job portals become browser bookmarks, while deadlines and tasks end up in notes.
          </p>
          <p className="text-[#F8FAFC] font-semibold border-l-2 border-[var(--accent)] pl-4 py-1 bg-[rgba(124,58,237,0.05)] rounded-r-lg">
            VeyloPrep brings that fragmented workflow into one structured career workspace.
          </p>
          <p>
            Built for college students preparing for internships and placements, VeyloPrep provides a central place to track opportunities, manage upcoming milestones, organise career resources and maintain a reusable professional profile.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── PRODUCT SHOWCASE ────────────────────────────────── */}
      <section id="product-showcase" className="space-y-12">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            02 / Visual Walkthrough
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC] mb-2">
            Product Showcase
          </h2>
          <p className="text-[#94A3B8] text-sm">
            High-fidelity mobile views engineered for seamless day-to-day placement workflows.
          </p>
        </div>

        {/* 2x2 Grid for compact, crystal-clear mobile showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. Career Dashboard */}
          <div className="flex flex-col justify-between p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] hover:border-[var(--accent)] transition-all duration-300 gap-5">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                Career Dashboard
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Get a clear view of your placement journey, upcoming priorities and application progress from one home screen.
              </p>
            </div>
            <div className="flex justify-center items-center py-2">
              <div className="w-[230px] sm:w-[250px] rounded-xl overflow-hidden border border-[#231E38] bg-[#05040A] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <img
                  src="/showcase/dashboard.png"
                  alt="VeyloPrep Career Dashboard"
                  className="w-full h-auto object-contain rounded-xl block"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* 2. Application Tracker */}
          <div className="flex flex-col justify-between p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] hover:border-[var(--accent)] transition-all duration-300 gap-5">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                Application Tracker
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Track opportunities through the complete application journey — from applying to assessments, interviews and offers.
              </p>
            </div>
            <div className="flex justify-center items-center py-2">
              <div className="w-[230px] sm:w-[250px] rounded-xl overflow-hidden border border-[#231E38] bg-[#05040A] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <img
                  src="/showcase/tracker.png"
                  alt="VeyloPrep Application Tracker"
                  className="w-full h-auto object-contain rounded-xl block"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* 3. Today & Milestones */}
          <div className="flex flex-col justify-between p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] hover:border-[var(--accent)] transition-all duration-300 gap-5">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                Today &amp; Milestones
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Keep interviews, assessments, deadlines and other placement activities visible and organised.
              </p>
            </div>
            <div className="flex justify-center items-center py-2">
              <div className="w-[230px] sm:w-[250px] rounded-xl overflow-hidden border border-[#231E38] bg-[#05040A] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <img
                  src="/showcase/today.png"
                  alt="VeyloPrep Today and Milestones"
                  className="w-full h-auto object-contain rounded-xl block"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* 4. Job Hub */}
          <div className="flex flex-col justify-between p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] hover:border-[var(--accent)] transition-all duration-300 gap-5">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                Job Hub
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Keep frequently used job portals and career resources accessible from one organised hub, with support for custom portals.
              </p>
            </div>
            <div className="flex justify-center items-center py-2">
              <div className="w-[230px] sm:w-[250px] rounded-xl overflow-hidden border border-[#231E38] bg-[#05040A] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <img
                  src="/showcase/job-hub.png"
                  alt="VeyloPrep Job Hub"
                  className="w-full h-auto object-contain rounded-xl block"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* 5. Career Vault & Resources Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
                Career Vault
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Maintain the information and documents repeatedly needed throughout internship and placement applications.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#1E1830] font-mono text-xs text-[var(--accent)]">
              Unified Profile &amp; Document Store
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] mb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[var(--accent)]" />
                Career Resources
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Organise resumes, certificates and professional links so important career assets remain easy to access.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#1E1830] font-mono text-xs text-[var(--accent)]">
              Multi-version Asset Management
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── CORE FEATURES TABLE ────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            03 / Functional Scope
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Core Features
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-[#231E38] bg-[#0D0A1A]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#231E38] bg-[#121020]/60">
                <th className="p-4 font-mono font-bold text-xs uppercase tracking-wider text-[var(--accent)] w-1/3">
                  Area
                </th>
                <th className="p-4 font-mono font-bold text-xs uppercase tracking-wider text-[#CBD5E1]">
                  Capabilities
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1830]">
              {[
                { area: "Career Dashboard", cap: "Placement overview, application progress and current priorities" },
                { area: "Application Tracker", cap: "Application records, stage tracking, details and notes" },
                { area: "Milestones", cap: "Interviews, assessments, deadlines and upcoming placement activities" },
                { area: "Job Hub", cap: "Organised job-portal directory with custom portal management" },
                { area: "Career Vault", cap: "Career profile, education details and reusable professional information" },
                { area: "Resume Management", cap: "Multiple resume versions and default resume selection" },
                { area: "Certificates", cap: "Certificate and document organisation" },
                { area: "Professional Links", cap: "LinkedIn, GitHub, portfolio and other reusable links" },
                { area: "Profile & Settings", cap: "Personal information, profile editing and appearance preferences" },
                { area: "Authentication", cap: "User authentication and persistent account-based data" },
                { area: "Cross-Platform", cap: "Responsive web app, installable PWA and Android app through Capacitor" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#151226]/50 transition-colors">
                  <td className="p-4 font-semibold text-[#F1F5F9]">{row.area}</td>
                  <td className="p-4 text-[#94A3B8]">{row.cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── DEMO FLOW ───────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            04 / Interactive Walkthrough
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Demo
        </h2>
        <p className="text-[#94A3B8] text-sm sm:text-base">
          A short walkthrough of the core VeyloPrep experience:
        </p>

        <div className="p-6 rounded-2xl border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.04)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-bold text-base sm:text-lg text-[#F8FAFC] tracking-wide text-center md:text-left">
            Dashboard <span className="text-[var(--accent)]">→</span> Applications <span className="text-[var(--accent)]">→</span> Today <span className="text-[var(--accent)]">→</span> Job Hub <span className="text-[var(--accent)]">→</span> Career Vault
          </div>
          <a
            href="https://veylo-prep.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-[var(--accent)] hover:brightness-110 transition-all shrink-0"
          >
            Launch Live Demo
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── SYSTEM ARCHITECTURE ─────────────────────────────── */}
      <section id="system-architecture" className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            05 / Technical Stack & Architecture
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          System Architecture
        </h2>

        <div className="bg-[#0D0A1A] border border-[#231E38] rounded-2xl p-6 sm:p-8 space-y-4 leading-relaxed text-[#A3A3A8]">
          <p className="text-base text-[#F1F5F9]">
            VeyloPrep uses a shared <strong className="text-[var(--accent)]">React + TypeScript</strong> application across its web and mobile experiences.
          </p>
          <p>
            The application communicates with <strong className="text-[#F1F5F9]">Supabase</strong> for authentication and persistent PostgreSQL-backed data. The web application is deployed through <strong className="text-[#F1F5F9]">Vercel</strong>, while <strong className="text-[#F1F5F9]">Capacitor</strong> packages the same application for Android.
          </p>
        </div>

        {/* Tech Stack Table */}
        <h3 className="font-display font-bold text-xl text-[#F8FAFC] pt-4">
          Tech Stack
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-[#231E38] bg-[#0D0A1A]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#231E38] bg-[#121020]/60">
                <th className="p-4 font-mono font-bold text-xs uppercase tracking-wider text-[var(--accent)] w-1/3">
                  Layer
                </th>
                <th className="p-4 font-mono font-bold text-xs uppercase tracking-wider text-[#CBD5E1]">
                  Technology
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1830]">
              {[
                { layer: "Frontend", tech: "React 19" },
                { layer: "Language", tech: "TypeScript 5.8" },
                { layer: "Build Tool", tech: "Vite 6" },
                { layer: "Backend / BaaS", tech: "Supabase" },
                { layer: "Database", tech: "PostgreSQL" },
                { layer: "Authentication", tech: "Supabase Auth" },
                { layer: "Styling", tech: "Custom CSS" },
                { layer: "Mobile", tech: "Capacitor 8" },
                { layer: "PWA", tech: "Progressive Web App" },
                { layer: "Deployment", tech: "Vercel" },
                { layer: "Package Manager", tech: "npm" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#151226]/50 transition-colors">
                  <td className="p-4 font-semibold text-[#F1F5F9]">{row.layer}</td>
                  <td className="p-4 font-mono text-xs text-[var(--accent)]">{row.tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── ENGINEERING HIGHLIGHTS ──────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            06 / Deep Dive
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Engineering Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-3">
            <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-xs font-bold uppercase">
              <Smartphone className="w-4 h-4" />
              <span>Cross-Platform Architecture</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              VeyloPrep uses a shared React and TypeScript codebase across the web application, installable PWA and Android application, reducing duplicated platform logic while maintaining a mobile-first experience.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-3">
            <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-xs font-bold uppercase">
              <Code2 className="w-4 h-4" />
              <span>Modular Feature Architecture</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Major product areas are separated under <code className="text-[#F1F5F9] bg-[#1E1830] px-1.5 py-0.5 rounded font-mono text-xs">src/features/</code>, keeping dashboard, tracking, milestones, jobs and vault functionality independently organised.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-3">
            <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-xs font-bold uppercase">
              <Database className="w-4 h-4" />
              <span>Persistent User Experience</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Supabase provides authentication and persistent PostgreSQL-backed storage so career information and placement activity remain associated with the authenticated user.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-3">
            <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Mobile-First Product Design</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              The interface is designed around mobile workflows with bottom navigation, responsive layouts and interaction patterns suited to frequent day-to-day placement tracking.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-xs font-bold uppercase">
              <Cpu className="w-4 h-4" />
              <span>Native Android Packaging</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Capacitor bridges the web application into an Android project, allowing the same product to run as an installable Android application while preserving the shared application codebase.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── PROJECT STRUCTURE ──────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            07 / Codebase Structure
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Project Structure
        </h2>

        <div className="rounded-2xl border border-[#231E38] bg-[#08070F] p-6 font-mono text-xs text-[#CBD5E1] overflow-x-auto shadow-inner">
          <pre className="leading-relaxed">
{`VeyloPrep/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   │
│   ├── config/
│   │   ├── assets.ts
│   │   └── constants.ts
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   ├── tracker/
│   │   ├── deadlines/
│   │   ├── jobs/
│   │   └── vault/
│   │
│   ├── providers/
│   │   ├── navigation.provider.tsx
│   │   └── theme.provider.tsx
│   │
│   └── repositories/
│
├── android/
├── assets/
│
├── showcase/
│   ├── hero/
│   ├── screenshots/
│   └── demo/
│
├── docs/
│   └── architecture/
│
├── .env.example
├── capacitor.config.ts
├── package.json
├── vite.config.ts
└── README.md`}
          </pre>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── GETTING STARTED & LOCAL RUN ────────────────────── */}
      <section id="getting-started" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            08 / Local Execution
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Getting Started
        </h2>

        {/* Prerequisites */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-lg text-[#F1F5F9]">Prerequisites</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#94A3B8]">
            <li className="flex items-center gap-2 bg-[#0D0A1A] p-3 rounded-lg border border-[#231E38]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" /> Node.js 20+
            </li>
            <li className="flex items-center gap-2 bg-[#0D0A1A] p-3 rounded-lg border border-[#231E38]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" /> npm
            </li>
            <li className="flex items-center gap-2 bg-[#0D0A1A] p-3 rounded-lg border border-[#231E38]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" /> Supabase project
            </li>
            <li className="flex items-center gap-2 bg-[#0D0A1A] p-3 rounded-lg border border-[#231E38]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" /> Android Studio (for native Android)
            </li>
          </ul>
        </div>

        {/* Commands */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#F1F5F9]">Setup &amp; Development Commands</h3>
          
          <div className="space-y-3">
            <div className="rounded-xl border border-[#231E38] bg-[#08070F] overflow-hidden">
              <div className="px-4 py-2 bg-[#121020] border-b border-[#231E38] flex items-center justify-between">
                <span className="font-mono text-xs text-[#94A3B8]">1. Clone &amp; Install</span>
                <Terminal className="w-3.5 h-3.5 text-[#6B6280]" />
              </div>
              <pre className="p-4 font-mono text-xs text-[#CBD5E1] overflow-x-auto">
{`git clone <YOUR-GITHUB-REPOSITORY-URL>
cd VeyloPrep
npm install`}
              </pre>
            </div>

            <div className="rounded-xl border border-[#231E38] bg-[#08070F] overflow-hidden">
              <div className="px-4 py-2 bg-[#121020] border-b border-[#231E38] flex items-center justify-between">
                <span className="font-mono text-xs text-[#94A3B8]">2. Configure Environment Variables (.env)</span>
                <KeyRound className="w-3.5 h-3.5 text-[#6B6280]" />
              </div>
              <pre className="p-4 font-mono text-xs text-[#CBD5E1] overflow-x-auto">
{`VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_APP_URL=http://localhost:3010`}
              </pre>
            </div>

            <div className="rounded-xl border border-[#231E38] bg-[#08070F] overflow-hidden">
              <div className="px-4 py-2 bg-[#121020] border-b border-[#231E38] flex items-center justify-between">
                <span className="font-mono text-xs text-[#94A3B8]">3. Run &amp; Build</span>
                <Terminal className="w-3.5 h-3.5 text-[#6B6280]" />
              </div>
              <pre className="p-4 font-mono text-xs text-[#CBD5E1] overflow-x-auto">
{`# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview`}
              </pre>
            </div>
          </div>
        </div>

        {/* Android Capacitor Section */}
        <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-4">
          <h3 className="font-display font-bold text-lg text-[#F8FAFC] flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[var(--accent)]" />
            Android Native Build
          </h3>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            VeyloPrep uses Capacitor to package the application for Android. Build the web application and synchronise it with the Android project:
          </p>
          <pre className="p-4 rounded-xl border border-[#231E38] bg-[#08070F] font-mono text-xs text-[#CBD5E1] overflow-x-auto">
{`npm run build
npx cap sync android
npx cap open android`}
          </pre>
          <p className="text-xs text-[#6B6280]">
            This opens the native Android project in Android Studio for building, running emulator instances, and testing signed release packages.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── ENVIRONMENT VARIABLES ──────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            09 / Configuration
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Environment Variables
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-[#231E38] bg-[#0D0A1A]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#231E38] bg-[#121020]/60">
                <th className="p-4 font-mono font-bold text-xs uppercase tracking-wider text-[var(--accent)] w-1/3">
                  Variable
                </th>
                <th className="p-4 font-mono font-bold text-xs uppercase tracking-wider text-[#CBD5E1]">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1830]">
              {[
                { var: "VITE_SUPABASE_URL", purp: "Supabase project URL" },
                { var: "VITE_SUPABASE_ANON_KEY", purp: "Client-side Supabase anonymous key" },
                { var: "VITE_APP_URL", purp: "Application base URL" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#151226]/50 transition-colors">
                  <td className="p-4 font-mono text-xs text-[var(--accent)] font-semibold">{row.var}</td>
                  <td className="p-4 text-[#94A3B8]">{row.purp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#6B6280] italic">
          Environment-specific values should be configured locally or through the deployment platform rather than committed to the repository.
        </p>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── PLATFORM SUPPORT ───────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            10 / Availability
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Platform Support
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-[#231E38] bg-[#0D0A1A]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#231E38] bg-[#121020]/60">
                <th className="p-4 font-mono font-bold text-xs uppercase tracking-wider text-[var(--accent)] w-1/3">
                  Platform
                </th>
                <th className="p-4 font-mono font-bold text-xs uppercase tracking-wider text-[#CBD5E1]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1830]">
              {[
                { plat: "Web", stat: "Available", color: "text-[#22C55E]" },
                { plat: "PWA", stat: "Available", color: "text-[#22C55E]" },
                { plat: "Android", stat: "Available through Capacitor", color: "text-[#22C55E]" },
                { plat: "iOS", stat: "Development / Testing", color: "text-[#F59E0B]" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#151226]/50 transition-colors">
                  <td className="p-4 font-semibold text-[#F1F5F9]">{row.plat}</td>
                  <td className={`p-4 font-mono text-xs font-bold ${row.color}`}>{row.stat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── ROADMAP ─────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            11 / Trajectory
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Roadmap
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { text: "Career Dashboard", done: true },
            { text: "Application Tracker", done: true },
            { text: "Today & Milestones", done: true },
            { text: "Job Hub", done: true },
            { text: "Career Vault", done: true },
            { text: "Resume management", done: true },
            { text: "Certificate management", done: true },
            { text: "Professional links", done: true },
            { text: "Authentication", done: true },
            { text: "Persistent user data", done: true },
            { text: "Progressive Web App", done: true },
            { text: "Capacitor Android integration", done: true },
            { text: "Continue improving the mobile experience", done: false },
            { text: "Expand placement workflow capabilities", done: false },
            { text: "Continue iOS development and testing", done: false },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[#231E38] bg-[#0D0A1A]"
            >
              {item.done ? (
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-[#6B6280] shrink-0" />
              )}
              <span className={`text-sm ${item.done ? "text-[#F1F5F9]" : "text-[#73737C]"}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── AUTHOR & CREDITS ────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            12 / Author &amp; Ownership
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Author
        </h2>

        <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-2">
          <div className="font-display font-bold text-xl text-[#F8FAFC]">
            Ayush Singh &amp; KRISHIKA
          </div>
          <p className="text-sm text-[#94A3B8]">
            Creator and developer of VeyloPrep.
          </p>
        </div>
      </section>

      {/* ── LICENSE ─────────────────────────────────────────── */}
      <section className="space-y-4 pt-2">
        <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
          License
        </h3>
        <p className="text-xs text-[#6B6280]">
          No open-source license has been selected for VeyloPrep yet.
        </p>
      </section>

    </div>
  );
}
