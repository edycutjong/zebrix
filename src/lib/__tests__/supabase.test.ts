import { createClient } from '@supabase/supabase-js';
import { supabase } from '../supabase';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(),
    auth: {
      getSession: jest.fn(),
    },
  })),
}));

describe('Supabase Client', () => {
  it('initializes with the correct URL and key', () => {
    expect(createClient).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
    );
  });

  it('exports a valid client instance', () => {
    expect(supabase).toBeDefined();
    expect(typeof supabase.from).toBe('function');
  });
});
