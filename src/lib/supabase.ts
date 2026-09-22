// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// CORREÇÃO: Use import.meta.env.VITE_SUPABASE_URL (com VITE_ prefixo)
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nnfvibpkmcnfotndsvmp.supabase.co';
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sua_chave_anon_aqui';

// CORREÇÃO: Acesse com colchetes para evitar erro de tipagem
const supabaseUrl = import.meta.env['VITE_SUPABASE_URL'] || 'https://nnfvibpkmcnfotndsvmp.supabase.co';
const supabaseAnonKey = import.meta.env['VITE_SUPABASE_ANON_KEY'] 

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey);