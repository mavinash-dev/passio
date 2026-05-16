-- =============================================
-- Passio — Seed Data
-- First listing: SURAWE (women's fashion)
-- Run after schema.sql
-- =============================================

INSERT INTO creators (handle, name, bio, niche, instagram_handle, instagram_followers, is_active)
VALUES (
  'surawe',
  'SURAWE',
  'Born from a deep love of Indian textiles and the belief that every woman deserves clothing that tells a story. SURAWE creates frocks and kurtis in breathable cottons, organza, and muslin — each piece crafted with care, and made just for you.',
  'fashion',
  'surawe.in',
  NULL,
  true
);

INSERT INTO products (creator_id, slug, name, description, price_range, buy_link, is_active)
SELECT c.id,
  'white-pink-tulip-layered-frock',
  'White and Pink Tulip Layered Frock',
  'Delicate layers in white and dusty pink, falling like petals. The kind of piece you reach for when you want to feel light without trying.',
  '₹999',
  'https://wa.me/917013403450',
  true
FROM creators c WHERE c.handle = 'surawe';

INSERT INTO products (creator_id, slug, name, description, price_range, buy_link, is_active)
SELECT c.id,
  'white-cotton-hand-block-print-frock',
  'White Cotton Hand Block Print Frock',
  'A block-printed frock in pure white cotton — each impression of ink slightly different from the last, the way handmade things should be. Wear it to brunch, to the market, to wherever you feel like yourself.',
  '₹1,299',
  'https://wa.me/917013403450',
  true
FROM creators c WHERE c.handle = 'surawe';

INSERT INTO products (creator_id, slug, name, description, price_range, buy_link, is_active)
SELECT c.id,
  'orange-crystal-organza-frock',
  'Orange Crystal Organza Frock',
  'Vibrant tangerine in crystal organza — a fabric that catches light the way a good mood does. Flowy, airy, unapologetically bright.',
  '₹949',
  'https://wa.me/917013403450',
  true
FROM creators c WHERE c.handle = 'surawe';

INSERT INTO products (creator_id, slug, name, description, price_range, buy_link, is_active)
SELECT c.id,
  'lilac-floral-muslin-cotton-frock',
  'Lilac Floral Muslin Cotton Frock',
  'Soft lilac with a gentle floral print, in muslin that gets softer with every wash. Some frocks feel like home — this is one of them.',
  '₹899',
  'https://wa.me/917013403450',
  true
FROM creators c WHERE c.handle = 'surawe';

INSERT INTO products (creator_id, slug, name, description, price_range, buy_link, is_active)
SELECT c.id,
  'green-cotton-corset-kurti',
  'Green Cotton Corset Kurti',
  'A corset-style kurti that holds its shape without holding you back. Deep green cotton, structured silhouette, comfortable all day.',
  '₹499',
  'https://wa.me/917013403450',
  true
FROM creators c WHERE c.handle = 'surawe';

INSERT INTO products (creator_id, slug, name, description, price_range, buy_link, is_active)
SELECT c.id,
  'green-natural-kalamkari-kurti',
  'Green Natural Kalamkari Kurti',
  'Kalamkari is a 3,000-year-old art of painting on fabric with a kalam — a pen made of tamarind wood. This kurti carries that tradition forward, one careful stroke at a time.',
  '₹599',
  'https://wa.me/917013403450',
  true
FROM creators c WHERE c.handle = 'surawe';
