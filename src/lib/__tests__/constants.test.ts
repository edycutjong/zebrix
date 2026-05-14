import { COLORS, RISK, DATA_SOURCES, LEAGUE } from '@/lib/constants';

describe('constants', () => {
  describe('COLORS', () => {
    it('has all required brand colors', () => {
      expect(COLORS.cyan).toBe('#06b6d4');
      expect(COLORS.amber).toBe('#f59e0b');
      expect(COLORS.red).toBe('#ef4444');
      expect(COLORS.emerald).toBe('#10b981');
      expect(COLORS.slate).toBe('#1e293b');
    });
  });

  describe('RISK', () => {
    it('has minimum edge of 6%', () => {
      expect(RISK.MIN_EDGE_PCT).toBe(0.06);
    });

    it('limits max position to 5% of bankroll', () => {
      expect(RISK.MAX_POSITION_SIZE).toBe(0.05);
    });

    it('limits max exposure to 20% of bankroll', () => {
      expect(RISK.MAX_EXPOSURE).toBe(0.20);
    });

    it('starts with $200 bankroll', () => {
      expect(RISK.STARTING_BANKROLL).toBe(200);
    });

    it('requires minimum 50 games for referee confidence', () => {
      expect(RISK.MIN_GAMES).toBe(50);
    });
  });

  describe('DATA_SOURCES', () => {
    it('has valid NBA referee URL', () => {
      expect(DATA_SOURCES.NBA_REFEREE_URL).toContain('official.nba.com');
    });

    it('has Polymarket API endpoint', () => {
      expect(DATA_SOURCES.POLYMARKET_API).toContain('polymarket.com');
    });
  });

  describe('LEAGUE', () => {
    it('has reasonable average total points', () => {
      expect(LEAGUE.AVG_TOTAL_POINTS).toBeGreaterThan(200);
      expect(LEAGUE.AVG_TOTAL_POINTS).toBeLessThan(250);
    });

    it('has home win percentage above 50%', () => {
      expect(LEAGUE.HOME_WIN_PCT).toBeGreaterThan(0.5);
      expect(LEAGUE.HOME_WIN_PCT).toBeLessThan(0.7);
    });
  });
});
