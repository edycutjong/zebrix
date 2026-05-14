import type { Trade, DashboardStats } from '@/lib/types';

interface PLTrackerProps {
  trades: Trade[];
  stats: DashboardStats;
}

export function PLTracker({ trades, stats }: PLTrackerProps) {
  return (
    <div className="glass-card p-4">
      <h2
        className="text-sm font-semibold text-[var(--color-text-secondary)] tracking-widest uppercase mb-4"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Trade History
      </h2>

      {/* Summary Row */}
      <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <p className="text-xs text-[var(--color-text-muted)]">Total P&L</p>
          <p
            className={`text-lg font-bold ${
              stats.totalPnl >= 0
                ? 'text-[var(--color-emerald)]'
                : 'text-[var(--color-red)]'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {stats.totalPnl >= 0 ? '+' : ''}${stats.totalPnl.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-text-muted)]">Return</p>
          <p
            className={`text-lg font-bold ${
              stats.totalPnlPct >= 0
                ? 'text-[var(--color-emerald)]'
                : 'text-[var(--color-red)]'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {stats.totalPnlPct >= 0 ? '+' : ''}
            {stats.totalPnlPct.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-text-muted)]">Win Rate</p>
          <p
            className="text-lg font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {(stats.winRate * 100).toFixed(0)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-text-muted)]">Max Drawdown</p>
          <p
            className="text-lg font-bold text-[var(--color-red)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            -${stats.maxDrawdown.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Trade Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr className="text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
              <th className="text-left py-2 pr-4">Market</th>
              <th className="text-left py-2 pr-4">Action</th>
              <th className="text-right py-2 pr-4">Entry</th>
              <th className="text-right py-2 pr-4">Exit</th>
              <th className="text-right py-2 pr-4">Shares</th>
              <th className="text-right py-2">P&L</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-hover)]/30 transition-colors"
              >
                <td className="py-2 pr-4 text-[var(--color-text-primary)]">
                  {trade.market}
                </td>
                <td className="py-2 pr-4">
                  <span
                    className={
                      trade.action.includes('OVER') || trade.action.includes('HOME')
                        ? 'text-[var(--color-cyan)]'
                        : 'text-[var(--color-purple)]'
                    }
                  >
                    {trade.action.replace('BUY_', '')}
                  </span>
                </td>
                <td className="py-2 pr-4 text-right text-[var(--color-text-secondary)]">
                  ${trade.entryPrice.toFixed(2)}
                </td>
                <td className="py-2 pr-4 text-right text-[var(--color-text-secondary)]">
                  {trade.exitPrice !== null ? `$${trade.exitPrice.toFixed(2)}` : '—'}
                </td>
                <td className="py-2 pr-4 text-right text-[var(--color-text-secondary)]">
                  {trade.shares.toFixed(2)}
                </td>
                <td
                  className={`py-2 text-right font-bold ${
                    trade.pnl !== null && trade.pnl >= 0
                      ? 'text-[var(--color-emerald)]'
                      : 'text-[var(--color-red)]'
                  }`}
                >
                  {trade.pnl !== null
                    ? `${trade.pnl >= 0 ? '+' : ''}$${trade.pnl.toFixed(2)}`
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
