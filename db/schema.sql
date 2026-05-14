-- ╔══════════════════════════════════════════════════════════════╗
-- ║  Zebrix — NBA Referee Alpha Trader                         ║
-- ║  Supabase Schema                                           ║
-- ╚══════════════════════════════════════════════════════════════╝

-- ── 1. Referees ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS referees (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL UNIQUE,
  total_games   INTEGER NOT NULL DEFAULT 0,
  home_win_pct  NUMERIC(5, 4) NOT NULL DEFAULT 0,
  over_pct      NUMERIC(5, 4) NOT NULL DEFAULT 0,
  avg_fouls     NUMERIC(4, 1) NOT NULL DEFAULT 0,
  avg_total_pts NUMERIC(5, 1) NOT NULL DEFAULT 0,
  pt_adjustment NUMERIC(4, 1) NOT NULL DEFAULT 0,
  confidence    TEXT NOT NULL DEFAULT 'low' CHECK (confidence IN ('high', 'medium', 'low')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 2. Trade Signals ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS trade_signals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referee_id      UUID NOT NULL REFERENCES referees(id),
  game_id         TEXT NOT NULL,
  game_date       DATE NOT NULL,
  home_team       TEXT NOT NULL,
  away_team       TEXT NOT NULL,
  market          TEXT NOT NULL,
  action          TEXT NOT NULL CHECK (action IN ('BUY_OVER', 'BUY_UNDER', 'BUY_HOME', 'BUY_AWAY', 'NO_TRADE')),
  edge_pct        NUMERIC(6, 4) NOT NULL,
  confidence      NUMERIC(4, 3) NOT NULL,
  current_price   NUMERIC(6, 4) NOT NULL,
  fair_price      NUMERIC(6, 4) NOT NULL,
  position_size   NUMERIC(4, 3) NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'executed', 'expired', 'skipped')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 3. Trades ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS trades (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  signal_id            UUID NOT NULL REFERENCES trade_signals(id),
  polymarket_order_id  TEXT,
  market               TEXT NOT NULL,
  action               TEXT NOT NULL,
  entry_price          NUMERIC(8, 4) NOT NULL,
  exit_price           NUMERIC(8, 4),
  shares               NUMERIC(10, 4) NOT NULL,
  pnl                  NUMERIC(10, 4),
  status               TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'cancelled')),
  entry_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  exit_at              TIMESTAMPTZ
);

-- ── 4. Backtest Results ──────────────────────────────────────

CREATE TABLE IF NOT EXISTS backtest_results (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strategy_params  JSONB NOT NULL,
  date_range_start DATE NOT NULL,
  date_range_end   DATE NOT NULL,
  total_trades     INTEGER NOT NULL DEFAULT 0,
  winning_trades   INTEGER NOT NULL DEFAULT 0,
  losing_trades    INTEGER NOT NULL DEFAULT 0,
  win_rate         NUMERIC(5, 4) NOT NULL DEFAULT 0,
  total_pnl        NUMERIC(10, 4) NOT NULL DEFAULT 0,
  total_pnl_pct    NUMERIC(8, 4) NOT NULL DEFAULT 0,
  max_drawdown     NUMERIC(8, 4) NOT NULL DEFAULT 0,
  sharpe_ratio     NUMERIC(6, 4) NOT NULL DEFAULT 0,
  trades_json      JSONB,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── RLS Policies ─────────────────────────────────────────────

ALTER TABLE referees         ENABLE ROW LEVEL SECURITY;
ALTER TABLE trade_signals    ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades           ENABLE ROW LEVEL SECURITY;
ALTER TABLE backtest_results ENABLE ROW LEVEL SECURITY;

-- anon can read all tables
CREATE POLICY "anon_read_referees"         ON referees         FOR SELECT USING (true);
CREATE POLICY "anon_read_trade_signals"    ON trade_signals    FOR SELECT USING (true);
CREATE POLICY "anon_read_trades"           ON trades           FOR SELECT USING (true);
CREATE POLICY "anon_read_backtest_results" ON backtest_results FOR SELECT USING (true);

-- service_role can do everything (default — no restrictive policy needed)
