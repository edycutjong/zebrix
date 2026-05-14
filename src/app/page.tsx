'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Target, Zap, ArrowRight, BarChart2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative scanlines bg-(--color-bg-base) text-(--color-text-primary) font-body">
      {/* Background Grid & Gradient */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none -z-10" />
      <div className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-(--color-cyan)/5 to-transparent pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="border-b border-(--color-border) bg-(--color-bg-card)/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-(--color-cyan)/30 bg-(--color-cyan)/10 flex items-center justify-center p-1.5">
              <Image src="/icon.svg" alt="Zebrix Icon" width={20} height={20} className="w-full h-full object-contain" />
            </div>
            <span className="font-bold tracking-widest text-lg font-display">ZEBRIX</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/edycutjong/Zebrix" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-(--color-text-muted) hover:text-(--color-cyan) transition-colors">
              GitHub
            </a>
            <Link href="/dashboard" className="px-4 py-2 text-sm font-mono font-medium bg-(--color-cyan)/10 text-(--color-cyan) border border-(--color-cyan)/30 rounded hover:bg-(--color-cyan)/20 transition-colors flex items-center gap-2">
              TERMINAL <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="w-full flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Content */}
          <div className="flex flex-col items-start w-full lg:w-1/2 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border border-(--color-cyan)/30 rounded-full bg-(--color-cyan)/10 text-(--color-cyan) mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-(--color-cyan) animate-pulse" />
              LIVE ON POLYMARKET CLOB
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-6"
            >
              Automated NBA Referee <br />
              <span className="text-(--color-emerald)">Alpha Trader</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-(--color-text-secondary) mb-10 max-w-2xl leading-relaxed"
            >
              Zebrix exploits historically proven officiating biases—such as referee-specific Over/Under tendencies and home team win rates—that prediction market traders systematically ignore.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 font-mono"
            >
              <Link href="/dashboard" className="px-8 py-4 bg-(--color-cyan) text-(--color-bg-base) font-bold rounded hover:bg-(--color-cyan)/90 transition-colors flex items-center gap-2 group">
                <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
                LAUNCH DASHBOARD
              </Link>
              <a href="https://github.com/edycutjong/Zebrix#readme" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-(--color-bg-card) text-(--color-text-primary) border border-(--color-border) rounded hover:border-(--color-cyan)/50 transition-colors flex items-center gap-2">
                <BarChart2 className="w-5 h-5" />
                VIEW BACKTEST
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex items-center gap-6 text-sm font-mono text-(--color-text-muted) border-t border-(--color-border) pt-6 max-w-lg w-full"
            >
              <span>SPONSORED BY:</span>
              <div className="flex items-center gap-6">
                <span className="font-bold text-(--color-text-primary) tracking-widest uppercase">DEGA</span>
                <span className="font-bold text-(--color-text-primary) tracking-widest uppercase">Polymarket</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: 3D Floating Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -15, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
            className="w-full lg:w-1/2 relative h-[400px] hidden lg:block"
            style={{ perspective: 2000 }}
          >
            {/* Main Alert Card */}
            <motion.div 
              animate={{ y: [-10, 10, -10], rotateZ: [-1, 1, -1] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-2xl border border-(--color-cyan)/40 bg-(--color-bg-card)/80 backdrop-blur-xl p-6 shadow-[0_0_60px_rgba(6,182,212,0.15)] z-20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded border border-(--color-cyan)/30 bg-linear-to-br from-(--color-cyan)/20 to-(--color-emerald)/20 flex items-center justify-center shadow-inner">
                  <Target className="w-6 h-6 text-(--color-cyan)" />
                </div>
                <div>
                  <div className="font-display font-bold text-(--color-text-primary)">Alpha Signal Detected</div>
                  <div className="text-xs text-(--color-cyan) flex items-center gap-1 font-mono mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--color-cyan) animate-pulse" />
                    EXECUTING TRADE
                  </div>
                </div>
              </div>

              <div className="space-y-3 font-mono">
                <div className="flex justify-between items-center text-sm border-b border-(--color-border)/50 pb-2">
                  <span className="text-(--color-text-secondary)">Matchup</span>
                  <span className="text-(--color-text-primary)">LAL vs GSW</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-(--color-border)/50 pb-2">
                  <span className="text-(--color-text-secondary)">Crew Chief</span>
                  <span className="text-(--color-emerald)">S. Foster</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-(--color-text-secondary)">Action</span>
                  <span className="text-(--color-cyan) font-bold">BUY OVER 234.5</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Member Card 1 */}
            <motion.div 
              animate={{ y: [0, 15, 0], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
              className="absolute top-[10%] left-[5%] w-48 rounded-xl border border-(--color-border) bg-(--color-bg-base)/80 backdrop-blur-lg p-4 shadow-xl z-10"
            >
              <div className="text-xs text-(--color-text-muted) mb-1 font-mono">HISTORICAL BIAS</div>
              <div className="text-lg font-mono font-bold text-(--color-emerald)">+14.2% OVER</div>
              <div className="text-[10px] text-(--color-cyan) mt-1 font-mono">Last 50 games</div>
            </motion.div>

            {/* Floating Member Card 2 */}
            <motion.div 
              animate={{ y: [0, -15, 0], x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-[10%] right-[5%] w-52 rounded-xl border border-(--color-border) bg-(--color-bg-base)/80 backdrop-blur-lg p-4 shadow-xl z-30"
            >
              <div className="text-xs text-(--color-text-muted) mb-2 font-mono">EXPECTED VALUE</div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-display font-bold text-(--color-text-primary)">+4.2%</div>
                <div className="text-xs text-(--color-cyan) px-2 py-1 bg-(--color-cyan)/10 rounded border border-(--color-cyan)/20 font-bold">
                  EDGE
                </div>
              </div>
            </motion.div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-(--color-cyan)/10 blur-[80px] rounded-full z-0 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-(--color-emerald)/10 blur-[60px] rounded-full z-0 pointer-events-none" />
          </motion.div>
        </div>

        {/* Features / Alpha Generators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-32"
        >
          <div className="p-6 border border-(--color-border) bg-(--color-bg-card)/50 rounded-lg group hover:border-(--color-cyan)/50 transition-colors">
            <div className="w-12 h-12 bg-(--color-cyan)/10 border border-(--color-cyan)/20 rounded flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-(--color-cyan)" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Referee Bias Profiling</h3>
            <p className="text-(--color-text-secondary) text-sm leading-relaxed">
              Scrapes daily NBA official assignments and cross-references them against our 10-year database of referee tendencies (foul rates, home team win %, over/under bias).
            </p>
          </div>

          <div className="p-6 border border-(--color-border) bg-(--color-bg-card)/50 rounded-lg group hover:border-(--color-amber)/50 transition-colors">
            <div className="w-12 h-12 bg-(--color-amber)/10 border border-(--color-amber)/20 rounded flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-(--color-amber)" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Sub-Second Execution</h3>
            <p className="text-(--color-text-secondary) text-sm leading-relaxed">
              Powered by Canon CLI. The moment assignments are released (usually 9:00 AM EST), Zebrix calculates the adjustment factor and places Polymarket bets before the CLOB adjusts.
            </p>
          </div>

          <div className="p-6 border border-(--color-border) bg-(--color-bg-card)/50 rounded-lg group hover:border-(--color-emerald)/50 transition-colors">
            <div className="w-12 h-12 bg-(--color-emerald)/10 border border-(--color-emerald)/20 rounded flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6 text-(--color-emerald)" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Mathematical Edge</h3>
            <p className="text-(--color-text-secondary) text-sm leading-relaxed">
              Prediction markets systematically ignore officiating variables. Our backtests show a consistent 4.2% ROI over baseline odds when adjusting for outlier referee crews.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-(--color-border) py-8 mt-12 bg-(--color-bg-card)/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-(--color-text-muted)">
          <div>© 2026 Zebrix. Built for the DEGA NBA Playoffs Hackathon.</div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/edycutjong/Zebrix" className="hover:text-(--color-cyan) transition-colors">GitHub</a>
            <a href="https://polymarket.com" className="hover:text-(--color-cyan) transition-colors">Polymarket</a>
            <a href="https://dega.org" className="hover:text-(--color-cyan) transition-colors">DEGA Canon</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
