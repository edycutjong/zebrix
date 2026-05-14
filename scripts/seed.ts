/**
 * Supabase Seeding Script
 * 
 * Populates the 'referees' table with historical data.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
console.log('Current working directory:', process.cwd());
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Not found');
console.log('Service Role Key:', supabaseServiceRoleKey ? 'Found' : 'Not found');

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Data to seed (extracted from mock-data.ts)
const REFEREES_TO_SEED = [
  {
    name: 'Scott Foster',
    total_games: 187,
    home_win_pct: 0.54,
    over_pct: 0.58,
    avg_fouls: 21.3,
    avg_total_pts: 229.6,
    pt_adjustment: 4.2,
    confidence: 'high'
  },
  {
    name: 'Tony Brothers',
    total_games: 163,
    home_win_pct: 0.62,
    over_pct: 0.55,
    avg_fouls: 22.1,
    avg_total_pts: 227.8,
    pt_adjustment: 2.4,
    confidence: 'high'
  },
  {
    name: 'Marc Davis',
    total_games: 142,
    home_win_pct: 0.51,
    over_pct: 0.44,
    avg_fouls: 17.9,
    avg_total_pts: 221.2,
    pt_adjustment: -4.2,
    confidence: 'high'
  },
  {
    name: 'Ed Malloy',
    total_games: 128,
    home_win_pct: 0.57,
    over_pct: 0.52,
    avg_fouls: 20.4,
    avg_total_pts: 226.1,
    pt_adjustment: 0.7,
    confidence: 'high'
  },
  {
    name: 'James Capers',
    total_games: 98,
    home_win_pct: 0.59,
    over_pct: 0.61,
    avg_fouls: 23.2,
    avg_total_pts: 231.4,
    pt_adjustment: 6.0,
    confidence: 'medium'
  },
  {
    name: 'Kane Fitzgerald',
    total_games: 76,
    home_win_pct: 0.53,
    over_pct: 0.48,
    avg_fouls: 19.1,
    avg_total_pts: 223.7,
    pt_adjustment: -1.7,
    confidence: 'medium'
  }
];

async function seed() {
  console.log('🚀 Seeding referees data...');

  const { error } = await supabase
    .from('referees')
    .upsert(REFEREES_TO_SEED, { onConflict: 'name' });

  if (error) {
    console.error('❌ Seeding failed:', error.message);
  } else {
    console.log('✅ Seeding complete!');
  }
}

seed().catch(console.error);
