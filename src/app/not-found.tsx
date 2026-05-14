'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen relative scanlines bg-(--color-bg-base) text-(--color-text-primary) font-body flex items-center justify-center p-4">
      {/* Background Grid & Gradient */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none -z-10" />
      <div className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-(--color-red)/5 to-transparent pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-lg w-full p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-(--color-red)" />
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-(--color-red)/10 border border-(--color-red)/20 flex items-center justify-center mb-6 glow-red">
            <ShieldAlert className="w-8 h-8 text-(--color-red)" />
          </div>
          
          <h1 className="font-display text-5xl font-bold mb-2">404</h1>
          <h2 className="font-mono text-xl text-(--color-red) mb-4">MARKET_NOT_FOUND</h2>
          
          <p className="text-(--color-text-secondary) mb-8">
            The prediction market or page you are looking for has been resolved or does not exist.
          </p>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="px-6 py-3 font-mono text-sm bg-(--color-bg-elevated) border border-(--color-border-bright) hover:border-(--color-cyan)/50 rounded flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              RETURN
            </Link>
            <Link 
              href="/dashboard"
              className="px-6 py-3 font-mono text-sm bg-(--color-cyan)/10 text-(--color-cyan) border border-(--color-cyan)/30 hover:bg-(--color-cyan)/20 rounded flex items-center gap-2 transition-colors glow-cyan"
            >
              <Activity className="w-4 h-4" />
              DASHBOARD
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
