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
          <div className="flex flex-col items-center justify-center h-48 relative overflow-hidden rounded-xl border border-(--color-border) bg-(--color-bg-base)/50">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-(--color-cyan)/10 blur-[40px] rounded-full z-0 pointer-events-none" />
            
            <div className="w-10 h-10 mb-3 rounded-lg bg-(--color-cyan)/10 border border-(--color-cyan)/20 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <svg className="w-5 h-5 text-(--color-cyan)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="font-mono font-bold text-xs text-(--color-text-primary) tracking-widest uppercase relative z-10">AWAITING SIGNALS</p>
            <p className="text-[10px] text-(--color-text-muted) mt-1 max-w-[200px] text-center relative z-10 font-mono">
              Monitoring official assignments...
            </p>
          </div>
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
