-- =============================================
-- Passio — Database Schema
-- Paste this into Supabase SQL Editor and run
-- =============================================

CREATE TABLE IF NOT EXISTS creators (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle              text UNIQUE NOT NULL,
  name                text NOT NULL,
  bio                 text,
  photo_url           text,
  niche               text CHECK (niche IN ('skincare', 'food', 'fitness', 'fashion', 'lifestyle')),
  instagram_handle    text,
  instagram_followers int,
  is_active           boolean DEFAULT true,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id  uuid REFERENCES creators(id) ON DELETE CASCADE,
  slug        text NOT NULL,
  name        text NOT NULL,
  description text,
  price_range text,
  photo_url   text,
  buy_link    text NOT NULL,
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now(),
  UNIQUE (creator_id, slug)
);

CREATE TABLE IF NOT EXISTS redirect_logs (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  creator_id uuid REFERENCES creators(id),
  referrer   text,
  user_agent text,
  ip_hash    text,
  timestamp  timestamptz DEFAULT now()
);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER creators_updated_at
  BEFORE UPDATE ON creators
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security: allow public reads for active rows
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirect_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active creators" ON creators
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read active products" ON products
  FOR SELECT USING (is_active = true);

-- Service role key bypasses RLS — admin tool uses this automatically

-- =============================================
-- Storage: create these buckets in Supabase dashboard > Storage
--   1. creator-photos  (public)
--   2. product-photos  (public)
-- =============================================
