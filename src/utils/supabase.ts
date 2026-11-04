import { createClient } from '@supabase/supabase-js';

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kcfjzethvavquaubjxjn.supabase.co';

export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_zp7CdQT1-lPac2zapRD-UA_AJ8SOR22';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
