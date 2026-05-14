'use client';

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
  Bar,
} from 'recharts';
import type { PnlDataPoint } from '@/lib/types';
import { COLORS } from '@/lib/constants';

interface BacktestChartProps {
  data: PnlDataPoint[];
}

// Custom tooltip — declared outside render per project rules
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;

  return (
    <div
      className="glass-card p-3 text-xs"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <p className="text-(--color-text-muted) mb-1">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className={
            entry.value >= 0
              ? 'text-(--color-emerald)'
              : 'text-(--color-red)'
          }
        >
          {entry.dataKey === 'cumulativePnl' ? 'Cumulative' : 'Daily'}:{' '}
          {entry.value >= 0 ? '+' : ''}${entry.value.toFixed(2)}
        </p>
      ))}
    </div>
  );
}

export function BacktestChart({ data }: BacktestChartProps) {
  return (
    <div className="glass-card p-4">
      <h2
        className="text-sm font-semibold text-(--color-text-secondary) tracking-widest uppercase mb-4"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        P&L Performance
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={COLORS.grid}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: COLORS.textSecondary, fontSize: 10 }}
            tickFormatter={(val: string) => val.slice(5)}
            axisLine={{ stroke: COLORS.grid }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: COLORS.textSecondary, fontSize: 10 }}
            tickFormatter={(val: number) => `$${val}`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<ChartTooltip />} />
          <ReferenceLine y={0} stroke={COLORS.textSecondary} strokeDasharray="3 3" />

          {/* Daily P&L bars */}
          <Bar
            dataKey="dailyPnl"
            fill={COLORS.cyan}
            opacity={0.3}
            radius={[2, 2, 0, 0]}
          />

          {/* Cumulative P&L area */}
          <defs>
            <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.2} />
              <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="cumulativePnl"
            fill="url(#pnlGradient)"
            stroke="none"
          />
          <Line
            type="monotone"
            dataKey="cumulativePnl"
            stroke={COLORS.emerald}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: COLORS.emerald,
              stroke: COLORS.slateCard,
              strokeWidth: 2,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
