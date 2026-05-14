// ── Core Domain Types ────────────────────────────────────────

export interface Referee {
  id: string;
  name: string;
  /** Total playoff games officiated */
  totalGames: number;
  /** Home team win percentage (0-1) */
  homeWinPct: number;
  /** Over percentage — how often the total goes Over (0-1) */
  overPct: number;
  /** Average fouls called per game */
  avgFoulsPerGame: number;
  /** Average total points in their games */
  avgTotalPoints: number;
  /** League average total points for comparison */
  leagueAvgTotalPoints: number;
  /** Net point adjustment (positive = higher scoring games) */
  pointAdjustment: number;
  /** Confidence level based on sample size */
  confidence: 'high' | 'medium' | 'low';
  /** Last updated timestamp */
  updatedAt: string;
}

export interface RefereeCrewAssignment {
  gameId: string;
  gameDate: string;
  homeTeam: string;
  awayTeam: string;
  crewChief: string;
  referee: string;
  umpire: string;
  /** When the assignment was published */
  publishedAt: string;
  /** Polymarket market ID for this game */
  polymarketMarketId?: string;
}

export interface TradeSignal {
  id: string;
  gameId: string;
  refereeId: string;
  refereeName: string;
  homeTeam: string;
  awayTeam: string;
  gameDate: string;
  /** The market being targeted (e.g., 'Over/Under 212.5') */
  market: string;
  /** The direction of the trade */
  action: 'BUY_OVER' | 'BUY_UNDER' | 'BUY_HOME' | 'BUY_AWAY' | 'NO_TRADE';
  /** Calculated edge percentage (e.g., 0.06 = 6%) */
  edgePct: number;
  /** Confidence in the signal (0-1) */
  confidence: number;
  /** Current Polymarket price for the position */
  currentPrice: number;
  /** Model-estimated fair price */
  fairPrice: number;
  /** Recommended position size (fraction of bankroll) */
  positionSize: number;
  /** Signal status */
  status: 'pending' | 'executed' | 'expired' | 'skipped';
  /** Timestamp when signal was generated */
  createdAt: string;
}

export interface Trade {
  id: string;
  signalId: string;
  polymarketOrderId: string;
  market: string;
  action: string;
  /** Entry price per share */
  entryPrice: number;
  /** Exit price per share (null if still open) */
  exitPrice: number | null;
  /** Number of shares */
  shares: number;
  /** Realized P&L in USD */
  pnl: number | null;
  /** Trade status */
  status: 'open' | 'closed' | 'cancelled';
  /** Timestamps */
  entryAt: string;
  exitAt: string | null;
}

export interface BacktestResult {
  id: string;
  /** Strategy parameters used */
  strategyParams: {
    minEdge: number;
    maxPositionSize: number;
    minConfidence: number;
    minGames: number;
  };
  /** Date range of backtest */
  dateRange: {
    start: string;
    end: string;
  };
  /** Results */
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalPnl: number;
  totalPnlPct: number;
  maxDrawdown: number;
  sharpeRatio: number;
  /** Per-trade breakdown */
  trades: BacktestTrade[];
  /** Timestamp */
  createdAt: string;
}

export interface BacktestTrade {
  gameDate: string;
  homeTeam: string;
  awayTeam: string;
  refereeName: string;
  market: string;
  action: string;
  edgePct: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  outcome: 'win' | 'loss';
}

// ── Dashboard Types ──────────────────────────────────────────

export interface DashboardStats {
  totalPnl: number;
  totalPnlPct: number;
  totalTrades: number;
  winRate: number;
  activeSignals: number;
  avgEdge: number;
  maxDrawdown: number;
  sharpeRatio: number;
}

export interface PnlDataPoint {
  date: string;
  cumulativePnl: number;
  dailyPnl: number;
}
