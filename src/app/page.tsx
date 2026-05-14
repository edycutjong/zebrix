'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Target, Zap, ArrowRight, BarChart2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative scanlines bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-body">
      {/* Background Grid & Gradient */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none -z-10" />
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[var(--color-cyan)]/5 to-transparent pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg-card)]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 flex items-center justify-center">
              <span className="text-sm">🦓</span>
            </div>
            <span className="font-bold tracking-widest text-lg font-display">ZEBRIX</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/edycutjong/Zebrix" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-cyan)] transition-colors">
              GitHub
            </a>
            <Link href="/dashboard" className="px-4 py-2 text-sm font-mono font-medium bg-[var(--color-cyan)]/10 text-[var(--color-cyan)] border border-[var(--color-cyan)]/30 rounded hover:bg-[var(--color-cyan)]/20 transition-colors flex items-center gap-2">
              TERMINAL <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border border-[var(--color-cyan)]/30 rounded-full bg-[var(--color-cyan)]/10 text-[var(--color-cyan)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-pulse" />
            LIVE ON POLYMARKET CLOB
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-6"
          >
            Automated NBA Referee <br />
            <span className="text-[var(--color-emerald)]">Alpha Trader</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl leading-relaxed"
          >
            Zebrix exploits historically proven officiating biases—such as referee-specific Over/Under tendencies and home team win rates—that prediction market traders systematically ignore.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 font-mono"
          >
            <Link href="/dashboard" className="px-8 py-4 bg-[var(--color-cyan)] text-[var(--color-bg-base)] font-bold rounded hover:bg-[var(--color-cyan)]/90 transition-colors flex items-center gap-2 group">
              <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
              LAUNCH DASHBOARD
            </Link>
            <a href="https://github.com/edycutjong/Zebrix#readme" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded hover:border-[var(--color-cyan)]/50 transition-colors flex items-center gap-2">
              <BarChart2 className="w-5 h-5" />
              VIEW BACKTEST
            </a>
          </motion.div>
        </div>

        {/* Features / Alpha Generators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-32"
        >
          <div className="p-6 border border-[var(--color-border)] bg-[var(--color-bg-card)]/50 rounded-lg group hover:border-[var(--color-cyan)]/50 transition-colors">
            <div className="w-12 h-12 bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/20 rounded flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-[var(--color-cyan)]" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Referee Bias Profiling</h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Scrapes daily NBA official assignments and cross-references them against our 10-year database of referee tendencies (foul rates, home team win %, over/under bias).
            </p>
          </div>

          <div className="p-6 border border-[var(--color-border)] bg-[var(--color-bg-card)]/50 rounded-lg group hover:border-[var(--color-amber)]/50 transition-colors">
            <div className="w-12 h-12 bg-[var(--color-amber)]/10 border border-[var(--color-amber)]/20 rounded flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-[var(--color-amber)]" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Sub-Second Execution</h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Powered by Canon CLI. The moment assignments are released (usually 9:00 AM EST), Zebrix calculates the adjustment factor and places Polymarket bets before the CLOB adjusts.
            </p>
          </div>

          <div className="p-6 border border-[var(--color-border)] bg-[var(--color-bg-card)]/50 rounded-lg group hover:border-[var(--color-emerald)]/50 transition-colors">
            <div className="w-12 h-12 bg-[var(--color-emerald)]/10 border border-[var(--color-emerald)]/20 rounded flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6 text-[var(--color-emerald)]" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Mathematical Edge</h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Prediction markets systematically ignore officiating variables. Our backtests show a consistent 4.2% ROI over baseline odds when adjusting for outlier referee crews.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 mt-12 bg-[var(--color-bg-card)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--color-text-muted)]">
          <div>© 2026 Zebrix. Built for the DEGA NBA Playoffs Hackathon.</div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/edycutjong/Zebrix" className="hover:text-[var(--color-cyan)] transition-colors">GitHub</a>
            <a href="https://polymarket.com" className="hover:text-[var(--color-cyan)] transition-colors">Polymarket</a>
            <a href="https://dega.org" className="hover:text-[var(--color-cyan)] transition-colors">DEGA Canon</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
