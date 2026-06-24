-- M3: Click events table
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS click_events (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  creator_id uuid REFERENCES creators(id) ON DELETE SET NULL,
  referrer   text,
  user_agent text,
  ip_hash    text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
-- Only service role can write/read (via supabaseAdmin)
