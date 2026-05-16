import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// For public reads (ISR pages)
export const supabase = createClient(url, anonKey)

// For writes and admin operations — server-side only, never exposed to client
export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
})
