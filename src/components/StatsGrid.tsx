import type { DashboardStats } from '@/lib/types';

interface StatsGridProps {
  stats: DashboardStats;
}

const statCards = [
  {
    key: 'totalPnl',
    label: 'Total P&L',
    format: (v: number) => `${v >= 0 ? '+' : '-'}$${Math.abs(v).toFixed(2)}`,
    color: (v: number) => (v >= 0 ? 'var(--color-emerald)' : 'var(--color-red)'),
    glow: (v: number) => (v >= 0 ? 'glow-emerald' : 'glow-red'),
  },
  {
    key: 'totalPnlPct',
    label: 'Return %',
    format: (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`,
    color: (v: number) => (v >= 0 ? 'var(--color-emerald)' : 'var(--color-red)'),
    glow: () => '',
  },
  {
    key: 'totalTrades',
    label: 'Total Trades',
    format: (v: number) => v.toString(),
    color: () => 'var(--color-text-primary)',
    glow: () => '',
  },
  {
    key: 'winRate',
    label: 'Win Rate',
    format: (v: number) => `${(v * 100).toFixed(0)}%`,
    color: (v: number) => (v >= 0.6 ? 'var(--color-cyan)' : 'var(--color-amber)'),
    glow: () => '',
  },
  {
    key: 'activeSignals',
    label: 'Active Signals',
    format: (v: number) => v.toString(),
    color: (v: number) => (v > 0 ? 'var(--color-amber)' : 'var(--color-text-muted)'),
    glow: () => '',
  },
  {
    key: 'avgEdge',
    label: 'Avg Edge',
    format: (v: number) => `${(v * 100).toFixed(1)}%`,
    color: () => 'var(--color-cyan)',
    glow: () => '',
  },
  {
    key: 'sharpeRatio',
    label: 'Sharpe Ratio',
    format: (v: number) => v.toFixed(2),
    color: (v: number) => (v >= 1 ? 'var(--color-emerald)' : 'var(--color-amber)'),
    glow: () => '',
  },
  {
    key: 'maxDrawdown',
    label: 'Max Drawdown',
    format: (v: number) => `-$${Math.abs(v).toFixed(2)}`,
    color: () => 'var(--color-red)',
    glow: () => '',
  },
] as const;

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {statCards.map((card) => {
        const value = stats[card.key as keyof DashboardStats] as number;
        return (
          <div
            key={card.key}
            className={`glass-card p-3 ${card.glow(value)}`}
          >
            <p className="text-[10px] text-(--color-text-muted) uppercase tracking-wider mb-1">
              {card.label}
            </p>
            <p
              className="text-lg font-bold"
              style={{
                fontFamily: 'var(--font-mono)',
                color: card.color(value),
              }}
            >
              {card.format(value)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
