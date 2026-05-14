import React from 'react';
import { render, screen } from '@testing-library/react';
import { RefereeTendencyCard } from '../RefereeTendencyCard';
import type { Referee } from '@/lib/types';

const mockReferee: Referee = {
  id: '1',
  name: 'Scott Foster',
  totalGames: 187,
  homeWinPct: 0.54,
  overPct: 0.58,
  avgFoulsPerGame: 21.3,
  avgTotalPoints: 229.6,
  leagueAvgTotalPoints: 224.5,
  pointAdjustment: 4.2,
  confidence: 'high',
  updatedAt: new Date().toISOString(),
};

describe('RefereeTendencyCard', () => {
  it('renders referee name and stats correctly', () => {
    render(<RefereeTendencyCard referee={mockReferee} />);
    
    expect(screen.getByText('Scott Foster')).toBeInTheDocument();
    expect(screen.getByText(/187.*playoff games/i)).toBeInTheDocument();
    expect(screen.getByText('54.0%')).toBeInTheDocument(); // Home Win
    expect(screen.getByText('58.0%')).toBeInTheDocument(); // Over %
    expect(screen.getByText('+4.2')).toBeInTheDocument(); // Point Adj
  });

  it('shows the correct confidence badge', () => {
    const { rerender } = render(<RefereeTendencyCard referee={mockReferee} />);
    expect(screen.getByText('high')).toBeInTheDocument();

    rerender(<RefereeTendencyCard referee={{ ...mockReferee, confidence: 'medium' }} />);
    expect(screen.getByText('medium')).toBeInTheDocument();

    rerender(<RefereeTendencyCard referee={{ ...mockReferee, confidence: 'low' }} />);
    expect(screen.getByText('low')).toBeInTheDocument();
  });

  it('renders negative biases and point adjustments correctly', () => {
    const lowBiasRef: Referee = {
      ...mockReferee,
      overPct: 0.42,
      homeWinPct: 0.45,
      pointAdjustment: -3.5,
    };
    render(<RefereeTendencyCard referee={lowBiasRef} />);
    
    expect(screen.getByText('42.0%')).toBeInTheDocument();
    expect(screen.getByText('45.0%')).toBeInTheDocument();
    expect(screen.getByText('-3.5')).toBeInTheDocument();
    expect(screen.getByText(/-8.0% vs avg/i)).toBeInTheDocument(); // 0.42 - 0.5 = -0.08
  });

  it('renders high home win percentage correctly', () => {
    const highHomeRef: Referee = {
      ...mockReferee,
      homeWinPct: 0.65, // 0.65 - 0.556 = 0.094 (> 0.04)
    };
    render(<RefereeTendencyCard referee={highHomeRef} />);
    expect(screen.getByText('65.0%')).toBeInTheDocument();
    expect(screen.getByText(/\+9.4% vs avg/i)).toBeInTheDocument();
  });

  it('renders neutral stats correctly', () => {
    const neutralRef: Referee = {
      ...mockReferee,
      overPct: 0.50, // bias 0
      homeWinPct: 0.556, // bias 0
      pointAdjustment: 0,
    };
    render(<RefereeTendencyCard referee={neutralRef} />);
    expect(screen.getByText('50.0%')).toBeInTheDocument();
    expect(screen.getByText('55.6%')).toBeInTheDocument();
    expect(screen.getByText('0.0')).toBeInTheDocument();
    expect(screen.getAllByText(/0.0% vs avg/i).length).toBeGreaterThanOrEqual(1);
  });
});
