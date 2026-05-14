import {
  MOCK_REFEREES,
  MOCK_SIGNALS,
  MOCK_TRADES,
  MOCK_DASHBOARD_STATS,
  MOCK_PNL_DATA,
} from '@/lib/mock-data';

describe('mock-data', () => {
  describe('MOCK_REFEREES', () => {
    it('has at least 5 referees', () => {
      expect(MOCK_REFEREES.length).toBeGreaterThanOrEqual(5);
    });

    it('each referee has required fields', () => {
      for (const ref of MOCK_REFEREES) {
        expect(ref.id).toBeTruthy();
        expect(ref.name).toBeTruthy();
        expect(ref.totalGames).toBeGreaterThan(0);
        expect(ref.overPct).toBeGreaterThan(0);
        expect(ref.overPct).toBeLessThan(1);
        expect(ref.homeWinPct).toBeGreaterThan(0);
        expect(ref.homeWinPct).toBeLessThan(1);
        expect(['high', 'medium', 'low']).toContain(ref.confidence);
      }
    });

    it('has unique IDs', () => {
      const ids = MOCK_REFEREES.map((r) => r.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('MOCK_SIGNALS', () => {
    it('has trade signals', () => {
      expect(MOCK_SIGNALS.length).toBeGreaterThan(0);
    });

    it('each signal has valid action', () => {
      const validActions = ['BUY_OVER', 'BUY_UNDER', 'BUY_HOME', 'BUY_AWAY', 'NO_TRADE'];
      for (const sig of MOCK_SIGNALS) {
        expect(validActions).toContain(sig.action);
        expect(sig.edgePct).toBeGreaterThan(0);
        expect(sig.confidence).toBeGreaterThan(0);
        expect(sig.confidence).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('MOCK_TRADES', () => {
    it('has trades', () => {
      expect(MOCK_TRADES.length).toBeGreaterThan(0);
    });

    it('each trade links to a signal', () => {
      for (const trade of MOCK_TRADES) {
        expect(trade.signalId).toBeTruthy();
        expect(trade.entryPrice).toBeGreaterThan(0);
      }
    });
  });

  describe('MOCK_DASHBOARD_STATS', () => {
    it('has consistent stats', () => {
      expect(MOCK_DASHBOARD_STATS.totalTrades).toBeGreaterThan(0);
      expect(MOCK_DASHBOARD_STATS.winRate).toBeGreaterThanOrEqual(0);
      expect(MOCK_DASHBOARD_STATS.winRate).toBeLessThanOrEqual(1);
    });
  });

  describe('MOCK_PNL_DATA', () => {
    it('has chart data points', () => {
      expect(MOCK_PNL_DATA.length).toBeGreaterThan(0);
    });

    it('has ascending dates', () => {
      for (let i = 1; i < MOCK_PNL_DATA.length; i++) {
        expect(MOCK_PNL_DATA[i].date >= MOCK_PNL_DATA[i - 1].date).toBe(true);
      }
    });
  });
});
