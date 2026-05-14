<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 🦓 Zebrix — Agent Instructions

## Project
Automated NBA referee-assignment alpha trader for Polymarket. Exploits historically proven officiating biases — such as referee-specific over/under tendencies and home team win rates — that prediction market traders systematically ignore. Scrapes official NBA referee assignments, calculates a "referee adjustment factor," and places automated bets on Polymarket via Canon CLI before the market prices the signal.

## Hackathon
**DoraHacks DEGA NBA Playoffs Prediction Market Hackathon 2026** — Winner-take-all $1,000 USD. Judged on **actual profit %** (30% weight), technical quality (30%), innovation (25%), presentation (15%).

## Structure
- `src/app/` — Next.js 16 App Router pages (dashboard, backtest, API routes)
- `src/components/` — React 19 components (RefereeTendencyCard, TradeSignalPanel, BacktestChart, PLTracker)
- `src/lib/` — Shared types, constants, mock data, Canon adapter stubs
- `src/lib/canon/` — Canon CLI strategy interface stubs (to be wired when repo access granted)
- `db/schema.sql` — Supabase schema (referees, trade_signals, trades, backtest_results)
- `public/` — Icon SVG, OG image
- `docs/` — README assets (hero, screenshots)

## Tech Stack
| Layer | Technology |
|---|---|
| **Dashboard** | Next.js 16 (App Router), React 19 |
| **Styling** | Tailwind CSS v4 |
| **Charts** | Recharts |
| **Database** | Supabase (PostgreSQL) |
| **Trading Framework** | Canon CLI (DEGA) — TypeScript strategy templates |
| **Prediction Market** | Polymarket CLOB (`@polymarket/clob-client`) |
| **Chain** | Polygon (USDC.e + POL gas) |
| **Data Sources** | NBA Official (referee assignments), Basketball Reference (historical stats) |

## Key Rules
- **Dashboard** = ESM (`import`), Next.js 16, React 19, Tailwind v4
- **Canon stubs** = TypeScript interfaces mirroring Canon's strategy/executor/config pattern
- **Tests** = Jest globals (`describe`/`it`/`expect`), NOT vitest
- **CI** = `npm run ci` → lint + typecheck + test:coverage
- **Colors** = Cyan (#06b6d4) for positive edge, Amber (#f59e0b) for neutral/pending, Red (#ef4444) for negative/risk, Emerald (#10b981) for profit, Slate (#1e293b) for backgrounds
- **Typography** = JetBrains Mono (data/numbers), Inter (body), Orbitron (headings)
- **Aesthetic** = Sports analytics terminal / Bloomberg-style, dark mode only

## Critical Patterns
- All state initialization uses **lazy initializers** (not setState-in-useEffect)
- `CustomTooltip` components must be declared **outside** the render function
- Ref updates go in `useEffect`, never during render
- Unused catch variables use underscore prefix (`_err`)
- `params` is a **Promise** in Next.js 16 — must `await`
