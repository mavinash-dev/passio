-- Passio M2 Schema
-- Run this in Supabase SQL Editor (project: apkkkcmleitkoawijgmq)
-- WARNING: Drops existing creators and products tables

DROP TABLE IF EXISTS redirect_logs;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS creators;

CREATE TABLE creators (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  handle       text UNIQUE NOT NULL,
  brand_name   text NOT NULL,
  tagline      text,
  story        text,
  portrait_url text,
  instagram    text,
  website      text,
  status       text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'rejected')),
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

CREATE TABLE products (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE NOT NULL,
  name       text NOT NULL,
  image_url  text,
  buy_url    text,
  sort_order int DEFAULT 0,
  is_active  boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Auto-update updated_at
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

-- RLS
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public reads active creators
CREATE POLICY "Public read active creators" ON creators
  FOR SELECT USING (status = 'active');

-- Public reads products of active creators
CREATE POLICY "Public read active products" ON products
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM creators c WHERE c.id = products.creator_id AND c.status = 'active')
  );

-- Creator can read/write their own row
CREATE POLICY "Creator owns their row" ON creators
  FOR ALL USING (auth.uid() = user_id);

-- Creator can manage their products
CREATE POLICY "Creator manages own products" ON products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM creators c WHERE c.id = products.creator_id AND c.user_id = auth.uid())
  );
