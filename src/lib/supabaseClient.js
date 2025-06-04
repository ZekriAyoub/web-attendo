import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_KEY

if (!url || !key) {
  throw new Error("Missing Supabase environment variables. Check Vercel config.")
}

export const supabase = createClient(url, key)
