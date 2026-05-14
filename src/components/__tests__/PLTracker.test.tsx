import React from 'react';
import { render, screen } from '@testing-library/react';
import { PLTracker } from '../PLTracker';
import type { Trade, DashboardStats } from '@/lib/types';

const mockTrades: Trade[] = [
  {
    id: 't1',
    signalId: 's1',
    market: 'NBA: LAL vs GSW - Over 234.5',
    action: 'BUY_OVER',
    entryPrice: 0.52,
    exitPrice: 0.85,
    shares: 100,
    pnl: 33.00,
    status: 'closed',
    polymarketOrderId: 'order-1',
    entryAt: new Date().toISOString(),
    exitAt: new Date().toISOString(),
  },
  {
    id: 't2',
    signalId: 's2',
    market: 'NBA: BOS vs MIL - Home Win',
    action: 'BUY_HOME',
    entryPrice: 0.65,
    exitPrice: null,
    shares: 200,
    pnl: null,
    status: 'open',
    polymarketOrderId: 'order-2',
    entryAt: new Date().toISOString(),
    exitAt: null,
  }
];

const mockStats: DashboardStats = {
  totalPnl: 33.00,
  totalPnlPct: 6.3,
  totalTrades: 2,
  winRate: 0.5,
  activeSignals: 1,
  avgEdge: 0.05,
  sharpeRatio: 1.2,
  maxDrawdown: 0,
};

describe('PLTracker', () => {
  it('renders summary statistics correctly', () => {
    render(<PLTracker trades={mockTrades} stats={mockStats} />);
    
    expect(screen.getByText('Total P&L')).toBeInTheDocument();
    expect(screen.getAllByText('+$33.00').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('+6.30%')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders trade table with correct data', () => {
    render(<PLTracker trades={mockTrades} stats={mockStats} />);
    
    expect(screen.getByText('NBA: LAL vs GSW - Over 234.5')).toBeInTheDocument();
    expect(screen.getByText('OVER')).toBeInTheDocument();
    expect(screen.getByText('$0.52')).toBeInTheDocument();
    expect(screen.getAllByText('+$33.00').length).toBeGreaterThanOrEqual(1);
    
    expect(screen.getByText('NBA: BOS vs MIL - Home Win')).toBeInTheDocument();
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('$0.65')).toBeInTheDocument();
    // One '—' for exit price and one for pnl in the second row
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });

  it('renders negative values and different actions correctly', () => {
    const negativeStats: DashboardStats = {
      ...mockStats,
      totalPnl: -150.25,
      totalPnlPct: -15.02,
    };
    const negativeTrades: Trade[] = [
      {
        ...mockTrades[0],
        id: 't3',
        action: 'BUY_UNDER',
        pnl: -45.50,
      }
    ];

    render(<PLTracker trades={negativeTrades} stats={negativeStats} />);
    
    expect(screen.getByText('-$150.25')).toBeInTheDocument();
    expect(screen.getByText('-15.02%')).toBeInTheDocument();
    expect(screen.getByText('UNDER')).toBeInTheDocument();
    expect(screen.getByText('-$45.50')).toBeInTheDocument();
  });
  it('renders empty state when there are no trades', () => {
    render(<PLTracker trades={[]} stats={mockStats} />);
    expect(screen.getByText('No trades executed yet. Waiting for signals...')).toBeInTheDocument();
  });
});
