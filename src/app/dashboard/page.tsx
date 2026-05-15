'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { TradeSignal, Trade, Referee, DashboardStats, PnlDataPoint } from '@/lib/types';
import { RefereeTendencyCard } from '@/components/RefereeTendencyCard';
import { TradeSignalPanel } from '@/components/TradeSignalPanel';
import { PLTracker } from '@/components/PLTracker';
import { BacktestChart } from '@/components/BacktestChart';
import { StatsGrid } from '@/components/StatsGrid';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(() => ({
    totalPnl: 0,
    totalPnlPct: 0,
    totalTrades: 0,
    winRate: 0,
    activeSignals: 0,
    avgEdge: 0,
    maxDrawdown: 0,
    sharpeRatio: 0,
  }));

  const [referees, setReferees] = useState<Referee[]>(() => []);
  const [signals, setSignals] = useState<TradeSignal[]>(() => []);
  const [trades, setTrades] = useState<Trade[]>(() => []);
  const [pnlData, setPnlData] = useState<PnlDataPoint[]>(() => []);
  const [loading, setLoading] = useState(() => true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // 1. Fetch Referees
        const { data: refData } = await supabase
          .from('referees')
          .select('*')
          .order('name');
        
        if (refData) {
          setReferees(refData.map(r => ({
            id: r.id,
            name: r.name,
            totalGames: r.total_games,
            homeWinPct: Number(r.home_win_pct),
            overPct: Number(r.over_pct),
            avgFoulsPerGame: Number(r.avg_fouls),
            avgTotalPoints: Number(r.avg_total_pts),
            leagueAvgTotalPoints: 224.5, // Reference constant
            pointAdjustment: Number(r.pt_adjustment),
            confidence: r.confidence as Referee['confidence'],
            updatedAt: r.updated_at
          })));
        }

        // 2. Fetch Signals
        const { data: sigData } = await supabase
          .from('trade_signals')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);
        
        if (sigData) {
          setSignals(sigData.map(s => ({
            id: s.id,
            gameId: s.game_id,
            refereeId: s.referee_id,
            refereeName: '', // Will be matched or fetched if needed
            homeTeam: s.home_team,
            awayTeam: s.away_team,
            gameDate: s.game_date,
            market: s.market,
            action: s.action as TradeSignal['action'],
            edgePct: Number(s.edge_pct),
            confidence: Number(s.confidence),
            currentPrice: Number(s.current_price),
            fairPrice: Number(s.fair_price),
            positionSize: Number(s.position_size),
            status: s.status as TradeSignal['status'],
            createdAt: s.created_at
          })));
        }

        // 3. Fetch Trades
        const { data: tradeData } = await supabase
          .from('trades')
          .select('*')
          .order('entry_at', { ascending: false })
          .limit(50);
        
        if (tradeData) {
          setTrades(tradeData.map(t => ({
            id: t.id,
            signalId: t.signal_id,
            polymarketOrderId: t.polymarket_order_id,
            market: t.market,
            action: t.action,
            entryPrice: Number(t.entry_price),
            exitPrice: t.exit_price ? Number(t.exit_price) : null,
            shares: Number(t.shares),
            pnl: t.pnl ? Number(t.pnl) : null,
            status: t.status as Trade['status'],
            entryAt: t.entry_at,
            exitAt: t.exit_at
          })));
        }

        // 4. Calculate Stats & P&L Chart Data
        const sortedTrades = [...(tradeData || [])].sort((a, b) => 
          new Date(a.entry_at).getTime() - new Date(b.entry_at).getTime()
        );

        let cumulativePnl = 0;
        const pnlPoints: PnlDataPoint[] = sortedTrades.map(t => {
          cumulativePnl += Number(t.pnl) || 0;
          return {
            date: new Date(t.entry_at).toLocaleDateString(),
            cumulativePnl,
            dailyPnl: Number(t.pnl) || 0
          };
        });
        
        if (pnlPoints.length === 0) {
          pnlPoints.push({ date: new Date().toLocaleDateString(), cumulativePnl: 0, dailyPnl: 0 });
        }
        setPnlData(pnlPoints);

        const totalPnl = tradeData?.reduce((sum, t) => sum + (Number(t.pnl) || 0), 0) || 0;
        const totalTrades = tradeData?.length || 0;
        const winningTrades = tradeData?.filter(t => (Number(t.pnl) || 0) > 0).length || 0;
        
        setStats({
          totalPnl,
          totalPnlPct: (totalPnl / 1000) * 100, // Assuming 1k starting capital
          totalTrades,
          winRate: totalTrades > 0 ? winningTrades / totalTrades : 0,
          activeSignals: sigData?.filter(s => s.status === 'pending').length || 0,
          avgEdge: sigData && sigData.length > 0 ? sigData.reduce((sum, s) => sum + Number(s.edge_pct), 0) / sigData.length : 0,
          maxDrawdown: 0.12, // Placeholder
          sharpeRatio: 2.4, // Placeholder
        });

        // 5. Update Signals with Referee Names
        if (sigData && refData) {
          setSignals(sigData.map(s => ({
            id: s.id,
            gameId: s.game_id,
            refereeId: s.referee_id,
            refereeName: refData.find(r => r.id === s.referee_id)?.name || 'Unknown Ref',
            homeTeam: s.home_team,
            awayTeam: s.away_team,
            gameDate: s.game_date,
            market: s.market,
            action: s.action as TradeSignal['action'],
            edgePct: Number(s.edge_pct),
            confidence: Number(s.confidence),
            currentPrice: Number(s.current_price),
            fairPrice: Number(s.fair_price),
            positionSize: Number(s.position_size),
            status: s.status as TradeSignal['status'],
            createdAt: s.created_at
          })));
        }

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Set up real-time subscriptions
    const signalSub = supabase
      .channel('trade_signals_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trade_signals' }, () => {
        fetchData();
      })
      .subscribe();

    const tradeSub = supabase
      .channel('trades_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trades' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(signalSub);
      supabase.removeChannel(tradeSub);
    };
  }, []);

  return (
    <div className="min-h-screen relative scanlines">
      {/* Header */}
      <nav className="border-b border-border bg-bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg border border-cyan/30 bg-cyan/10 flex items-center justify-center p-2">
              <Image src="/icon.svg" alt="Zebrix Icon" width={24} height={24} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider text-text-primary font-display">
                ZEBRIX
              </h1>
              <p className="text-xs text-text-muted tracking-wide">
                REFEREE ASSIGNMENT ALPHA • POLYMARKET
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-mono text-emerald">
              <span className="status-dot status-dot-live" />
              LIVE
            </div>
            <div className="text-xs text-text-muted px-3 py-1 rounded-full border border-border font-mono">
              DEGA Rank • Canon CLI
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10">
        {loading && (
          <div className="absolute inset-0 bg-(--color-bg)/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-(--color-cyan) animate-pulse font-mono tracking-widest uppercase">
              Initializing Intelligence Hub...
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* P&L Chart + Active Signals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BacktestChart data={pnlData.length > 0 ? pnlData : [{ date: '2026-05-14', cumulativePnl: 0, dailyPnl: 0 }]} />
          </div>
          <div>
            <TradeSignalPanel signals={signals} trades={trades} />
          </div>
        </div>

        {/* Referee Tendencies */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-sm font-semibold text-(--color-text-secondary) tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Referee Tendency Database
            </h2>
            <span className="text-[10px] text-(--color-text-muted) font-mono">
              N = {referees.length} OFFICIALS TRACKED
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {referees.map((ref) => (
              <RefereeTendencyCard key={ref.id} referee={ref} />
            ))}
          </div>
        </div>

        {/* P&L Tracker */}
        <PLTracker trades={trades} stats={stats} />
      </main>

      {/* Footer */}
      <footer className="border-t border-(--color-border) py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-(--color-text-muted)">
          <span style={{ fontFamily: 'var(--font-mono)' }}>
            © 2026 Zebrix • DEGA NBA Playoffs Hackathon
          </span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>
            Built with Canon CLI • Polymarket CLOB
          </span>
        </div>
      </footer>
    </div>
  );
}
