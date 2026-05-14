import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatsGrid } from '../StatsGrid';
import type { DashboardStats } from '@/lib/types';

const mockStats: DashboardStats = {
  totalPnl: 1250.50,
  totalPnlPct: 12.5,
  totalTrades: 45,
  winRate: 0.65,
  activeSignals: 3,
  avgEdge: 0.042,
  sharpeRatio: 1.8,
  maxDrawdown: 450.00,
};

describe('StatsGrid', () => {
  it('renders all stat cards with correct formatting', () => {
    render(<StatsGrid stats={mockStats} />);
    
    expect(screen.getByText('Total P&L')).toBeInTheDocument();
    expect(screen.getByText('+$1250.50')).toBeInTheDocument();
    
    expect(screen.getByText('Return %')).toBeInTheDocument();
    expect(screen.getByText('+12.50%')).toBeInTheDocument();
    
    expect(screen.getByText('Win Rate')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    
    expect(screen.getByText('Avg Edge')).toBeInTheDocument();
    expect(screen.getByText('4.2%')).toBeInTheDocument();
    
    expect(screen.getByText('Active Signals')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    
    expect(screen.getByText('Max Drawdown')).toBeInTheDocument();
    expect(screen.getByText('-$450.00')).toBeInTheDocument();
  });

  it('handles negative P&L formatting', () => {
    const negativeStats = { ...mockStats, totalPnl: -500.25, totalPnlPct: -5.2 };
    render(<StatsGrid stats={negativeStats} />);
    
    expect(screen.getByText('-$500.25')).toBeInTheDocument();
    expect(screen.getByText('-5.20%')).toBeInTheDocument();
  });

  it('handles low values and edge cases', () => {
    const lowStats = { 
      ...mockStats, 
      winRate: 0.4, 
      activeSignals: 0, 
      sharpeRatio: 0.8 
    };
    render(<StatsGrid stats={lowStats} />);
    
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('0.80')).toBeInTheDocument();
  });
});
