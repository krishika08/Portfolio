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
  Globe,
  Wallet,
  Users,
  Scale,
  TrendingUp
} from "lucide-react";

export function SplitSyncCaseStudy() {
  return (
    <div className="space-y-16 text-[#CBD5E1] font-sans">
      
      {/* ── HERO BANNER ────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden border border-[#231E38] bg-[#05040A] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <img
          src="/showcase/splitsync/splitsync-hero.png"
          alt="SplitSync — Split expenses. Stay friends."
          className="w-full h-auto object-cover rounded-2xl"
        />
      </div>

      {/* ── HEADER & QUICK LINKS ────────────────────────────── */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#F8FAFC] tracking-tight">
          SplitSync
        </h1>
        <p className="font-display text-xl sm:text-2xl text-[var(--accent)] font-semibold">
          Split expenses. Stay friends.
        </p>
        <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
          Smart expense splitting with real-time sync. Track shared expenses, balances and settlements effortlessly without awkward math.
        </p>

        {/* Quick Nav Pill Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <a
            href="https://splitsync-app.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-bold text-white bg-[linear-gradient(135deg,#2563EB_0%,#0D9488_100%)] shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:brightness-110 transition-all"
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
            Managing group finances often leads to confusion, messy spreadsheets, and awkward settlement reminders.
          </p>
          <p>
            Whether splitting vacation expenses in Goa, dividing monthly apartment rent with flatmates, or splitting dinner tabs, calculating who owes whom across multiple payers creates friction.
          </p>
          <p className="text-[#F8FAFC] font-semibold border-l-2 border-[#2563EB] pl-4 py-1 bg-[rgba(37,99,235,0.05)] rounded-r-lg">
            SplitSync replaces messy calculations with an instant, reactive real-time database ledger.
          </p>
          <p>
            Built with Next.js, Supabase Real-time channels, and PostgreSQL, SplitSync updates balances automatically, simplifies multi-party debts into minimal payments, and maintains complete transaction transparency.
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
            High-fidelity user interface screens captured directly from the live SplitSync platform.
          </p>
        </div>

        {/* 2x2 Grid for compact, crystal-clear mobile showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. Landing & Product Overview */}
          <div className="flex flex-col justify-between p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] hover:border-[#2563EB] transition-all duration-300 gap-5">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                Live Landing Experience
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Clean, modern presentation introducing instant group splitting, live settlement badges, and frictionless onboarding.
              </p>
            </div>
            <div className="flex justify-center items-center py-2">
              <div className="w-full rounded-xl overflow-hidden border border-[#231E38] bg-[#05040A] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <img
                  src="/showcase/splitsync/splitsync-hero.png"
                  alt="SplitSync Landing Page"
                  className="w-full h-auto object-contain rounded-xl block"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* 2. Authentication Screen */}
          <div className="flex flex-col justify-between p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] hover:border-[#2563EB] transition-all duration-300 gap-5">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
                Secure Authentication
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Supabase Auth integration ensuring encrypted session persistence, password protection, and isolated user ledger data.
              </p>
            </div>
            <div className="flex justify-center items-center py-2">
              <div className="w-full rounded-xl overflow-hidden border border-[#231E38] bg-[#05040A] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <img
                  src="/showcase/splitsync/splitsync-auth.png"
                  alt="SplitSync Authentication"
                  className="w-full h-auto object-contain rounded-xl block"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* 3. Real-time Balance Dashboard */}
          <div className="flex flex-col justify-between p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] hover:border-[#2563EB] transition-all duration-300 gap-5">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                User Dashboard &amp; Net Balances
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Real-time dashboard displaying net balance (₹1,992.03), active amounts owed to you (₹2,449.83), and personal debts (₹457.80).
              </p>
            </div>
            <div className="flex justify-center items-center py-2">
              <div className="w-full rounded-xl overflow-hidden border border-[#231E38] bg-[#05040A] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <img
                  src="/showcase/splitsync/splitsync-dashboard.png"
                  alt="SplitSync User Dashboard"
                  className="w-full h-auto object-contain rounded-xl block"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* 4. Analytics & Group Trackers */}
          <div className="flex flex-col justify-between p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] hover:border-[#2563EB] transition-all duration-300 gap-5">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
                Analytics &amp; Feature Trackers
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Dedicated category visualizers, personal budget tracking, direct peer expenses, and organized group directories.
              </p>
            </div>
            <div className="flex justify-center items-center py-2">
              <div className="w-full rounded-xl overflow-hidden border border-[#231E38] bg-[#05040A] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <img
                  src="/showcase/splitsync/splitsync-analytics.png"
                  alt="SplitSync Analytics"
                  className="w-full h-auto object-contain rounded-xl block"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2563EB]" />
                Group &amp; Trip Hubs
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Create dedicated hubs for trips, apartments, and dinners. Invite members, log shared receipts, and keep everyone synced.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#1E1830] font-mono text-xs text-[#2563EB]">
              Multi-Member Shared Channels
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-[#F8FAFC] mb-2 flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#10B981]" />
                Smart Debt Minimization
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Automated pair-wise debt resolution compiles multi-party split networks into the minimum possible number of money transfers.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#1E1830] font-mono text-xs text-[#10B981]">
              Optimized Settlement Matrix
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
                { area: "Create Groups", cap: "Organise trips, flat bills, or dinner parties with dedicated member lists" },
                { area: "Add Expenses", cap: "Log bills, divide them equally or custom split by percentage and parts" },
                { area: "See Balances", cap: "Instantly track who owes who and see overall balances in real time" },
                { area: "Settle Up", cap: "Log cash payments or bank transfers to restore balances to zero" },
                { area: "Analytics & Reports", cap: "Visual breakdown of your spending by category, trends, and budget metrics" },
                { area: "Personal Tracker", cap: "Track daily individual spending, set spending budgets, and receive smart insights" },
                { area: "Authentication", cap: "Secure Supabase session-based logins, user profiles, and encrypted records" },
                { area: "Real-Time Sync", cap: "Live Supabase PostgreSQL websocket channel updates pushed to all active clients" },
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
          Demo &amp; Flow
        </h2>
        <p className="text-[#94A3B8] text-sm sm:text-base">
          A short walkthrough of the core SplitSync experience:
        </p>

        <div className="p-6 rounded-2xl border border-[rgba(37,99,235,0.3)] bg-[rgba(37,99,235,0.04)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-bold text-base sm:text-lg text-[#F8FAFC] tracking-wide text-center md:text-left">
            Create Group <span className="text-[#2563EB]">→</span> Add Expense <span className="text-[#2563EB]">→</span> Real-Time Sync <span className="text-[#2563EB]">→</span> Settle Balances <span className="text-[#2563EB]">→</span> View Analytics
          </div>
          <a
            href="https://splitsync-app.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            Launch Live App
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── SYSTEM ARCHITECTURE ─────────────────────────────── */}
      <section id="system-architecture" className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            05 / Technical Stack &amp; Architecture
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          System Architecture
        </h2>

        <div className="bg-[#0D0A1A] border border-[#231E38] rounded-2xl p-6 sm:p-8 space-y-4 leading-relaxed text-[#A3A3A8]">
          <p className="text-base text-[#F1F5F9]">
            SplitSync is built with a reactive <strong className="text-[#2563EB]">Next.js + React</strong> client architecture backed by <strong className="text-[#10B981]">Supabase</strong> real-time data persistence.
          </p>
          <p>
            When an expense is logged or settled, PostgreSQL database triggers emit WebSocket channel updates to all group members simultaneously. The client updates optimistic ledger UI state immediately with zero delay.
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
                { layer: "Frontend", tech: "Next.js & React 19" },
                { layer: "Language", tech: "TypeScript" },
                { layer: "Backend / Database", tech: "Supabase (PostgreSQL)" },
                { layer: "Real-Time Engine", tech: "Supabase Realtime WebSockets" },
                { layer: "Authentication", tech: "Supabase Auth (RLS Policies)" },
                { layer: "Styling", tech: "Tailwind CSS" },
                { layer: "Icons", tech: "Lucide React" },
                { layer: "Deployment", tech: "Vercel" },
                { layer: "Package Manager", tech: "npm" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#151226]/50 transition-colors">
                  <td className="p-4 font-semibold text-[#F1F5F9]">{row.layer}</td>
                  <td className="p-4 font-mono text-xs text-[#2563EB]">{row.tech}</td>
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
            <div className="flex items-center gap-2 text-[#2563EB] font-mono text-xs font-bold uppercase">
              <Database className="w-4 h-4" />
              <span>Real-Time Sync Engine</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Integrated real-time database listeners to automatically push balance and payment settlement changes to all members of a group simultaneously without manual polling queries.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-3">
            <div className="flex items-center gap-2 text-[#10B981] font-mono text-xs font-bold uppercase">
              <Scale className="w-4 h-4" />
              <span>Debt Minimization Algorithm</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Designed frontend computation logic that resolves multi-party split networks into simplified pairwise settlements, eliminating circular transactions.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-3">
            <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Row-Level Security (RLS)</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Implemented strict PostgreSQL Row-Level Security policies ensuring users can only read and mutate expenses belonging to groups they are authenticated members of.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-3">
            <div className="flex items-center gap-2 text-[#F59E0B] font-mono text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Optimistic UI Updates</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Transactions, settlements, and category tagging reflect on the user interface instantly with optimistic rendering while background Supabase calls confirm ledger consistency.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── GETTING STARTED & LOCAL RUN ────────────────────── */}
      <section id="getting-started" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            07 / Local Execution
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
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" /> Node.js 18+
            </li>
            <li className="flex items-center gap-2 bg-[#0D0A1A] p-3 rounded-lg border border-[#231E38]">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" /> npm or yarn
            </li>
            <li className="flex items-center gap-2 bg-[#0D0A1A] p-3 rounded-lg border border-[#231E38]">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" /> Supabase project (URL &amp; Anon Key)
            </li>
            <li className="flex items-center gap-2 bg-[#0D0A1A] p-3 rounded-lg border border-[#231E38]">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" /> Modern web browser
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
{`git clone <YOUR-SPLITSYNC-REPO-URL>
cd SplitSync
npm install`}
              </pre>
            </div>

            <div className="rounded-xl border border-[#231E38] bg-[#08070F] overflow-hidden">
              <div className="px-4 py-2 bg-[#121020] border-b border-[#231E38] flex items-center justify-between">
                <span className="font-mono text-xs text-[#94A3B8]">2. Configure Environment (.env.local)</span>
                <KeyRound className="w-3.5 h-3.5 text-[#6B6280]" />
              </div>
              <pre className="p-4 font-mono text-xs text-[#CBD5E1] overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000`}
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
npm run build`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#231E38] to-transparent" />

      {/* ── ROADMAP ─────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            08 / Trajectory
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Roadmap &amp; Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { text: "Real-time balance syncing via Supabase", done: true },
            { text: "Multi-member group expense management", done: true },
            { text: "Equal and custom split calculations", done: true },
            { text: "Instant 1-click settlement recording", done: true },
            { text: "Spending analytics & category charts", done: true },
            { text: "Personal expense & budget tracker", done: true },
            { text: "Secure auth & Row-Level Security (RLS)", done: true },
            { text: "UPI & Bank QR code payment deep links", done: false },
            { text: "Receipt OCR itemized auto-scan", done: false },
            { text: "Native iOS / Android mobile build", done: false },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[#231E38] bg-[#0D0A1A]"
            >
              {item.done ? (
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
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
            09 / Author &amp; Ownership
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
          Author
        </h2>

        <div className="p-6 rounded-2xl border border-[#231E38] bg-[#0D0A1A] space-y-2">
          <div className="font-display font-bold text-xl text-[#F8FAFC]">
            KRISHIKA
          </div>
          <p className="text-sm text-[#94A3B8]">
            Creator and developer of SplitSync.
          </p>
        </div>
      </section>

      {/* ── LICENSE ─────────────────────────────────────────── */}
      <section className="space-y-4 pt-2">
        <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
          License
        </h3>
        <p className="text-xs text-[#6B6280]">
          Private commercial project / portfolio showcase.
        </p>
      </section>

    </div>
  );
}
