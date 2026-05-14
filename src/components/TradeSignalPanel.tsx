import type { TradeSignal, Trade } from '@/lib/types';

interface TradeSignalPanelProps {
  signals: TradeSignal[];
  trades: Trade[];
}

export function TradeSignalPanel({ signals, trades }: TradeSignalPanelProps) {
  return (
    <div className="glass-card p-4 h-full">
      <h2
        className="text-sm font-semibold text-(--color-text-secondary) tracking-widest uppercase mb-4"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Trade Signals
      </h2>

      <div className="space-y-3">
        {signals.length === 0 ? (
          <p className="text-sm text-(--color-text-muted) text-center py-8">
            No active signals detected.
          </p>
        ) : (
          signals.map((signal) => {
            const trade = trades.find((t) => t.signalId === signal.id);

          return (
            <div
              key={signal.id}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                signal.status === 'pending'
                  ? 'border-(--color-amber)/30 bg-(--color-amber)/5'
                  : signal.status === 'executed' && trade && (trade.pnl ?? 0) > 0
                    ? 'border-(--color-emerald)/30 bg-(--color-emerald)/5'
                    : signal.status === 'executed' && trade && (trade.pnl ?? 0) < 0
                      ? 'border-(--color-red)/30 bg-(--color-red)/5'
                      : 'border-(--color-border) bg-(--color-bg-card)'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`status-dot ${
                      signal.status === 'pending'
                        ? 'status-dot-pending'
                        : signal.status === 'executed'
                          ? 'status-dot-live'
                          : 'status-dot-inactive'
                    }`}
                  />
                  <span
                    className="text-xs text-(--color-text-muted) uppercase"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {signal.status}
                  </span>
                </div>
                <span
                  className="text-xs text-(--color-text-muted)"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {signal.gameDate}
                </span>
              </div>

              {/* Game Info */}
              <div className="mb-2">
                <p className="text-sm font-semibold text-(--color-text-primary)">
                  {signal.homeTeam} vs {signal.awayTeam}
                </p>
                <p className="text-xs text-(--color-text-muted)">
                  Ref: {signal.refereeName} • {signal.market}
                </p>
              </div>

              {/* Action + Edge */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    signal.action.includes('OVER') || signal.action.includes('HOME')
                      ? 'bg-(--color-cyan)/10 text-(--color-cyan)'
                      : 'bg-(--color-purple)/10 text-(--color-purple)'
                  }`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {signal.action.replace('BUY_', '')}
                </span>
                <div className="text-right">
                  <p
                    className="text-sm font-bold text-(--color-cyan)"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    +{(signal.edgePct * 100).toFixed(1)}% edge
                  </p>
                  {trade && trade.pnl !== null && (
                    <p
                      className={`text-xs font-medium ${
                        trade.pnl > 0
                          ? 'text-(--color-emerald)'
                          : 'text-(--color-red)'
                      }`}
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {`${trade.pnl >= 0 ? '+' : '-'}$${Math.abs(trade.pnl).toFixed(2)}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
}
