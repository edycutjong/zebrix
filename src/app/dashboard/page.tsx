'use client';

import { MOCK_REFEREES, MOCK_SIGNALS, MOCK_TRADES, MOCK_DASHBOARD_STATS, MOCK_PNL_DATA } from '@/lib/mock-data';
import { RefereeTendencyCard } from '@/components/RefereeTendencyCard';
import { TradeSignalPanel } from '@/components/TradeSignalPanel';
import { PLTracker } from '@/components/PLTracker';
import { BacktestChart } from '@/components/BacktestChart';
import { StatsGrid } from '@/components/StatsGrid';

export default function DashboardPage() {
  const stats = MOCK_DASHBOARD_STATS;
  const referees = MOCK_REFEREES;
  const signals = MOCK_SIGNALS;
  const trades = MOCK_TRADES;
  const pnlData = MOCK_PNL_DATA;

  return (
    <div className="min-h-screen relative scanlines">
      {/* Header */}
      <header className="border-b border-(--color-border) bg-(--color-bg-card)/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-(--color-cyan)/10 border border-(--color-cyan)/20 flex items-center justify-center">
                <span className="text-xl">🦓</span>
              </div>
              <div>
                <h1
                  className="text-xl font-bold tracking-wider text-(--color-text-primary)"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  ZEBRIX
                </h1>
                <p className="text-xs text-(--color-text-muted) tracking-wide">
                  REFEREE ASSIGNMENT ALPHA • POLYMARKET
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="status-dot status-dot-live" />
                <span className="text-(--color-emerald)" style={{ fontFamily: 'var(--font-mono)' }}>
                  LIVE
                </span>
              </div>
              <div
                className="text-xs text-(--color-text-muted) px-3 py-1 rounded-full border border-(--color-border)"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                DEGA Rank • Canon CLI
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10">
        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* P&L Chart + Active Signals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BacktestChart data={pnlData} />
          </div>
          <div>
            <TradeSignalPanel signals={signals} trades={trades} />
          </div>
        </div>

        {/* Referee Tendencies */}
        <div>
          <h2
            className="text-sm font-semibold text-(--color-text-secondary) tracking-widest uppercase mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Referee Tendency Database
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {referees.map((ref) => (
              <RefereeTendencyCard key={ref.id} referee={ref} />
            ))}
          </div>
        </div>

        {/* P&L Tracker */}
        <PLTracker trades={trades} stats={stats} />
      </main>

      {/* Footer */}
      <footer className="border-t border-(--color-border) py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-(--color-text-muted)">
          <span style={{ fontFamily: 'var(--font-mono)' }}>
            © 2026 Zebrix • DEGA NBA Playoffs Hackathon
          </span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>
            Built with Canon CLI • Polymarket CLOB
          </span>
        </div>
      </footer>
    </div>
  );
}
