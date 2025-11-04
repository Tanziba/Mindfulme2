import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

console.log('Initializing Supabase client...', { supabaseUrl, hasKey: !!publicAnonKey });

export const supabase = createSupabaseClient(supabaseUrl, publicAnonKey);

console.log('Supabase client initialized');
