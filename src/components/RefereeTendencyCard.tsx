import type { Referee } from '@/lib/types';
import { LEAGUE } from '@/lib/constants';

interface RefereeTendencyCardProps {
  referee: Referee;
}

export function RefereeTendencyCard({ referee }: RefereeTendencyCardProps) {
  const overBias = referee.overPct - 0.5;
  const homeBias = referee.homeWinPct - LEAGUE.HOME_WIN_PCT;

  return (
    <div className="glass-card p-4 transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3
            className="text-sm font-semibold text-(--color-text-primary)"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {referee.name}
          </h3>
          <p className="text-xs text-(--color-text-muted)">
            {referee.totalGames} playoff games
          </p>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            referee.confidence === 'high'
              ? 'bg-(--color-emerald)/10 text-(--color-emerald) border border-(--color-emerald)/20'
              : referee.confidence === 'medium'
                ? 'bg-(--color-amber)/10 text-(--color-amber) border border-(--color-amber)/20'
                : 'bg-(--color-text-muted)/10 text-(--color-text-muted) border border-(--color-text-muted)/20'
          }`}
        >
          {referee.confidence}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Over % */}
        <div>
          <p className="text-xs text-(--color-text-muted) mb-1">Over %</p>
          <p
            className={`text-lg font-bold ${
              overBias > 0.05
                ? 'text-(--color-cyan)'
                : overBias < -0.05
                  ? 'text-(--color-red)'
                  : 'text-(--color-text-secondary)'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {(referee.overPct * 100).toFixed(1)}%
          </p>
          <p className="text-[10px] text-(--color-text-muted)">
            {overBias > 0 ? '+' : ''}
            {(overBias * 100).toFixed(1)}% vs avg
          </p>
        </div>

        {/* Home Win % */}
        <div>
          <p className="text-xs text-(--color-text-muted) mb-1">Home Win %</p>
          <p
            className={`text-lg font-bold ${
              homeBias > 0.04
                ? 'text-(--color-amber)'
                : homeBias < -0.04
                  ? 'text-(--color-purple)'
                  : 'text-(--color-text-secondary)'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {(referee.homeWinPct * 100).toFixed(1)}%
          </p>
          <p className="text-[10px] text-(--color-text-muted)">
            {homeBias > 0 ? '+' : ''}
            {(homeBias * 100).toFixed(1)}% vs avg
          </p>
        </div>

        {/* Avg Fouls */}
        <div>
          <p className="text-xs text-(--color-text-muted) mb-1">Avg Fouls</p>
          <p
            className="text-lg font-bold text-(--color-text-primary)"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {referee.avgFoulsPerGame.toFixed(1)}
          </p>
          <p className="text-[10px] text-(--color-text-muted)">
            league: {LEAGUE.AVG_FOULS_PER_GAME}
          </p>
        </div>

        {/* Point Adjustment */}
        <div>
          <p className="text-xs text-(--color-text-muted) mb-1">Pt Adj</p>
          <p
            className={`text-lg font-bold ${
              referee.pointAdjustment > 0
                ? 'text-(--color-cyan)'
                : referee.pointAdjustment < 0
                  ? 'text-(--color-red)'
                  : 'text-(--color-text-secondary)'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {referee.pointAdjustment > 0 ? '+' : ''}
            {referee.pointAdjustment.toFixed(1)}
          </p>
          <p className="text-[10px] text-(--color-text-muted)">pts vs league</p>
        </div>
      </div>
    </div>
  );
}
