import React from 'react';
import { render, screen } from '@testing-library/react';
import { TradeSignalPanel } from '../TradeSignalPanel';
import type { TradeSignal, Trade } from '@/lib/types';

const mockSignals: TradeSignal[] = [
  {
    id: 's1',
    gameId: 'g1',
    refereeId: 'r1',
    refereeName: 'Scott Foster',
    homeTeam: 'LAL',
    awayTeam: 'GSW',
    gameDate: '2026-05-14',
    market: 'Total Points',
    action: 'BUY_OVER',
    edgePct: 0.052,
    confidence: 0.85,
    currentPrice: 0.52,
    fairPrice: 0.572,
    positionSize: 100,
    status: 'executed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 's2',
    gameId: 'g2',
    refereeId: 'r2',
    refereeName: 'Tony Brothers',
    homeTeam: 'BOS',
    awayTeam: 'MIL',
    gameDate: '2026-05-14',
    market: 'Total Points',
    action: 'BUY_UNDER',
    edgePct: 0.048,
    confidence: 0.9,
    currentPrice: 0.55,
    fairPrice: 0.502,
    positionSize: 150,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
];

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
  }
];

describe('TradeSignalPanel', () => {
  it('renders signals correctly', () => {
    render(<TradeSignalPanel signals={mockSignals} trades={mockTrades} />);
    
    expect(screen.getByText('LAL vs GSW')).toBeInTheDocument();
    expect(screen.getByText('Ref: Scott Foster • Total Points')).toBeInTheDocument();
    expect(screen.getByText('OVER')).toBeInTheDocument();
    expect(screen.getByText('+5.2% edge')).toBeInTheDocument();
    expect(screen.getAllByText('+$33.00').length).toBeGreaterThanOrEqual(1); // PnL from matched trade
    
    expect(screen.getByText('BOS vs MIL')).toBeInTheDocument();
    expect(screen.getByText('Ref: Tony Brothers • Total Points')).toBeInTheDocument();
    expect(screen.getByText('UNDER')).toBeInTheDocument();
    expect(screen.getByText('+4.8% edge')).toBeInTheDocument();
  });

  it('shows correct status badges', () => {
    render(<TradeSignalPanel signals={mockSignals} trades={mockTrades} />);
    expect(screen.getByText('executed')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('renders empty state correctly', () => {
    render(<TradeSignalPanel signals={[]} trades={[]} />);
    expect(screen.getByText(/no active signals detected/i)).toBeInTheDocument();
  });

  it('renders different status and action labels correctly', () => {
    const customSignals: TradeSignal[] = [
      {
        ...mockSignals[0],
        id: 's3',
        status: 'expired',
        action: 'NO_TRADE'
      }
    ];
    render(<TradeSignalPanel signals={customSignals} trades={[]} />);
    expect(screen.getByText('expired')).toBeInTheDocument();
    expect(screen.getByText('NO_TRADE')).toBeInTheDocument();
  });

  it('handles executed status with negative PnL', () => {
    const negativeTrade: Trade = {
      ...mockTrades[0],
      id: 't2',
      signalId: 's2',
      pnl: -15.50
    };
    const executedSignals: TradeSignal[] = [
      { ...mockSignals[1], id: 's2', status: 'executed' }
    ];
    
    render(<TradeSignalPanel signals={executedSignals} trades={[negativeTrade]} />);
    expect(screen.getByText('-$15.50')).toBeInTheDocument();
    // Verify it finds the executed status
    expect(screen.getByText('executed')).toBeInTheDocument();
  });

  it('handles executed status with zero PnL or missing trade', () => {
    const zeroTrade: Trade = {
      ...mockTrades[0],
      id: 't3',
      signalId: 's3',
      pnl: 0
    };
    const executedSignals: TradeSignal[] = [
      { ...mockSignals[0], id: 's3', status: 'executed' }, // with zero pnl
      { ...mockSignals[0], id: 's4', status: 'executed' }  // without trade
    ];
    
    render(<TradeSignalPanel signals={executedSignals} trades={[zeroTrade]} />);
    // Both should render with neutral card styles
    const cards = screen.getAllByText(/Scott Foster/i);
    expect(cards.length).toBe(2);
  });

  it('handles BUY_HOME and BUY_AWAY actions', () => {
    const homeAwaySignals: TradeSignal[] = [
      { ...mockSignals[0], id: 's5', action: 'BUY_HOME' },
      { ...mockSignals[0], id: 's6', action: 'BUY_AWAY' }
    ];
    render(<TradeSignalPanel signals={homeAwaySignals} trades={[]} />);
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('AWAY')).toBeInTheDocument();
  });

  it('handles null PnL', () => {
    const nullTrade: Trade = {
      ...mockTrades[0],
      id: 't4',
      signalId: 's7',
      pnl: null
    };
    const executedSignal: TradeSignal[] = [
      { ...mockSignals[0], id: 's7', status: 'executed' }
    ];
    render(<TradeSignalPanel signals={executedSignal} trades={[nullTrade]} />);
    // Should hit the neutral style branch
    expect(screen.getByText(/Scott Foster/)).toBeInTheDocument();
  });
});
