import React from 'react';
import { render, screen } from '@testing-library/react';
import { BacktestChart, formatXAxis, formatYAxis, ChartTooltip } from '../BacktestChart';
import type { PnlDataPoint } from '@/lib/types';

// Mock ResizeObserver which is used by Recharts
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mockData: PnlDataPoint[] = [
  { date: '2026-05-01', dailyPnl: 10, cumulativePnl: 10 },
  { date: '2026-05-02', dailyPnl: -5, cumulativePnl: 5 },
  { date: '2026-05-03', dailyPnl: 15, cumulativePnl: 20 },
];

describe('BacktestChart', () => {
  it('renders the chart container and title', () => {
    render(<BacktestChart data={mockData} />);
    expect(screen.getByText('P&L Performance')).toBeInTheDocument();
  });

  it('renders without crashing even with empty data', () => {
    render(<BacktestChart data={[]} />);
    expect(screen.getByText('P&L Performance')).toBeInTheDocument();
  });
});



describe('ChartTooltip', () => {
  it('renders correctly when active', () => {
    const payload = [
      { value: 10.5, dataKey: 'cumulativePnl' },
      { value: -5.2, dataKey: 'dailyPnl' },
    ];
    render(<ChartTooltip active={true} payload={payload} label="2026-05-01" />);
    
    expect(screen.getByText('2026-05-01')).toBeInTheDocument();
    expect(screen.getByText('Cumulative: +$10.50')).toBeInTheDocument();
    expect(screen.getByText('Daily: -$5.20')).toBeInTheDocument();
  });

  it('returns null when not active', () => {
    const { container } = render(<ChartTooltip active={false} />);
    expect(container.firstChild).toBeNull();
  });
});
describe('BacktestChart formatters', () => {
  it('formatXAxis slices the date string', () => {
    expect(formatXAxis('2026-05-01')).toBe('05-01');
  });

  it('formatYAxis adds dollar sign', () => {
    expect(formatYAxis(100)).toBe('$100');
    expect(formatYAxis(-50)).toBe('$-50');
  });
});
