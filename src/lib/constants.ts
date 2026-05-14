// ── Brand Colors ─────────────────────────────────────────────

export const COLORS = {
  /** Positive edge / primary accent */
  cyan: '#06b6d4',
  /** Neutral / pending */
  amber: '#f59e0b',
  /** Negative / risk / danger */
  red: '#ef4444',
  /** Profit / success */
  emerald: '#10b981',
  /** Background base */
  slate: '#1e293b',
  /** Background card */
  slateCard: '#0f172a',
  /** Text primary */
  textPrimary: '#f8fafc',
  /** Text secondary */
  textSecondary: '#94a3b8',
  /** Chart grid lines */
  grid: '#334155',
} as const;

// ── Risk Management Thresholds ───────────────────────────────

export const RISK = {
  /** Minimum edge to trigger a trade (6%) */
  MIN_EDGE_PCT: 0.06,
  /** Maximum position size as fraction of bankroll */
  MAX_POSITION_SIZE: 0.05,
  /** Minimum confidence to execute */
  MIN_CONFIDENCE: 0.6,
  /** Minimum games officiated to consider a referee */
  MIN_GAMES: 50,
  /** Maximum total exposure as fraction of bankroll */
  MAX_EXPOSURE: 0.20,
  /** Starting bankroll in USD */
  STARTING_BANKROLL: 200,
} as const;

// ── Data Sources ─────────────────────────────────────────────

export const DATA_SOURCES = {
  /** NBA official referee assignments page */
  NBA_REFEREE_URL: 'https://official.nba.com/referee-assignments/',
  /** Basketball Reference for historical data */
  BBALL_REF_BASE: 'https://www.basketball-reference.com',
  /** Polymarket CLOB API */
  POLYMARKET_API: 'https://clob.polymarket.com',
  /** Polygon RPC */
  POLYGON_RPC: 'https://polygon-rpc.com',
} as const;

// ── Canon Configuration ──────────────────────────────────────

export const CANON = {
  /** Strategy name registered on DEGA Rank */
  STRATEGY_NAME: 'zebrix-referee-edge',
  /** Strategy version */
  VERSION: '1.0.0',
  /** Execution mode */
  MODE: 'live' as const,
} as const;

// ── League Averages (2024-25 NBA season) ─────────────────────

export const LEAGUE = {
  /** Average total points per game */
  AVG_TOTAL_POINTS: 225.4,
  /** Home team win percentage */
  HOME_WIN_PCT: 0.556,
  /** Average fouls per game */
  AVG_FOULS_PER_GAME: 19.8,
} as const;

// ── Team Mappings ──────────────────────────────────────────

export const NBA_TEAMS: Record<string, string> = {
  'ATL': 'Atlanta Hawks',
  'BOS': 'Boston Celtics',
  'BKN': 'Brooklyn Nets',
  'CHA': 'Charlotte Hornets',
  'CHI': 'Chicago Bulls',
  'CLE': 'Cleveland Cavaliers',
  'DAL': 'Dallas Mavericks',
  'DEN': 'Denver Nuggets',
  'DET': 'Detroit Pistons',
  'GSW': 'Golden State Warriors',
  'HOU': 'Houston Rockets',
  'IND': 'Indiana Pacers',
  'LAC': 'LA Clippers',
  'LAL': 'Los Angeles Lakers',
  'MEM': 'Memphis Grizzlies',
  'MIA': 'Miami Heat',
  'MIL': 'Milwaukee Bucks',
  'MIN': 'Minnesota Timberwolves',
  'NOP': 'New Orleans Pelicans',
  'NYK': 'New York Knicks',
  'OKC': 'Oklahoma City Thunder',
  'ORL': 'Orlando Magic',
  'PHI': 'Philadelphia 76ers',
  'PHX': 'Phoenix Suns',
  'POR': 'Portland Trail Blazers',
  'SAC': 'Sacramento Kings',
  'SAS': 'San Antonio Spurs',
  'TOR': 'Toronto Raptors',
  'UTA': 'Utah Jazz',
  'WAS': 'Washington Wizards',
};
